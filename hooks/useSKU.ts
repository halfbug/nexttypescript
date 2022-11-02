import { useEffect, useState } from 'react';
import { IProduct } from 'types/store';
import useAppContext from './useAppContext';
import useUtilityFunction from './useUtilityFunction';

const useSKU = () => {
  const { gsctx } = useAppContext();
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [memberProducts, setMemberProducts] = useState<any[]>([]);
  const [dealProductsCTX, setDealProducts] = useState<any[]>([]);
  const [inventoryProducts, setInventoryProducts] = useState<any[]>([]);
  const [hideSection, setHideSection] = useState<boolean>(false);
  const { getUniqueArray } = useUtilityFunction();

  useEffect(() => {
    if (gsctx.campaign?.products?.length) {
      setAllProducts(gsctx.campaign?.products);
    }
    if (gsctx.dealProducts?.length) {
      setDealProducts(gsctx.dealProducts);
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
      const products = gsctx.allProducts.map((ele) => ele.id)
        .filter((value, index, self) => self.indexOf(value) === index);
      const popularProducts = gsctx.popularProducts.map((ele) => ele.id)
        .filter((value, index, self) => self.indexOf(value) === index);
      const arr = JSON.stringify(products)
        === JSON.stringify(popularProducts);
      setHideSection(arr);
      // console.log('🎈 products', products);
      // console.log('🎈 popularProducts', popularProducts);
      // console.log('🎈 arr', arr);
    }
  }, [gsctx]);

  return {
    SKU: allProducts, memberProducts, hideSection, inventoryProducts, dealProductsCTX,
  };
};

export default useSKU;
