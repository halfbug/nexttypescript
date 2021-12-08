import React from 'react';
import type { NextPage } from 'next';
// import Head from 'next/head';
import { useRouter } from 'next/router';
import Page from '../components/Layout/Page/Page';
import useInstallation from '../hooks/useInstallation';
// import useStore from 'hooks/useStore';

const Home: NextPage = () => {
  const { query: { shop, ins } } = useRouter();
  const { installationDialogue } = useInstallation(ins);
  // const { merchantStore } = useStore(sci || undefined);

  return (
    <Page headingText="Groupshop" onLogin={() => {}} onLogout={() => {}} onCreateAccount={() => {}}>
      dashboard
      {shop}

      {installationDialogue()}

    </Page>
  );
};

export default Home;
