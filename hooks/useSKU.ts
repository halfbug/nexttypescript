import { useContext, useEffect, useState } from 'react';
import { GroupshopContext } from 'store/groupshop.context';
import { IProduct } from 'types/store';
import useAppContext from './useAppContext';

const useSKU = () => {
  const { gsctx, isGroupshop } = useAppContext();
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [memberProducts, setMemberProducts] = useState<any[]>([]);

  useEffect(() => {
    if (gsctx.store?.products?.length) { setAllProducts(gsctx.store?.products); }
    if (gsctx.members.length) {
      const temp: IProduct[] = [];
      gsctx.members.map((ele) => ele.products?.map((item) => temp.push(item)));
      setMemberProducts(temp);
    }
  }, [gsctx]);

  useEffect(() => {
    console.log('isGroupshop <===', isGroupshop);
  }, [isGroupshop]);

  return { SKU: allProducts, memberProducts };
};

export default useSKU;
