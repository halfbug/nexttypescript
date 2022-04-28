import {
  useContext,
  useEffect, useState,
} from 'react';
import { GroupshopContext } from 'store/groupshop.context';
import { IProduct } from 'types/store';
import useUtilityFunction from './useUtilityFunction';

const useTopPicks = () => {
  const {
    gsctx,
    dispatch,
  } = useContext(GroupshopContext);
  const { filterArray } = useUtilityFunction();

  const [topPicks, setTopPicks] = useState<IProduct[] | undefined>();

  const { allProducts, popularProducts } = gsctx;
  useEffect(() => {
    const campaignAllPrd = [...allProducts ?? []];
    // newProd will have highest purchasecount sorted array and instock
    const newProd = campaignAllPrd.filter(
      (item) => item.purchaseCount !== null || item.outofstock === false,
    )
      .sort(
        (prd1, prd2) => (prd2?.purchaseCount!) - (prd1?.purchaseCount!),
      );
      // filter out the products that are already bought in this groupshop deal
    const finalTP = filterArray(newProd, popularProducts ?? [], 'id', 'id');
    setTopPicks([...finalTP.slice(0, 4)]);
  }, [gsctx]);
  console.log({ topPicks });

  return {
    topPicks,
  };
};
export default useTopPicks;
