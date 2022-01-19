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

  return { cleanTypename };
}
