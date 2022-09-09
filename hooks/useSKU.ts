import { useEffect, useState } from 'react';
import { IProduct } from 'types/store';
import useAppContext from './useAppContext';

const useSKU = () => {
  const { gsctx } = useAppContext();
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [memberProducts, setMemberProducts] = useState<any[]>([]);

  useEffect(() => {
    if (gsctx.store?.allInventoryProducts?.length) {
      setAllProducts(gsctx.store?.allInventoryProducts);
    }
    if (gsctx.members.length) {
      const temp: IProduct[] = [];
      gsctx.members.map((ele) => ele.products?.map((item) => temp.push(item)));
      // const arr = [...temp, ...gsctx?.popularProducts ?? []];
      setMemberProducts([...gsctx?.popularProducts ?? [], ...gsctx?.ownerDeals ?? []]);
    }
  }, [gsctx]);

  return { SKU: allProducts, memberProducts };
};

export default useSKU;
