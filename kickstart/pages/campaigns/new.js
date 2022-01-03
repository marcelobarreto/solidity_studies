import React, { useState } from 'react';
import { Form, Input, Label, Button, Message } from 'semantic-ui-react';

import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

const Page = () => {
  const [minimumContribution, setMinimunContribution] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(minimumContribution)
        .send({ from: accounts[0] });

      setMinimunContribution(0);
      setErrorMessage('');

      Router.pushRoute('/');
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
        <Label>Minimum contribution</Label>
        <Input
          type="number"
          label="wei"
          labelPosition="right"
          value={minimumContribution}
          onChange={e => setMinimunContribution(e.target.value)}
        />
      </Form.Field>

      <Button primary loading={loading}>Create campaign</Button>
    </Form>
  );
};

export default Page;
