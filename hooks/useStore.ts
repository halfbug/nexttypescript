import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/client';
import { GET_PRODUCTS } from 'store/store.graphql';

const useStore = () => {
  const { query: { shop } } = useRouter();
  const [getStoreProducts, { loading, error, data: products }] = useLazyQuery(GET_PRODUCTS, {
    variables: {
      productQueryInput: {
        shop,
        sort: -1,
        limit: 10000,
      },
    },
  });
  const getProducts = useCallback(() => {
    getStoreProducts();

    return ({ error, loading, products });
  }, [shop]);

  useEffect(() => {
    if (products?.length > 0) { console.log({ products }); }
  }, [products]);
  return { shop, getProducts };
  // return { getStore };
};
export default useStore;
