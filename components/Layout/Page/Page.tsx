import React from 'react';

import Header from 'components/Layout/Header/Header';
// import './page.css';

interface PageProps {
  user?: {};
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
}

const Page = ({
  user, onLogin, onLogout, onCreateAccount,
}: PageProps) => (
  <article>
    <Header user={user} onLogin={onLogin} onLogout={onLogout} onCreateAccount={onCreateAccount} />

    <section>
      <h2>Overview</h2>

    </section>
  </article>
);

Page.defaultProps = {
  user: {},
};

export default Page;
