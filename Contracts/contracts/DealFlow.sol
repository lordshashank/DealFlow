// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title DealFlow
 * @dev A smart contract for managing deals between users and miners
 */
contract DealFlow is Ownable {

    
    /// @notice The amount of stake required for miner registration
    uint256 public stakeAmount;
    
    /// @notice The counter for deals
    uint256 public dealId;
    
    /// @notice List of registered miners
    string[] public minerIds;
    
    
    /// @notice Mapping of miner IDs to Miner details
    mapping(string => Miner) public minerRecord;

    /// @notice Mapping of deal IDs to Deal details
    mapping(uint256 => Deal) public deals;
   

    struct Miner {
        address payable paymentReceiver;
        address paymentToken;
        uint256 pricePerGB;
        string location;
        uint256 maxDealDuration;
        bool retrieval;
        uint256 stakeAmount;
    }

    struct Deal {
        string minerId;
        address user;
        bytes pieceCid;
        uint64 pieceSize;
        bool verifiedDeal;
        string label;
        int64 startEpoch;
        int64 endEpoch;
        address paymentToken;
        uint256 paymentAmount;
    }

    event MinerRegistered(string minerId, address minerAddress);

    event DealProposed(uint256 dealId, string minerId, address userAddress);

    /**
     * @dev Initializes the contract setting the initial stake amount and setting ownership.
     * @param _stakeAmount The initial stake amount required for miner registration.
     */
    constructor(uint _stakeAmount) Ownable(msg.sender) {
        stakeAmount = _stakeAmount;
    }

    /**
     * @notice Sets the stake amount for miners
     * @param _stakeAmount The stake amount in wei
     */
    function setStakeAmount(uint256 _stakeAmount) external onlyOwner {
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
            retrieval: retrieval,
            stakeAmount: msg.value
        });
        minerIds.push(minerId);

        emit MinerRegistered(minerId, msg.sender);
    }

    /**
     * @notice Retrieves all registered miners
     * @return An array of miner IDs
     */
    function getAllRegisteredMiners() external view returns (string[] memory) {
        return minerIds;
    }

    /**
     * @notice Proposes a deal with a registered miner
     * @param minerId The ID of the miner
     * @param pieceCid The piece CID
     * @param pieceSize The size of the piece
     * @param verifiedDeal Whether the deal is verified
     * @param label A label for the deal
     * @param startEpoch The start epoch
     * @param endEpoch The end epoch
     */
    function proposeDeal(
        string memory minerId,
        bytes memory pieceCid,
        uint64 pieceSize,
        bool verifiedDeal,
        string memory label,
        int64 startEpoch,
        int64 endEpoch
    ) external {
        Miner storage miner = minerRecord[minerId];
        require(miner.paymentReceiver != address(0), "Miner not registered");

        uint256 paymentAmount = miner.pricePerGB * pieceSize;
        IERC20 paymentToken = IERC20(miner.paymentToken);
        require(paymentToken.transferFrom(msg.sender, miner.paymentReceiver, paymentAmount), "Payment failed");

        deals[dealId] = Deal({
            minerId: minerId,
            user: msg.sender,
            pieceCid: pieceCid,
            pieceSize: pieceSize,
            verifiedDeal: verifiedDeal,
            label: label,
            startEpoch: startEpoch,
            endEpoch: endEpoch,
            paymentToken: miner.paymentToken,
            paymentAmount: paymentAmount
        });

        emit DealProposed(dealId, minerId, msg.sender);
        dealId++;
    }
}
