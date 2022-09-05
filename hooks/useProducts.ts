import {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_PRODUCTS } from 'store/store.graphql';
import { GroupshopContext } from 'store/groupshop.context';
import _ from 'lodash';
import { IProduct } from 'types/store';
import useUtilityFunction from './useUtilityFunction';
import useAppContext from './useAppContext';

const useProducts = (shop: string) => {
  // const {
  //   gsctx,
  //   dispatch,
  // } = useContext(GroupshopContext);
  const { gsctx, dispatch } = useAppContext();
  const {
    findInArray,
  } = useUtilityFunction();
  const [getStoreProducts, { data }] = useLazyQuery(GET_PRODUCTS);

  useEffect(() => {
    if (gsctx.store?.brandName !== '') {
      getStoreProducts({
        variables: {
          productQueryInput: {
            shop,
            sort: -1,
            limit: 10000,
          },
        },

      });
    }
  }, [gsctx.store]);

  useEffect(() => {
    let otherProducts: IProduct[];
    if (data?.products && gsctx.allProducts) {
      if (gsctx.campaign?.addableProducts?.length) {
        otherProducts = findInArray(
          gsctx.campaign?.addableProducts,
          data?.products || [],
          null,
          'id',
        ).filter((item: any) => item !== undefined)
          .filter((item: any) => +item.price > 1);
      } else {
        otherProducts = data?.products.filter((item: any) => +item.price > 1);
      }
      dispatch({
        type: 'UPDATE_PRODUCTS',
        payload: {
          ...gsctx,
          store: { ...gsctx.store, products: _.uniq(otherProducts) },
        },
      });
    }
  }, [data]);
};
export default useProducts;
