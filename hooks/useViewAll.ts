import {
  useEffect, useState,
} from 'react';
import { IProduct } from 'types/store';
import useCode from './useCode';
import useAppContext from './useAppContext';

const useViewAll = () => {
  const { gsctx } = useAppContext();
  const { sections } = gsctx;
  const { qrscan, backHome } = useCode();
  const [showViewAll, setshowViewAll] = useState<boolean>(false);
  const [showQrscan, setshowQrscan] = useState<boolean>(false);
  const [vProduct, setvProduct] = useState<IProduct | undefined>(undefined);
  const [section, setSection] = useState<IProduct[] | undefined>([]);

  useEffect(() => {
    if (vProduct && sections) {
      setshowViewAll(true);
      const prd: any = sections.find((p:any) => p.shopifyId === vProduct);
      setSection(prd);
    }
  }, [vProduct, sections]);

  useEffect(() => {
    if (!showViewAll) {
      setvProduct(undefined);
      backHome();
    }
  }, [showViewAll]);

  return {
    vProduct, showViewAll, setvProduct, section, setshowViewAll, showQrscan, setshowQrscan,
  };
};
export default useViewAll;
