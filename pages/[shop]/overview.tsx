import React, { useEffect, useContext } from 'react';
import type { NextPage } from 'next';
// import Head from 'next/head';
import { useRouter } from 'next/router';
import Page from 'components/Layout/Page/Page';
import useInstallation from 'hooks/useInstallation';
import { StoreContext } from 'store/store.context';
import { useQuery } from '@apollo/client';
import { GET_STORE } from 'store/store.graphql';
// import useStore from 'hooks/useStore';

const ShopMain: NextPage = () => {
  const { query: { shop, ins } } = useRouter();

  const { loading, error, data } = useQuery(GET_STORE, {

    variables: { shop },
  });

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

  const obj = { ...store };
  delete obj.products;
  delete obj.collections;
  const jsonStore = JSON.stringify(obj, null, '\t');
  console.log('inside shop folder');
  return (
    <Page onLogin={() => {}} onLogout={() => {}} onCreateAccount={() => {}}>
      dashboard overview
      {shop}
      <div><pre>{ jsonStore }</pre></div>

      {/* {installationDialogue()} */}

    </Page>
  );
};

export default ShopMain;
