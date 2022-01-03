// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract CampaignFactory {
  address[] public deployedCampaigns;

  function createCampaign(uint minimum) public {
    address newCampaign = address(new Campaign(minimum, msg.sender));
    deployedCampaigns.push(newCampaign);
  }

  function getDeployedCampaigns() public view returns (address[] memory _deployedCampaigns) {
    return deployedCampaigns;
  }
}

contract Campaign {
  struct Request {
    string description;
    uint value;
    bool complete;
    address recipient;
    uint approvalCount;
    mapping(address => bool) approvals;
  }

  mapping(uint => Request) public requests;
  uint public numRequests;
  address public manager;
  uint public minimumContribution;
  mapping(address => bool) public approvers;
  uint public approversCount;

  modifier restricted() {
    require(msg.sender == manager, "You need to be admin");
    _;
  }

  constructor(uint minimum, address creator) {
    manager = creator;
    minimumContribution = minimum;
  }

  function contribute() public payable {
    require(msg.value > minimumContribution, "Can't be less than minimum contribution");
    approvers[msg.sender] = true;
    approversCount++;
  }

  function createRequest(string memory _description, uint _value, address _recipient) public restricted {
    Request storage newRequest = requests[numRequests++];
    newRequest.description = _description;
    newRequest.value = _value;
    newRequest.recipient = _recipient;
    newRequest.complete = false;
    newRequest.approvalCount = 0;
  }

  function approveRequest(uint index) public {
    Request storage request = requests[index];

    require(approvers[msg.sender], "You need to be one approver");
    require(!request.approvals[msg.sender], "You can't approve again");

    request.approvals[msg.sender] = true;
    request.approvalCount++;
  }

  function finalizeRequest(uint index) public payable restricted {
    Request storage request = requests[index];
    require(request.approvalCount > (approversCount / 2), "You can't finalize the request yet");
    require(!request.complete, "Request is already completed");

    payable(request.recipient).transfer(request.value);
    request.complete = true;
  }

  function getSummary() public view returns (uint, uint, uint, uint, address) {
    return (
      minimumContribution,
      address(this).balance,
      numRequests,
      approversCount,
      manager
    );
  }

  function getRequestsCount() public view returns (uint) {
    return numRequests;
  }
}