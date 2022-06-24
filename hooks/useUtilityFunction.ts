/* eslint-disable dot-notation */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import getSymbolFromCurrency from 'currency-symbol-map';
import { useCallback, useContext } from 'react';

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

  // eslint-disable-next-line max-len
  const findIndexInArray = useCallback((arr, searchField, searchValue) => arr.findIndex((item: any) => item[searchField] === searchValue), []);

  const convertNumToMonth = (num:number) => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[num];
  };

  const getKeyFromS3URL = useCallback((key) => {
    // console.log('🚀 ~ file: useUtilityFunction.ts ~ line 88 ~ getKeyFromS3URL ~ key', key);
    // this function extract the file name froms store logo store in db
    const newKey = key.split('/');
    // console.log('🚀 ~ file: useUtilityFunction.ts ~ line 90 ~ getKeyFromS3URL ~ newKey', newKey);
    return newKey[4];
  }, []);
  const getSignedUrlS3 = async (url: string) => {
    if (url === '' || url === undefined) return '';
    const { data: { data: dbUrl } } = await axios.get(`${process.env.API_URL}/image?key=${url}`);
    return dbUrl;
  };
  const formatNumber = ((num: number | string) => {
    const newNum = (+num).toFixed(2).toString().replace('.00', '');
    return newNum;
  });
  const storeCurrencySymbol = (currCode: string) => getSymbolFromCurrency(currCode || 'USD');

  return {
    cleanTypename,
    multiple5,
    isMultiple5,
    findInArray,
    filterArray,
    findIndexInArray,
    convertNumToMonth,
    getKeyFromS3URL,
    getSignedUrlS3,
    formatNumber,
    storeCurrencySymbol,
  };
}
