import React from 'react';
import type { NextPage } from 'next';
// import Head from 'next/head';
import { useRouter } from 'next/router';
import Page from 'components/Layout/Page/Page';
import useInstallation from 'hooks/useInstallation';
// import useStore from 'hooks/useStore';

const ShopMain: NextPage = () => {
  const { query: { shop, ins } } = useRouter();
  const { installationDialogue } = useInstallation(ins);
  // const { merchantStore } = useStore(sci || undefined);
  console.log('inside shop folder');
  return (
    <Page onLogin={() => {}} onLogout={() => {}} onCreateAccount={() => {}}>
      dashboard
      {shop}

      {installationDialogue()}

    </Page>
  );
};

export default ShopMain;
