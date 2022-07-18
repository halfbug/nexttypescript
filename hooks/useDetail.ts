import {
  useEffect, useState,
} from 'react';
import { IProduct } from 'types/store';
import useCode from './useCode';

const useDetail = (products:any) => {
  const { productCode, qrscan } = useCode();
  const [showDetail, setshowDetail] = useState<boolean>(false);
  const [showQrscan, setshowQrscan] = useState<boolean>(false);
  const [sProduct, setsProduct] = useState<IProduct | undefined>(undefined);

  useEffect(() => {
    if (productCode && products && !sProduct) {
      const prd = products.find((p: { id: string; }) => p.id === `gid://shopify/Product/${productCode}`);
      setsProduct(prd);
    }
  }, [productCode, products]);

  useEffect(() => {
    if (sProduct) setshowDetail(true);
  }, [sProduct]);

  useEffect(() => {
    if (qrscan) setshowQrscan(true);
  }, [qrscan]);

  useEffect(() => {
    if (!showDetail) { setsProduct(undefined); }
  }, [showDetail]);

  return {
    sProduct, showDetail, setsProduct, setshowDetail, showQrscan, setshowQrscan,
  };
};
export default useDetail;
