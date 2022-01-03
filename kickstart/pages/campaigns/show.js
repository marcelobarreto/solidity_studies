import React from 'react';
import { Card, Grid } from 'semantic-ui-react';

import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';

import ContributeForm from '../../components/ContributeForm';

const Page = ({ address, minimumContribution, balance, requests, approvers, manager }) => {
  const renderCards = () => {
    const items = [
      {
        header: manager,
        meta: 'Address of Manager',
        description: 'The manager created this campaign and can create requests to withdraw',
        style: {
          overflowWrap: 'break-word',
        },
      },
      {
        header: minimumContribution,
        meta: 'Minimum contribution (wei)',
        description: 'You must contribute at least this much wei to become an approver',
      },
      {
        header: requests,
        meta: 'Number of requests',
        description: 'A request tries to withdraw money from the contract. Requests must be approved by approvers',
      },
      {
        header: approvers,
        meta: 'Number of approvers',
        description: 'Number of people who have donated to this campaign.',
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign balance (ether)',
        description: 'How much money this campaign has left to spend.',
      },

    ];

    return <Card.Group items={items} />
  };

  return (
    <div>
      <h3>Campaign Show</h3>
      <Grid>
        <Grid.Column width={10}>
          {renderCards()}
        </Grid.Column>
        <Grid.Column width={6}>
          <ContributeForm address={address} />
        </Grid.Column>
      </Grid>
    </div>
  );
};

Page.getInitialProps = async (props) => {
  const { address } = props.query;
  const campaign = Campaign(address);
  const summary = await campaign.methods.getSummary().call();

  return {
    address,
    minimumContribution: summary[0],
    balance: summary[1],
    requests: summary[2],
    approvers: summary[3],
    manager: summary[4],
  };
}

export default Page;
