import {
  useContext,
  useEffect, useState, useCallback,
} from 'react';
import { GroupshopContext } from 'store/groupshop.context';
import useUtilityFunction from './useUtilityFunction';

const useLogo = () => {
  const {
    gsctx,
  } = useContext(GroupshopContext);
  const {
    getKeyFromS3URL, getSignedUrlS3,
  } = useUtilityFunction();
  const { store } = gsctx;
  const [storeLogo, setStoreLogo] = useState<string>('');
  const s3path = store?.logoImage;

  const gets3logo = useCallback(async (logoImage: string) => {
    const key = getKeyFromS3URL(logoImage);
    const logoS3 = await getSignedUrlS3(key);

    if (logoS3) setStoreLogo(logoS3);
  }, [store, s3path]);

  useEffect(() => {
    gets3logo(s3path ?? '');
  }, [store]);

  return storeLogo;
};
export default useLogo;
