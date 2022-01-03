import React, { useState } from 'react';
import { Button, Form, Input, Label, Message } from 'semantic-ui-react';

import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';

import { Router } from '../routes';

const ContributeForm = ({ address }) => {
  const [contribution, setContribution] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const accounts = await web3.eth.getAccounts();
      const campaign = Campaign(address);
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(contribution, 'ether'),
      });
      setErrorMessage('');
      setContribution(0);
      Router.replaceRoute(`/campaigns/${address}`);
    } catch (err) {
      setErrorMessage(err.message);
    }

    setLoading(false);
  };

  return (
    <Form onSubmit={onSubmit} error={!!errorMessage}>
      <Message
        error
        header="Oops!"
        content={errorMessage}
      />
      <Form.Field>
        <Label>Amount to contribute</Label>
        <Input
          type="number"
          label="ether"
          labelPosition="right"
          value={contribution}
          onChange={e => setContribution(e.target.value)}
        />
      </Form.Field>

      <Button loading={loading} primary>Contribute</Button>
    </Form>
  );
};

export default ContributeForm;