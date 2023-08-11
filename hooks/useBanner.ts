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
      console.log('groupshopgroupshopgroupshop', groupshop);
      if (groupshop?.store?.settings?.dropBanner !== '' && groupshop?.store?.settings?.dropBanner) {
        // const s3path = getKeyFromS3URL(groupshop?.store?.settings?.dropBanner);
        // const banner = `${process.env.IMAGE_PATH}/${s3path}`;
        setBannerImage(groupshop?.store?.settings?.dropBanner);
      } else {
        // setBannerImage(`${process.env.IMAGE_PATH}/${'bg.jpg'}`);
        setBannerImage('https://s3.amazonaws.com/gsnodeimages/native-root-stage_a43a85d6229c.jpg');
      }
    }
  });
  return bannerImage;
};
export default useBanner;
