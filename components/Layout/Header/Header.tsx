/* eslint-disable no-unused-vars */
import React from 'react';

import Button from 'components/Buttons/Button/Button';
// import './header.css';

interface HeaderProps {
  user?: {};
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
}

const Header = ({
  user, onLogin, onLogout, onCreateAccount,
}: HeaderProps) => (
  <header>
    <div className="wrapper">
      <div>

        <h1>Groupshop</h1>
      </div>
      <div>
        {/* <Button size="small" label="Log out" /> */}
        {/* {user ? (
          <Button size="small" onClick={onLogout} label="Log out" />
        ) : (
          <>
            <Button size="small" onClick={onLogin} label="Log in" />
            <Button primary size="small" onClick={onCreateAccount} label="Sign up" />
          </>
        )} */}
      </div>
    </div>
  </header>
);

Header.defaultProps = {
  user: {},
};

export default Header;
