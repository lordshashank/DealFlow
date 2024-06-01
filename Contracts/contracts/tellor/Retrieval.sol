// SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

import "./Tellor-flatfile.sol";

contract PriceContract {
    bytes public fileCidInBytes;
    string public retrieved_cid;
    TellorFlex public tellor;

    // 0xb2CB696fE5244fB9004877e58dcB680cB86Ba444
    // This contract now has access to all functions in UsingTellor
    constructor(address payable _tellorAddress) {
        tellor = TellorFlex(_tellorAddress);
    }

    function getFileCid(string memory cid) external returns(string memory) {
        // "https://gateway.lighthouse.storage/ipfs/QmNVoZntCBiHq1PEqd1J31Ywy4crjVAVYFbMWMGUN2L3Lg"

        string memory url = string(
            abi.encodePacked("https://ipfs.io/ipfs/", cid)
        );

        bytes memory queryData = abi.encode("FileCID", abi.encode(url));
        bytes32 _queryId = keccak256(queryData);

        uint256 _timestamp;
        bytes memory _value;

        (, _value, _timestamp) = tellor.getDataBefore(
            _queryId,
            block.timestamp - 10 seconds
        );
        fileCidInBytes = _value;
        retrieved_cid = abi.decode(_value, (string));

        return retrieved_cid;
    }
}
