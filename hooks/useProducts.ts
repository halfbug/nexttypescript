import {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_PRODUCTS } from 'store/store.graphql';
import { GroupshopContext } from 'store/groupshop.context';
import _ from 'lodash';
import { IProduct } from 'types/store';
import useUtilityFunction from './useUtilityFunction';

const useProducts = (shop: string) => {
  const {
    gsctx,
    dispatch,
  } = useContext(GroupshopContext);

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
        console.log('🚀 ~ file: useProducts.ts ~ line 48 ~ useEffect ~ otherProducts', otherProducts);
        // otherProducts = otherProducts.length > 0
        //   ? otherProducts.filter((item: any) => +item.price > 1)
        //   : otherProducts;

        // console.log(findInArray(gsctx.campaign?.addableProducts, productsql?
        // .data?.products || [], null, 'id'));
      } else {
        otherProducts = data?.products.filter(
          (o1: IProduct) => !gsctx?.allProducts?.some((o2: IProduct) => o1.id === o2.id),
        ).filter((item: any) => +item.price > 1);
        // console.log({ otherProducts });
        // console.log('otherproduct', otherProducts.filter(({ price }) => +price > 1));
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
