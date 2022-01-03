import React from 'react';
import { Button, Table } from 'semantic-ui-react';

import { Link } from '../../../routes';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

const { Header, Row, HeaderCell, Body } = Table;

const Page = ({ address, requestsCount = 0, approversCount = 0, requests = [] }) => {
  const renderRows = () => {
    return requests.map((request, index) => (
      <RequestRow
        key={index}
        id={index}
        address={address}
        approversCount={approversCount}
        request={request}
      />
    ));
  };

  return (
    <div>
      <h3>Request list ({requestsCount})</h3>

      <Link href={`/campaigns/${address}/requests/new`}>
        <Button primary>Add request</Button>
      </Link>

      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>

        <Body>{renderRows()}</Body>
      </Table>
    </div>
  );
};

Page.getInitialProps = async (props) => {
  const { address } = props.query;
  const campaign = Campaign(address);

  const requestsCount = await campaign.methods.getRequestsCount().call();
  const approversCount = await campaign.methods.approversCount().call();
  let requests = [];

  if (requestsCount > 0) {
    requests = await Promise.all(Array(parseInt(requestsCount)).fill().map((_, index) => {
      return campaign.methods.requests(index).call();
    }));
  }

  return { address, requestsCount, approversCount, requests };
};

export default Page;
