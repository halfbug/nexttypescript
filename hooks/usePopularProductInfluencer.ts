/* eslint-disable max-len */
import {
  useContext,
  useEffect, useState,
} from 'react';
import { IProduct } from 'types/store';
import _, { chunk, flatten } from 'lodash';
import { PartnerGroupshopContext } from 'store/partner-groupshop.context';
import useUtilityFunction from './useUtilityFunction';
import useDeal from './useDeal';

const usePopularInfluencer = (products:IProduct[] | undefined) => {
  const [popularShuffled, setPopularShuffled] = useState<IProduct[] | undefined>(undefined);

  const {
    gsctx,
    dispatch,
  } = useContext(PartnerGroupshopContext);

  const { filterArray } = useUtilityFunction();
  const { addedProductsByInfluencer, addedByRefferal } = useDeal();

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
      const onlyBoughtnRefProducts = filterArray(products ?? [], addedProductsByInfluencer ?? [], 'id', 'id');
      const addedByFirstPopularPrds = _.uniq([...products ?? []]);

      // Insert AddProduct Tile after every 3 items of Popular Products
      const data = flatten(
        chunk(addedByFirstPopularPrds, ADD_EVERY).map((section) => (
          section.length === ADD_EVERY ? [...section, ITEM_TO_ADD] : section
        )),
      );
      setPopularShuffled(data);
    }
  }, [products]);

  return {
    popularShuffled,
  };
};
export default usePopularInfluencer;
