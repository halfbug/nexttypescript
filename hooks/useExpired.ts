import {
  useEffect, useState,
} from 'react';
import useDeal from './useDeal';

const useExpired = () => {
  const [loaderInvite, setloaderInvite] = useState(false);
  const [urlForActivation, seturlForActivation] = useState<string | undefined>('');
  const { activateURL } = useDeal();

  const inviteForExpiredGS = () => {
    setloaderInvite(true);
    setTimeout(() => {
      setloaderInvite(false);
      seturlForActivation(activateURL);
    }, 1000);
  };

  useEffect(() => {
    inviteForExpiredGS();
  }, [activateURL]);

  return {
    loaderInvite, urlForActivation,
  };
};
export default useExpired;
