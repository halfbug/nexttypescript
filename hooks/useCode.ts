import {
  useEffect, useState,
} from 'react';
import { useRouter } from 'next/router';

const useCode = () => {
  // get client IP
  const router = useRouter();

  const { query: { shop, code } } = router;
  console.log('🚀 ~ file: useCode.ts ~ line 11 ~ useCode ~ router', router);
  const [productCode, setproductCode] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [qrscan, setQrscan] = useState<string | undefined>(undefined);
  const [discountCode, setdiscountCode] = useState<string | undefined>(undefined);
  const [ownerCode, setOwnerCode] = useState<string | undefined>(undefined);
  const [stepNumber, setStepNumber] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (Array.isArray(code) && code.length) {
      code.map((itm: string, idx: number) => {
        switch (idx) {
          case 0:
            setdiscountCode(code[idx]);
            break;

          default:
            if (itm.indexOf('&') > 0) {
              const entity = itm.split('&');
              switch (entity[0]) {
                case 'product':
                  setproductCode(entity[1]);
                  // setStatus('');

                  break;
                case 'status':
                  setStatus(entity[1]);
                  break;

                case 'qrscan':
                  setQrscan(entity[1]);
                  break;

                case 'owner':
                  setOwnerCode(entity[1]);
                  break;

                case 'step':
                  setStepNumber(entity[1]);
                  break;

                default:
                  break;
              }
            }

            break;
        }
        return itm;
      });
    }
  }, [code]);

  return {
    shop, discountCode, productCode, status, qrscan, ownerCode, stepNumber,
  };
};
export default useCode;
