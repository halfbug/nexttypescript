import {
  useContext,
  useEffect, useState, useCallback,
} from 'react';
import useAppContext from './useAppContext';
import useUtilityFunction from './useUtilityFunction';

const useLogo = () => {
  const {
    gsctx,
  } = useAppContext();
  const {
    getKeyFromS3URL, getSignedUrlS3,
  } = useUtilityFunction();
  const { store } = gsctx;
  const [storeLogo, setStoreLogo] = useState<string>('');
  // const s3path = store?.logoImage;

  const gets3logo = useCallback(async (logoImage: string) => {
    const key = getKeyFromS3URL(logoImage);
    // const logoS3 = await getSignedUrlS3(key);
    // setBannerImage(`${process.env.IMAGE_PATH}/${key ?? 'bg.jpg'}`);
    if (storeLogo === '' && logoImage) setStoreLogo(`${process.env.IMAGE_PATH}/${key}`);
  }, [store]);

  useEffect(() => {
    gets3logo(store?.logoImage ?? '');
  }, [store]);

  return storeLogo;
};
export default useLogo;
