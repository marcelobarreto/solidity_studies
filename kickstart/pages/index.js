import React from 'react';
import { Card, Button } from 'semantic-ui-react';

import { Link } from '../routes';
import factory from '../ethereum/factory';

const Page = ({ campaigns }) => {
  const renderCampaigns = () => {
    const items = campaigns.map((campaign) => ({
      header: campaign,
      description: <Link href={`/campaigns/${campaign}`}><a>View Campaign</a></Link>,
      fluid: true,
    }));

    return <Card.Group items={items} />;
  };

  return (
    <div>
      <h3>Open Campaigns</h3>
      <Link href="/campaigns/new">
        <Button floated="right" content="Create Campaign" icon="add circle" primary />
      </Link>
      {renderCampaigns()}
    </div>
  );
};

Page.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
}

export default Page;
