import React from 'react';
import { Menu } from 'semantic-ui-react';

import { Link } from '../routes';

const Header = () => {
  return (
    <Menu>
      <Link href="/">
        <Menu.Item>CrowdCoin</Menu.Item>
      </Link>
      <Menu.Menu position="right">
        <Link href="/campaigns">
          <Menu.Item>Campaigns</Menu.Item>
        </Link>

        <Link href="/campaigns/new">
          <Menu.Item>+</Menu.Item>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;