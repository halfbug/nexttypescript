import React from 'react';

import Header from 'components/Layout/Header/Header';
// import './page.css';

interface PageProps {
  user?: {};
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
  children: {}
}

const Page = ({
  user, onLogin, onLogout, onCreateAccount, children,
}: PageProps) => (
  <article>
    <Header user={user} onLogin={onLogin} onLogout={onLogout} onCreateAccount={onCreateAccount} />

    <section>
      <h2>Overview</h2>
      {children}
    </section>
  </article>
);

Page.defaultProps = {
  user: {},
};

export default Page;
