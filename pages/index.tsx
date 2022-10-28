import React, { useEffect } from 'react';
import type { NextPage } from 'next';
// import Head from 'next/head';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Page from '../components/Layout/Page/Page';
import useInstallation from '../hooks/useInstallation';
// import useStore from 'hooks/useStore';

const Home: NextPage = () => {
  const { query: { shop, ins }, push } = useRouter();
  const { installationDialogue } = useInstallation(ins);
  // const { merchantStore } = useStore(sci || undefined);

  useEffect(() => {
    if (!shop) { push('https://www.groupshop.com/consumers'); }
  }, [shop]);

  return (
    <>
      <Head>

        <meta name="facebook-domain-verification" content="e20mavbjsi9do1coqxjvn54hvcs69g" />
      </Head>
      <Page headingText="Groupshop" onLogin={() => { }} onLogout={() => { }} onCreateAccount={() => { }}>
        dashboard
        {shop}

        {installationDialogue()}

      </Page>

    </>
  );
};

export default Home;
