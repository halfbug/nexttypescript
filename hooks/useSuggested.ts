import {
  useContext,
  useEffect, useState,
} from 'react';
import { IProduct } from 'types/store';
import useAppContext from './useAppContext';
import useUtilityFunction from './useUtilityFunction';

const useSuggested = () => {
  const {
    gsctx,
    dispatch,
    isGroupshop,
  } = useAppContext();

  const { uniqueArray } = useUtilityFunction();

  const [suggestedProd, setsuggestedProd] = useState<IProduct[] | undefined>(undefined);

  useEffect(() => {
    const {
      allProducts, isDrops, bestSellerProducts, sections,
    } = gsctx;
    let newProd = isDrops ? (sections?.find((ele) => ele.name === 'Bestsellers')?.products ?? []) : (uniqueArray(allProducts) ?? []);
    // newProd = newProd.sort(() => Math.random() - 0.5); // shuffle array to have random products
    // if (!isDrops) {
    newProd = newProd
      .filter((item:any) => item.outofstock === false)
      .slice(0, 4);
    setsuggestedProd(newProd);
    // } else if (spotlightProducts) {
    //   newProd = spotlightProducts
    //     .filter((item) => item.outofstock === false)
    //     .slice(0, 4);
    //   setsuggestedProd(newProd);
    // }
  }, [gsctx, gsctx.cart]);

  return {
    suggestedProd,
  };
};
export default useSuggested;
