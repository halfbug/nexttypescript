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
    getKeyFromS3URL, getSignedUrlS3,
  } = useUtilityFunction();

  const [bannerImage, setBannerImage] = useState<string>('');
  // const s3path = groupshop?.campaign?.settings?.s3imageUrl;
  const gets3headerBanner = useCallback(async () => {
    //   async function gets3headerBanner() {
    if (groupshop.id) {
      // if (groupshop?.campaign?.settings?.imageUrl) {
      //   const key = getKeyFromS3URL(groupshop?.campaign?.settings?.imageUrl ?? '');
      //   const bannerImageS3 = await getSignedUrlS3(key);
      //   if (bannerImageS3) imgBanner = bannerImageS3;
      // } else {
      //   imgBanner = 'https://gsnodeimages.s3.amazonaws.com/bg.jpg';
      // }
      if (bannerImage === '') {
        const key = getKeyFromS3URL(groupshop?.campaign?.settings?.imageUrl ?? '');
        setBannerImage(`${process.env.IMAGE_PATH}/${key}`);
      }
      // eslint-disable-next-line max-len
      // dispatch({ type: 'UPDATE_GROUPSHOP', payload: { ...groupshop, campaign: { ...groupshop.campaign, settings: { ...groupshop?.campaign?.settings, s3imageUrl: imgBanner } } } });
    }
  }, [groupshop]);
  useEffect(() => {
    gets3headerBanner();
  }, [groupshop]);

  return bannerImage;
};
export default useBanner;
