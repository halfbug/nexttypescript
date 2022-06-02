import {
  useContext,
  useEffect, useState,
} from 'react';
import { GroupshopContext } from 'store/groupshop.context';
import { IProduct } from 'types/store';

const useSuggested = () => {
  const {
    gsctx,
    dispatch,
  } = useContext(GroupshopContext);

  const [suggestedProd, setsuggestedProd] = useState<IProduct[] | undefined>(undefined);

  useEffect(() => {
    const { allProducts } = gsctx;
    let newProd = [...allProducts ?? []];
    // newProd = newProd.sort(() => Math.random() - 0.5); // shuffle array to have random products
    newProd = newProd
      .filter((item) => item.outofstock === false)
      .slice(0, 4);
    setsuggestedProd(newProd);
  }, [gsctx, gsctx.cart]);

  return {
    suggestedProd,
  };
};
export default useSuggested;
