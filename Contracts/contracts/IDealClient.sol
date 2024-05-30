// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {DealRequest} from "./DealClient.sol";

interface IDealClient {
    function makeDealProposal(
        DealRequest calldata deal
    ) external returns (bytes32);

    function pieceDeals(bytes memory pieceCid) external view returns (uint64);
}