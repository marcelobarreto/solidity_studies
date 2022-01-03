import React, { useState } from 'react';
import { Button, Form, Label, Input, Message } from 'semantic-ui-react';

import { Router } from '../../../routes';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';

const Page = ({ address }) => {
  const [request, setRequest] = useState({ description: '', value: 0, recipient: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (name) => (e) => {
    setRequest((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const campaign = Campaign(address);

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(request.description, web3.utils.toWei(request.value, 'ether'), request.recipient)
        .send({ from: accounts[0] });
      setErrorMessage('');
      Router.pushRoute(`/campaigns/${address}/requests`);
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
        <Label>Description</Label>
        <Input onChange={onChange('description')} value={request.description} />
      </Form.Field>
      <Form.Field>
        <Label>Value</Label>
        <Input type="number" label="ether" labelPosition="right" onChange={onChange('value')} value={request.value} />
      </Form.Field>
      <Form.Field>
        <Label>Recipient</Label>
        <Input onChange={onChange('recipient')} value={request.recipient} />
      </Form.Field>

      <Button primary loading={loading}>Create request</Button>
    </Form>
  );
};

Page.getInitialProps = async (props) => {
  const { address } = props.query;

  return { address };
}

export default Page;
