import {
  useContext,
  useEffect, useState, useCallback,
} from 'react';
import { GroupshopContext } from 'store/groupshop.context';
import useAppContext from './useAppContext';
import useUtilityFunction from './useUtilityFunction';

const useBanner = () => {
  const {
    gsctx: groupshop,
    dispatch,
  } = useAppContext();
  const {
    getKeyFromS3URL,
  } = useUtilityFunction();
  // console.log('🚀 ~ file: useBanner.ts ~ line 14 ~ useBanner ~ groupshop', groupshop);

  const [bannerImage, setBannerImage] = useState<string>('');
  // console.log('🚀 ~ file: useBanner.ts ~ line 20 ~ useBanner ~ bannerImage', bannerImage);

  useEffect(() => {
    if (groupshop?.store?.settings) {
      if (groupshop?.store?.settings?.general?.imageUrl !== '' && groupshop?.store?.settings?.general?.imageUrl) {
        const s3path = getKeyFromS3URL(groupshop?.store?.settings?.general?.imageUrl);
        const banner = `${process.env.IMAGE_PATH}/${s3path}`;
        setBannerImage(banner);
      }
      // else {
      //   setBannerImage(`${process.env.IMAGE_PATH}/${'bg.jpg'}`);
      // }
    }
  });
  return bannerImage;
};
export default useBanner;
