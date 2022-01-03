import React from 'react';
import { Table, Button } from 'semantic-ui-react';

import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
const { Row, Cell } = Table;

const RequestRow = ({ request, id, address, approversCount = '0' }) => {
  const campaign = Campaign(address);
  const canFinalize = request.approvalCount > approversCount / 2;

  const onApprove = async (e) => {
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(id).send({ from: accounts[0] });
  };

  const onFinalize = async (e) => {
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(id).send({ from: accounts[0] });
  };

  return (
    <Row disabled={request.complete} positive={canFinalize && !request.complete}>
      <Cell>{id}</Cell>
      <Cell>{request.description}</Cell>
      <Cell>{web3.utils.fromWei(request.value, 'ether')} ether</Cell>
      <Cell>{request.recipient}</Cell>
      <Cell>{request.approvalCount}/{approversCount}</Cell>
      {!request.complete && (
        <Cell>
          <Button color="green" basic onClick={onApprove}>Approve</Button>
        </Cell>
      )}
      {!request.complete && (
        <Cell>
          <Button color="teal" basic onClick={onFinalize}>Finalize</Button>
        </Cell>
      )}
    </Row>
  );
};

export default RequestRow;
