import {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_STORE } from 'store/store.graphql';
import { StoreContext } from 'store/store.context';

const useStore = () => {
  const { query: { shop } } = useRouter();

  const {
    loading, data, refetch,
  } = useQuery(GET_STORE);

  const { store, dispatch } = useContext(StoreContext);
  console.log('🚀 ~ file: overview.tsx ~ line 28 ~ store', store);
  const [jsonobj, setjsonobj] = useState<any | undefined>(undefined);
  // console.log('🚀 ~ file: [ins].tsx ~ line 21 ~ data', data);
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
};
export default useStore;
