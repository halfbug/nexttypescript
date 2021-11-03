import React from 'react';
import type { NextPage } from 'next';
// import Head from 'next/head';
import { useRouter } from 'next/router';
import Page from 'components/Layout/Page/Page';
import useInstallation from 'hooks/useInstallation';
import { useQuery } from '@apollo/client';
import { GET_STORE } from 'store/store.graphql';

const ShopMain: NextPage = () => {
  const { query: { shop, ins } } = useRouter();

  const { loading, error, data } = useQuery(GET_STORE, {

    variables: { shop },
  });
  console.log('🚀 ~ file: [ins].tsx ~ line 21 ~ data', data);
  console.log('🚀 ~ file: [ins].tsx ~ line 21 ~ error', error);
  console.log('🚀 ~ file: [ins].tsx ~ line 21 ~ loading', loading);
  const { installationDialogue } = useInstallation(ins);

  return (
    <Page onLogin={() => {}} onLogout={() => {}} onCreateAccount={() => {}}>
      dashboard
      {shop}

      {installationDialogue()}

    </Page>
  );
};

export default ShopMain;
