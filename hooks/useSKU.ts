import { useEffect, useState } from 'react';
import { IProduct } from 'types/store';
import useAppContext from './useAppContext';
import useUtilityFunction from './useUtilityFunction';

const useSKU = () => {
  const { gsctx } = useAppContext();
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [memberProducts, setMemberProducts] = useState<any[]>([]);
  const [inventoryProducts, setInventoryProducts] = useState<any[]>([]);
  const [hideSection, setHideSection] = useState<boolean>(false);
  const { getUniqueArray } = useUtilityFunction();

  useEffect(() => {
    if (gsctx.campaign?.products?.length) {
      setAllProducts(gsctx.campaign?.products);
    }
    if (gsctx.store?.allInventoryProducts?.length) {
      setInventoryProducts(gsctx.store?.allInventoryProducts);
    }
    if (gsctx.members.length) {
      const temp: IProduct[] = [];
      gsctx.members.map((ele) => ele.products?.map((item) => temp.push(item)));
      setMemberProducts([...gsctx?.popularProducts ?? [], ...gsctx?.ownerDeals ?? []]);
    }
    if (gsctx.allProducts?.length && gsctx.popularProducts?.length) {
      const products = gsctx.allProducts.map((ele) => ele.id);
      const popularProducts = gsctx.popularProducts.map((ele) => ele.id);
      const arr = JSON.stringify(getUniqueArray(products))
        === JSON.stringify(getUniqueArray(popularProducts));
      setHideSection(arr);
    }
  }, [gsctx]);

  return {
    SKU: allProducts, memberProducts, hideSection, inventoryProducts,
  };
};

export default useSKU;
