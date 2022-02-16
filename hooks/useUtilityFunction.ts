/* eslint-disable dot-notation */
/* eslint-disable no-param-reassign */
import { useCallback } from 'react';
// /import { useRouter } from 'next/router';

// export declare type TParams = {
//     [param: string]: any;
// };

export default function useUtilityFunction() {
//   const router = useRouter();

  //   const { pathname, query: params } = router;
  const cleanTypename = useCallback((obj: any) => {
    try {
      if (Array.isArray(obj)) {
        obj?.map((inele: any) => {
          const ele = { ...inele };
          // eslint-disable-next-line dot-notation
          console.log("🚀 ~ file: useUtilityFunction.ts ~ line 20 ~ obj.map ~ ele['__typename']", ele['__typename']);
          // eslint-disable-next-line dot-notation
          if ('__typename' in ele) { delete ele['__typename']; }
          return ele;
        });
      } else if ('__typename' in obj) { delete obj['__typename']; }
    } catch (err) {
      console.log(err);
    }
    console.log('🚀 ~ file: useUtilityFunction.ts ~ line 31 ~ cleanTypename ~ obj', obj);
    return obj;
  }, []);
  const multiple5 = useCallback((num: number) => Math.ceil(num / 5) * 5, []);
  const isMultiple5 = useCallback((num: number = 4) => {
    if (num % 5 === 0) return true;
    return false;
  }, []);

  return { cleanTypename, multiple5, isMultiple5 };
}
