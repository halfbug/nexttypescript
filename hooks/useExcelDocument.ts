import { useLazyQuery } from '@apollo/client';
import {
  useEffect, useState, useContext,
} from 'react';
import { StoreContext } from 'store/store.context';
import { GET_BILLING_BY_DATE } from 'store/store.graphql';
import useUtilityFunction from './useUtilityFunction';

const useExcelDocument = () => {
  const [sheetData, setsheetData] = useState(undefined);
  const [getDayBilling, { data, loading }] = useLazyQuery(GET_BILLING_BY_DATE);
  const { storeCurrencySymbol } = useUtilityFunction();
  const { store } = useContext(StoreContext);

  const formatDataForExcel = (sourceData : any) => {
    const sheetresult: any = sourceData.map((bRec: any) => {
      const {
        _id: { month, date, year },
        revenue, totalCashback, totalfeeByCashback,
        feeformGroupshop, storeTotalGS, todaysTotalGS, storePlan,
      } = bRec;

      const GSUsageCharges = feeformGroupshop.map((item: any) => `(${item.plan} Total GS ${item.totalGS}) >> ${storeCurrencySymbol(store?.currencyCode ?? 'USD')}${item.totalCharged}`);
      console.log({ GSUsageCharges });

      return {
        Day: `${month}-${date}-${year}`,
        Revenue_Generated: `${storeCurrencySymbol(store?.currencyCode ?? 'USD')}${revenue}`,
        Groupshops_Created: todaysTotalGS,
        Total_CashBack_Given: `${storeCurrencySymbol(store?.currencyCode ?? 'USD')}${totalCashback}`,
        Store_Plan: storePlan,
        // storeTotalGS,
        Charge_From_CashBack: `${storeCurrencySymbol(store?.currencyCode ?? 'USD')}${totalfeeByCashback}`,
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

  return {
    sheetData, getDayBilling, loading, data, formatDataForExcel,
  };
};
export default useExcelDocument;
