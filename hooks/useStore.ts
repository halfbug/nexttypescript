// import { useCallback } from 'react';
// import { IStore } from 'types/store';
// import { gql } from '@apollo/client';
// import client from 'config/apollo.client';

const useStore = (shop: string) => {
//   const [merchantStore, setMerchantStore] = useState(null);
  // const { query: { shop, ins, sci } } = useRouter();
  console.log('shop inside hook', shop);
  // const getStore = useCallback(() => client.query({

  // }), []);
  return shop;
  // return { getStore };
};
export default useStore;
