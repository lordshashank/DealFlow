// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IDealClient} from "./IDealClient.sol";
import {IRetrieval} from "./IRetrieval.sol";
import {IRegisterSubnetFacet} from "./IRegisterSubnetFacet.sol";
import {DealRequest, ExtraParamsV1} from "./DealClient.sol";
import {SubnetActorDiamond} from "./ipc/SubnetActorDiamond.sol";

/**
 * @title DealFlow
 * @dev A smart contract for managing deals between users and miners
 */
contract DealFlow is Ownable {
    /// @notice The amount of stake required for miner registration
    uint256 public stakeAmount;

    /// @notice List of registered miners
    string[] public registeredMinerIds;

    /// @notice deal client contract address
    IDealClient public dealClient;

    /// @notice deal client contract address
    IRetrieval public tellorRetrieval;

    /// @notice subnet registry contract address
    IRegisterSubnetFacet public subnetRegistry;

    /// @notice Mapping of miner IDs to Miner details
    mapping(string => Miner) public minerRecord;

    /// @notice Mapping of miner address to Miner id
    mapping(address => string) public minerAuth;

    /// @notice Mapping of deal id to user address
    mapping(bytes32 => address) public dealAuth;

    /// @notice Mapping of deal ID to Deal details
    mapping(bytes32 => DealRequest) public dealRecord;

    /// @notice Mapping of user to their deal IDs
    mapping(address => bytes32[]) public userDeals;

    /// @notice Mapping of minerID to dealIDs
    mapping(string => bytes32[]) public minerDeals;

    struct Miner {
        string id;
        address payable paymentReceiver;
        address paymentToken;
        uint256 pricePerGB;
        string location;
        uint256 maxDealDuration;
        bool retrieval;
        bool verifiedDeal;
        address listenAddress;
    }

    event MinerRegistered(string indexed minerId, address indexed minerAddress);

    event DealProposed(
        bytes32 indexed dealId,
        string indexed minerId,
        address indexed userAddress
    );

    /**
     * @dev Constructor to initialize the DealFlow contract with necessary addresses and stake amount.
     * @param _dealContract Address of the deal client contract.
     * @param _tellorRetrieval Address of the Tellor retrieval contract.
     * @param _subnetRegistry Address of the subnet registry contract.
     * @param _stakeAmount Initial stake amount required for miner registration.
     */
    constructor(
        address _dealContract,
        address _tellorRetrieval,
        address _subnetRegistry,
        uint _stakeAmount
    ) Ownable(msg.sender) {
        dealClient = IDealClient(_dealContract);
        tellorRetrieval = IRetrieval(_tellorRetrieval);
        subnetRegistry = IRegisterSubnetFacet(_subnetRegistry);
        stakeAmount = _stakeAmount;
    }

    /**
     * @notice Registers a new miner
     * @param minerId The ID of the miner
     * @param paymentReceiver The address to receive payments
     * @param paymentToken The token address for payments
     * @param pricePerGB The price per GB
     * @param location The location of the miner
     * @param maxDealDuration The maximum duration of a deal
     * @param retrieval Whether retrieval is supported
     */
    function registerMiner(
        string memory minerId,
        address payable paymentReceiver,
        address paymentToken,
        uint256 pricePerGB,
        string memory location,
        uint256 maxDealDuration,
        bool retrieval,
        bool verifiedDeal
    ) external payable {
        require(msg.value >= stakeAmount, "Incorrect stake amount");
        require(
            minerRecord[minerId].paymentReceiver == address(0),
            "Miner already registered"
        );

        minerRecord[minerId] = Miner({
            id: minerId,
            paymentReceiver: paymentReceiver,
            paymentToken: paymentToken,
            pricePerGB: pricePerGB,
            location: location,
            maxDealDuration: maxDealDuration,
            retrieval: retrieval,
            verifiedDeal: verifiedDeal,
            listenAddress: address(this)
        });
        registeredMinerIds.push(minerId);
        minerAuth[msg.sender] = minerId;
        emit MinerRegistered(minerId, msg.sender);
    }

    /**
     * @notice Proposes a deal with a registered miner
     * @param minerId The ID of the miner
     * @param deal DealRequest struct
     */
    function proposeDeal(
        string memory minerId,
        DealRequest calldata deal
    ) external payable {
        Miner memory miner = minerRecord[minerId];
        require(miner.paymentReceiver != address(0), "Miner not registered");
        uint256 paymentAmount = getDealPrice(miner.pricePerGB, deal.piece_size);
        if (miner.paymentToken == address(0)) {
            require(msg.value >= paymentAmount, "Insufficient deal payment");
            payable(miner.paymentReceiver).transfer(paymentAmount);
        } else {
            // user need to approve the following amount to this contract
            IERC20 paymentToken = IERC20(miner.paymentToken);
            require(
                paymentToken.transferFrom(
                    msg.sender,
                    miner.paymentReceiver,
                    paymentAmount
                ),
                "Payment failed"
            );
        }

        bytes32 dealId = dealClient.makeDealProposal(deal);

        dealRecord[dealId] = deal;
        userDeals[msg.sender].push(dealId);
        minerDeals[minerId].push(dealId);

        emit DealProposed(dealId, minerId, msg.sender);
    }

    function challenge(bytes32 _dealId) external {
        require(dealAuth[_dealId] == msg.sender, "Unauthorised deal creator");
        string memory expectedCID = dealRecord[_dealId].label;
        string memory retrievedCID = tellorRetrieval.getFileCid(expectedCID);
        if (
            keccak256(abi.encodePacked(expectedCID)) !=
            keccak256(abi.encodePacked(retrievedCID))
        ) {
            payable(msg.sender).transfer(stakeAmount);
        }
    }

    /**
     * @notice Spins up a new subnet for a registered miner
     * @param _minerId The ID of the miner who will own the new subnet
     * @param _params The constructor parameters required to create the subnet
     */
    function spinSubnet(
        string memory _minerId,
        SubnetActorDiamond.ConstructorParams calldata _params
    ) external {
        require(
            keccak256(abi.encodePacked(minerAuth[msg.sender])) ==
                keccak256(abi.encodePacked(_minerId)),
            "Unauthorized miner"
        );
        Miner storage miner = minerRecord[_minerId];
        miner.listenAddress = subnetRegistry.newSubnetActor(_params);
    }

    /**
     * @notice Sets the stake amount for miners
     * @param _stakeAmount The stake amount in smallest unit
     */
    function setStakeAmount(uint256 _stakeAmount) external onlyOwner {
        stakeAmount = _stakeAmount;
    }

    /**
     * @notice Calculates the deal price based on price per GB and size in bytes
     * @param pricePerGB The price per GB
     * @param sizeInBytes The size of the deal in bytes
     * @return The calculated deal price
     */
    function getDealPrice(
        uint256 pricePerGB,
        uint256 sizeInBytes
    ) public pure returns (uint256) {
        uint256 sizeInGB = sizeInBytes / (1024 * 1024 * 1024);
        return pricePerGB * sizeInGB;
    }

    /**
     * @notice Retrieves all registered miners
     * @return An array of miner IDs
     */
    function getAllRegisteredMiners() external view returns (string[] memory) {
        return registeredMinerIds;
    }

    /**
     * @notice Retrieves the deal ID associated with a specific piece CID
     * @param pieceCid The content identifier for the piece
     * @return The deal ID associated with the given piece CID
     */
    function getPieceDeals(
        bytes memory pieceCid
    ) external view returns (uint64) {
        return dealClient.pieceDeals(pieceCid);
    }
}
