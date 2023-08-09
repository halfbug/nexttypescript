import {
  useEffect, useState,
} from 'react';
import { IProduct } from 'types/store';
import useCode from './useCode';
import useAppContext from './useAppContext';

const useViewAll = () => {
  const { gsctx } = useAppContext();
  const { sections, forYouSections, selectedCategory } = gsctx;
  const { qrscan, backHome } = useCode();
  const [showViewAll, setshowViewAll] = useState<boolean>(false);
  const [showQrscan, setshowQrscan] = useState<boolean>(false);
  const [vProduct, setvProduct] = useState<string>('');
  const [section, setSection] = useState<IProduct[] | undefined>([]);

  useEffect(() => {
    if (vProduct && (sections || forYouSections)) {
      setshowViewAll(true);
      const prd: any = (
        selectedCategory === 'forYou'
          ? [...forYouSections?.map((forYou: { sections: any }) => forYou.sections) ?? []]
          : sections
      )?.flat().find((p:any) => p.shopifyId === vProduct);
      setSection(prd);
    }
  }, [vProduct, sections, forYouSections]);

  useEffect(() => {
    if (!showViewAll) {
      setvProduct('');
      backHome();
    }
  }, [showViewAll]);

  return {
    vProduct, showViewAll, setvProduct, section, setshowViewAll, showQrscan, setshowQrscan,
  };
};
export default useViewAll;
