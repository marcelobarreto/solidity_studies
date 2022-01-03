import React from 'react';
import { Button } from 'semantic-ui-react';

import { Link } from '../../../routes';

const Page = ({ address }) => {
  return (
    <div>
      <h3>Request list</h3>

      <Link href={`/campaigns/${address}/requests/new`}>
        <Button primary>Add request</Button>
      </Link>
    </div>
  );
};

Page.getInitialProps = async (props) => {
  const { address } = props.query;
  return { address };
};

export default Page;
