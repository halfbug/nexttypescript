import React, { useContext, useEffect } from 'react';
import type { GetServerSidePropsContext, NextPage } from 'next';
// import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import Page from 'components/Layout/Page/Page';
import useInstallation from 'hooks/useInstallation';
import { useQuery } from '@apollo/client';
import { GET_STORE } from 'store/store.graphql';

import { StoreContext } from 'store/store.context';
import { Spinner } from 'react-bootstrap';

const ShopMain: NextPage = () => {
  const { query: { shop, ins } } = useRouter();

  const { loading, error, data } = useQuery(GET_STORE);
  // console.log('🚀 ~ file: [ins].tsx ~ line 21 ~ data', data);
  // console.log('🚀 ~ file: [ins].tsx ~ line 21 ~ error', error);
  // console.log('🚀 ~ file: [ins].tsx ~ line 21 ~ loading', loading);
  const { installationDialogue } = useInstallation(ins);

  const { store, dispatch } = useContext(StoreContext);

  useEffect(() => {
    if (data) {
      dispatch({ type: 'UPDATE_STORE', payload: data?.storeName });
    }
    // return () => {
    //   cleanup
    // }
  }, [data]);
  if (store.installationStep == null) {
    const shopName: string[] | undefined = store?.shop?.split('.', 1);
    Router.push(`/${shopName}/overview`);
  }

  return (
    <Page headingText="Groupshop" onLogin={() => {}} onLogout={() => {}} onCreateAccount={() => {}}>
      <Spinner animation="border" variant="primary" />

      {installationDialogue()}

    </Page>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // console.log('🚀 ~ file: [ins].tsx ~ line 51 ~ getServerSideProps ~ context', context?.req);
  const { cookies: { token } } = context.req;
  // console.log(' ~ token', token);
  if (token) {
    return {
      props: { token }, // Will be passed to the page component as props
    };
  }
  return { props: {} };
}
export default ShopMain;
