/* eslint-disable max-len */
import {
  useContext,
  useEffect, useState,
} from 'react';
import { IProduct } from 'types/store';
import _, { chunk, flatten } from 'lodash';
import { GroupshopContext } from 'store/groupshop.context';
import useUtilityFunction from './useUtilityFunction';

const usePopular = (products:IProduct[] | undefined) => {
  const [popularShuffled, setPopularShuffled] = useState<IProduct[] | undefined>(undefined);

  const {
    gsctx,
    dispatch,
  } = useContext(GroupshopContext);

  const { filterArray, uniqueArray } = useUtilityFunction();

  useEffect(() => {
    if (products) {
      // if (products && popularShuffled === undefined) {
      const ADD_EVERY = 3;
      const ITEM_TO_ADD:IProduct = {
        id: '0000A',
        title: 'AddProductType',
        featuredImage: '',
        price: '',
        currencyCode: 'USD',

      };
      // added product by refferal + bought products = popular products
      const reffDealsPrd = gsctx?.store?.products?.filter(
        (item) => gsctx?.refferalDealsProducts?.find((item2) => item.id === item2.productId),
      );
      console.log('🚀 ~ file: usePopularProduct.ts ~ line 37 ~ useEffect ~ reffDealsPrd', reffDealsPrd);
      const addedByFirstPopularPrds: IProduct[] = uniqueArray([...reffDealsPrd ?? [], ...products]);
      console.log('🚀 ~ file: usePopularProduct.ts ~ line 41 ~ useEffect === popular', uniqueArray([...reffDealsPrd ?? [], ...products]));

      // Insert AddProduct Tile after every 3 items of Popular Products
      const data = flatten(
        chunk(addedByFirstPopularPrds, ADD_EVERY).map((section) => (
          section.length === ADD_EVERY ? [...section, ITEM_TO_ADD] : section
        )),
      );
      setPopularShuffled(data.filter((prd) => prd.outofstock !== true));
    }
  }, [products, gsctx?.refferalDealsProducts]);

  return {
    popularShuffled,
  };
};
export default usePopular;
