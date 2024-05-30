// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IDealClient} from "./IDealClient.sol";
import {DealRequest, ExtraParamsV1} from "./DealClient.sol";

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
    
    
    /// @notice Mapping of miner IDs to Miner details
    mapping(string => Miner) public minerRecord;

    /// @notice Mapping of deal IDs to Deal details
    mapping(bytes32 => DealRequest) public dealRecord;

    /// @notice Mapping of user to their deal IDs
    mapping(address => bytes32[]) public userDeals;

    /// @notice Mapping of minerID to dealIDs
    mapping(string => bytes32[]) public minerDeals;
   

    struct Miner {
        address payable paymentReceiver;
        address paymentToken;
        uint256 pricePerGB;
        string location;
        uint256 maxDealDuration;
        bool retrieval;
    }

    event MinerRegistered(string indexed minerId, address indexed minerAddress);

    event DealProposed(bytes32 indexed dealId, string indexed minerId, address indexed userAddress);

    /**
     * @dev Initializes the contract setting the initial stake amount and setting ownership.
     * @param _stakeAmount The initial stake amount required for miner registration.
     */
    constructor(address _dealContract, uint _stakeAmount) Ownable() {
        dealClient = IDealClient(_dealContract);
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
        bool retrieval
    ) external payable {
        require(msg.value == stakeAmount, "Incorrect stake amount");
        require(minerRecord[minerId].paymentReceiver == address(0), "Miner already registered");

        minerRecord[minerId] = Miner({
            paymentReceiver: paymentReceiver,
            paymentToken: paymentToken,
            pricePerGB: pricePerGB,
            location: location,
            maxDealDuration: maxDealDuration,
            retrieval: retrieval
        });
        registeredMinerIds.push(minerId);

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

    ) external {
        Miner memory miner = minerRecord[minerId];
        require(miner.paymentReceiver != address(0), "Miner not registered");

        // user need to approve the following amount this contract
        uint256 paymentAmount = getDealPrice(miner.pricePerGB, deal.piece_size);
        IERC20 paymentToken = IERC20(miner.paymentToken);
        require(paymentToken.transferFrom(msg.sender, miner.paymentReceiver, paymentAmount), "Payment failed");

        bytes32 dealId = dealClient.makeDealProposal(deal);

        dealRecord[dealId] = deal;
        userDeals[msg.sender].push(dealId);
        minerDeals[minerId].push(dealId);

        emit DealProposed(dealId, minerId, msg.sender);
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
    function getDealPrice(uint256 pricePerGB, uint256 sizeInBytes) public view returns(uint256){
        uint256 sizeInGB = sizeInBytes / (1024 * 1024 * 1024);
        return pricePerGB * sizeInBytes;
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
    function getPieceDeals(bytes memory pieceCid) external view returns(uint64){
        return dealClient.pieceDeals(pieceCid);
    }
}
