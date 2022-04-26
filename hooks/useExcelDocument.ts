import { useLazyQuery } from '@apollo/client';
import {
  useEffect, useState,
} from 'react';
import { GET_BILLING_BY_DATE } from 'store/store.graphql';

const useExcelDocument = () => {
  const [sheetData, setsheetData] = useState(undefined);
  const [getDayBilling, { data, loading }] = useLazyQuery(GET_BILLING_BY_DATE);
  console.log({ data });

  const formatDataForExcel = (sourceData : any) => {
    console.log(sourceData);
    const sheetresult: any = sourceData.map((bRec: any) => {
      const {
        _id: { month, date, year },
        revenue, totalCashback, totalfeeByCashback,
        feeformGroupshop, storeTotalGS, todaysTotalGS, storePlan,
      } = bRec;

      const GSUsageCharges = feeformGroupshop.map((item: any) => {
        console.log({ item });
        return `(${item.plan} Total GS ${item.totalGS}) >> $${item.totalCharged}`;
      });
      console.log({ GSUsageCharges });

      return {
        Day: `${month}-${date}-${year}`,
        Revenue_Generated: revenue,
        Groupshops_Created: todaysTotalGS,
        Total_CashBack_Given: totalCashback,
        Store_Plan: storePlan,
        // storeTotalGS,
        Charge_From_CashBack: totalfeeByCashback,
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

  console.log({ sheetData });

  return {
    sheetData, getDayBilling, loading, data, formatDataForExcel,
  };
};
export default useExcelDocument;
