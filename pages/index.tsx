import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
// import styles from '../styles/Home.module.scss';
import Page from '../components/Layout/Page/Page';

const Home: NextPage = () => {
  const { query: { shop } } = useRouter();

  return (
    <Page onLogin={undefined} onLogout={undefined} onCreateAccount={undefined}>
      dashboard
    </Page>
  );
};

export default Home;
