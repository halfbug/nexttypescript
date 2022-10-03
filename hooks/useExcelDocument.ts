import { useLazyQuery } from '@apollo/client';
import {
  useEffect, useState, useContext,
} from 'react';
import { StoreContext } from 'store/store.context';
import { GET_BILLING_BY_DATE } from 'store/store.graphql';
import moment from 'moment';
import useBilling from './useBilling';
import useUtilityFunction from './useUtilityFunction';

const useExcelDocument = () => {
  const [sheetData, setsheetData] = useState(undefined);
  const [getDayBilling, { data, loading }] = useLazyQuery(GET_BILLING_BY_DATE);
  const { storeCurrencySymbol } = useUtilityFunction();
  const { isAppTrialOnGivenDate } = useBilling();
  const { store } = useContext(StoreContext);

  const formatDataForExcel = (sourceData : any) => {
    const sheetresult: any = sourceData.map((bRec: any) => {
      const {
        _id: { month, date, year },
        revenue, totalCashback, totalfeeByCashback,
        feeformGroupshop, storeTotalGS, todaysTotalGS, storePlan, store: recStore,
      } = bRec;
      console.log({ bRec });

      const thisDate = `${month} ${date}, ${year}`;
      const trail = moment(recStore.appTrialEnd);
      const rec = moment.utc(`${year} ${month}, ${date}`);

      const isAppTrialForThisDate = isAppTrialOnGivenDate(trail, rec);
      console.log('🚀 ~ file: useExcelDocument.ts ~ line 27 ~ constsheetresult:any=sourceData.map ~ thisDate', thisDate);
      console.log('🚀 ~ file: useExcelDocument.ts ~ line 26 ~ isAppTrialForThisDate', isAppTrialForThisDate);
      const appTrialtext = isAppTrialForThisDate ? ` >> Free Trial ${storeCurrencySymbol(store?.currencyCode ?? 'USD')}`
        : '';
      console.log('🚀 ~ file: useExcelDocument.ts ~ line 29 ~ constsheetresult:any=sourceData.map ~ isAppTrialForThisDate', isAppTrialForThisDate);

      const GSUsageCharges = feeformGroupshop.map((item: any) => {
        const formattedTotalCharged = +(item.totalCharged).toFixed(2).toString().replace('.00', '');
        return `${item.plan} Total GS ${item.totalGS}) >> ${storeCurrencySymbol(store?.currencyCode ?? 'USD')}${formattedTotalCharged}${appTrialtext}`;
      });
      console.log({ feeformGroupshop });
      const formattedCBFee = +totalfeeByCashback.toFixed(2).toString().replace('.00', '');
      const formattedRevenue = +revenue.toFixed(2).toString().replace('.00', '');
      const formattedTotalCashback = +totalCashback.toFixed(2).toString().replace('.00', '');

      return {
        Day: `${month}-${date}-${year}`,
        Revenue_Generated: `${storeCurrencySymbol(store?.currencyCode ?? 'USD')}${formattedRevenue}`,
        Groupshops_Created: todaysTotalGS,
        Total_CashBack_Given: `${storeCurrencySymbol(store?.currencyCode ?? 'USD')}${formattedTotalCashback}`,
        Store_Plan: feeformGroupshop[feeformGroupshop.length - 1].plan,
        // storeTotalGS,
        Charge_From_CashBack: `${storeCurrencySymbol(store?.currencyCode ?? 'USD')}${formattedCBFee}`,
        Charge_From_GroupShops: GSUsageCharges.join(' | '),
      };
    });
    // setsheetData(sheetresult);
    return sheetresult;
  };
  // useEffect(() => {
  //   if (data) {
  //     // foramt data then assign in sheetdata
  //     console.log({ data });
  //     formatDataForExcel(data.getBillingByDate);

  //     // setsheetData(data);
  //   }
  // }, [data]);
  const monthsArr = (mon: number) => {
    const months = [
      { initial: 'Jan', mon: 'January', endDate: 31 },
      { initial: 'Feb', mon: 'February', endDate: 28 },
      { initial: 'Mar', mon: 'March', endDate: 31 },
      { initial: 'Apr', mon: 'April', endDate: 30 },
      { initial: 'May', mon: 'May', endDate: 31 },
      { initial: 'Jun', mon: 'June', endDate: 30 },
      { initial: 'Jul', mon: 'July', endDate: 31 },
      { initial: 'Aug', mon: 'August', endDate: 31 },
      { initial: 'Sep', mon: 'September', endDate: 30 },
      { initial: 'Oct', mon: 'October', endDate: 31 },
      { initial: 'Nov', mon: 'November', endDate: 30 },
      { initial: 'Dec', mon: 'December', endDate: 31 },
    ];
    return months[mon];
  };
  return {
    sheetData, getDayBilling, loading, data, formatDataForExcel, monthsArr,
  };
};
export default useExcelDocument;
