import React from 'react';
import type { NextPage } from 'next';
// import Head from 'next/head';
import { useRouter } from 'next/router';
import Page from 'components/Layout/Page/Page';
import useInstallation from 'hooks/useInstallation';
import { StoreContext } from 'store/store.context';
// import useStore from 'hooks/useStore';

const ShopMain: NextPage = () => {
  const { query: { shop, ins } } = useRouter();
  // const { installationDialogue } = useInstallation(ins);
  // const { merchantStore } = useStore(sci || undefined);
  const { store } = React.useContext(StoreContext);
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
