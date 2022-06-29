import {
  useEffect, useState,
} from 'react';
import { IProduct } from 'types/store';
import _, { chunk, flatten } from 'lodash';

const usePopular = (products:IProduct[] | undefined) => {
  const [popularShuffled, setPopularShuffled] = useState<IProduct[] | undefined>(undefined);

  // Insert AddProduct Tile after every 3 items of Popular Products

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

      const data = flatten(
        chunk(_.uniq(products), ADD_EVERY).map((section) => (
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
