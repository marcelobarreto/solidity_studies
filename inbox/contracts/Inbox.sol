// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract Inbox {
  string private message;

  constructor(string memory initialMessage) {
    message = initialMessage;
  }

  function setMessage(string memory newMessage) public {
    message = newMessage;
  }

  function getMessage() public view returns (string memory _message) {
    return message;
  }
}