import _ from 'lodash';
import { useEffect, useState } from 'react';
import { IProduct } from 'types/store';
import useAppContext from './useAppContext';

const useSKU = () => {
  const { gsctx } = useAppContext();
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [memberProducts, setMemberProducts] = useState<any[]>([]);
  const [hideSection, setHideSection] = useState<boolean>(false);

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
    if (gsctx.allProducts?.length && gsctx.popularProducts?.length) {
      setHideSection(_.isEqual(gsctx.allProducts, gsctx.popularProducts));
    }
  }, [gsctx]);

  return { SKU: allProducts, memberProducts, hideSection };
};

export default useSKU;
