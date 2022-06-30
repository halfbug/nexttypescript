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

  const { filterArray } = useUtilityFunction();
  const {
    members: [
      {
        products: ownerProducts,
      },
    ],
  } = gsctx;

  useEffect(() => {
    if (products && popularShuffled === undefined) {
      const ADD_EVERY = 3;
      const ITEM_TO_ADD:IProduct = {
        id: '0000A',
        title: 'AddProductType',
        featuredImage: '',
        price: '',
        currencyCode: 'USD',

      };
      const onlyAddProducts = filterArray(gsctx?.popularProducts ?? [], ownerProducts ?? [], 'id', 'id');
      const onlyBoughtProducts = filterArray(gsctx?.popularProducts ?? [], gsctx?.addedProducts ?? [], 'id', 'productId');
      // const addedByFirstPopularPrds = [...products];
      const addedByFirstPopularPrds = _.uniq([...onlyAddProducts, ...onlyBoughtProducts]);
      console.log('🚀 ~ file: usePopularProduct.ts ~ line 11 ~ usePopular ~ onlyBoughtProducts', onlyBoughtProducts);
      console.log('🚀 ~ file: usePopularProduct.ts ~ line 11 ~ usePopular ~ onlyAddProducts', onlyAddProducts);

      // Insert AddProduct Tile after every 3 items of Popular Products
      const data = flatten(
        chunk(addedByFirstPopularPrds, ADD_EVERY).map((section) => (
          section.length === ADD_EVERY ? [...section, ITEM_TO_ADD] : section
        )),
      );
      console.log('🚀 ~ file: usePopularProduct.ts ~ line 34 ~ useEffect ~ data', data);
      setPopularShuffled(data);
    }
  }, [products]);
  console.log({ popularShuffled });

  return {
    popularShuffled,
  };
};
export default usePopular;
