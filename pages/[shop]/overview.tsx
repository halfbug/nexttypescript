import React, { useEffect, useContext, useState } from 'react';
import type { NextPage } from 'next';
// import Head from 'next/head';
import { useRouter } from 'next/router';
import Page from 'components/Layout/Page/Page';
import useInstallation from 'hooks/useInstallation';
import { StoreContext } from 'store/store.context';
import { useQuery } from '@apollo/client';
import { GET_STORE } from 'store/store.graphql';
import { IStore } from 'types/store';
// import useStore from 'hooks/useStore';

const ShopMain: NextPage = () => {
  const { query: { shop, ins } } = useRouter();

  const {
    loading, error, data, refetch,
  } = useQuery(GET_STORE, {

    variables: { shop },
  });

  const { installationDialogue } = useInstallation(ins);

  const { store, dispatch } = useContext(StoreContext);
  const [jsonobj, setjsonobj] = useState<any | undefined>(undefined);
  console.log('🚀 ~ file: [ins].tsx ~ line 21 ~ data', data);
  // console.log('🚀 ~ file: [ins].tsx ~ line 21 ~ error', error);
  // console.log('🚀 ~ file: [ins].tsx ~ line 21 ~ loading', loading);

  useEffect(() => {
    if (data) {
      dispatch({ type: 'UPDATE_STORE', payload: data?.storeName });
      if (!jsonobj && !loading && data) {
        const obj = { ...store };
        delete obj.products;
        delete obj.collections;
        setjsonobj(obj);
      }
    }
    // return () => {
    //   cleanup
    // }
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);

  const jsonStore = JSON.stringify(jsonobj, null, '\t');
  return (
    <Page headingText="Overview" onLogin={() => {}} onLogout={() => {}} onCreateAccount={() => {}}>
      dashboard overview
      {shop}
      {/* <div><pre>{ jsonStore }</pre></div> */}
      {loading && <p>.......loading....</p>}
      {data && <p>{JSON.stringify(data, null, '\t')}</p>}
      {/* {installationDialogue()} */}

    </Page>
  );
};

export default ShopMain;
