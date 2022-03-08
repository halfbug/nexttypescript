/* eslint-disable dot-notation */
/* eslint-disable no-param-reassign */
import { useCallback, useContext } from 'react';
import { StoreContext } from 'store/store.context';
import { IProduct } from 'types/store';
// /import { useRouter } from 'next/router';

// export declare type TParams = {
//     [param: string]: any;
// };

export default function useUtilityFunction() {
//   const router = useRouter();

  //   const { pathname, query: params } = router;
  const {
    store,
    dispatch,
  } = useContext(StoreContext);

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
  const multiple5 = useCallback((num: number) => Math.floor(num / 5) * 5, []);
  const isMultiple5 = useCallback((num: number = 4) => {
    if (num % 5 === 0) return true;
    return false;
  }, []);
  // retrieve common element
  const findInArray = (
    mainArr: any[], searchArr: any[], arrayfield: any, searchField: string | number,
  ):any => mainArr?.map((item: any) => {
    // console.log({ item });
    const searched = arrayfield ? item?.[arrayfield] : item;

    const newArr = searchArr?.find(
      (item2: any) => item2?.[searchField] === searched,
    );
    // console.log({ newArr });
    // console.log({ item });

    return newArr;
  });

  const filterArray = (
    mainArr: any[], filterArr: any[], arrayfield: any, filterField: string | number,
  ):any => mainArr?.filter((item: any) => {
    // console.log({ item });
    // const searched = arrayfield ? item?.[arrayfield] : item;

    const newArr = filterArr?.find(
      (item2: any) => item2?.[filterField] === item?.[arrayfield],
    );
    // console.log({ newArr });
    // console.log({ item });

    return !newArr;
  });

  const setValue = (field: string, value: string | number) => {
    dispatch({ type: 'NEW_CAMPAIGN', payload: { newCampaign: { [field]: value } } });
  };

  return {
    cleanTypename, multiple5, isMultiple5, findInArray, setValue, filterArray,
  };
}
