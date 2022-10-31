import { useQuery } from '@apollo/client';
import getSymbolFromCurrency from 'currency-symbol-map';
import {
  useCallback, useContext, useState, useEffect,
} from 'react';
import { GroupshopContext } from 'store/groupshop.context';
import { StoreContext } from 'store/store.context';
import {
  GET_MONTHLY_GS, GET_TOTAL_GS, GET_TOTAL_GS_FROM_BILLING, GET_TOTAL_GS_MONTHLY, GET_TOTAL_REVENUE,
} from 'store/store.graphql';
import { MonthlyGSType } from 'types/billing';

export default function useBilling() {
  const { gsctx, dispatch } = useContext(GroupshopContext);
  const { store } = useContext(StoreContext);

  const [totalGS, settotalGS] = useState(0);
  const [totalGSByMonth, settotalGSByMonth] = useState<MonthlyGSType[] | []>([]);
  const [totalRevenue, settotalRevenue] = useState(0);
  const [appTrial, setappTrial] = useState(true);
  const [appTrialDay, setappTrialDay] = useState(true);

  // query to get total # of gs of merchant store
  const {
    loading, data, refetch,
  } = useQuery(GET_TOTAL_GS_FROM_BILLING, {
    variables: { storeId: store.id },
  });
    // query to get total # of revenue
  const {
    data: data2, refetch: refetch2,
  } = useQuery(GET_TOTAL_REVENUE, {
    variables: { storeId: store.id },
  });
    // query to get total # of groupshops per month
  // const {
  //   data: data3, refetch: refetch3,
  // } = useQuery(GET_TOTAL_GS_MONTHLY, {
  //   variables: { storeId: store.id },
  // });
  useEffect(() => {
    if (data2?.findTotalRevenue) { settotalRevenue(data2.findTotalRevenue.revenue); }
  }, [data2]);

  // console.log('🚀 ~ file: useBilling.ts TOTAL # of GS', data);
  // console.log('🚀 ~ file: useBilling.ts TOTAL # of GS by month', data3);
  // console.log('🚀 ~ file: useBilling.ts TOTAL # of REV', data2);
  // console.log('🚀 ~ file: useBilling.ts TOTAL # of totalRevenue', totalRevenue);
  // useEffect(() => {
  //   if (data3?.findTotalGSMonthly.length) { settotalGSByMonth(data3.findTotalGSMonthly); }
  // }, [data3]);

  /// ///////useeffects//////////
  useEffect(() => {
    if (data?.findTotalGS) { settotalGS(data.findTotalGS.count); }
  }, [data]);

  useEffect(() => {
    refetch();
    refetch2();
    // refetch3();
  }, []);
  const currencySymbol = getSymbolFromCurrency(gsctx?.store?.currency || 'USD');

  // const getMonthlyGSCount = (month: number) => {
  //   if (totalGSByMonth.length) {
  //     // eslint-disable-next-line no-underscore-dangle
  //     const GSOfMonth = totalGSByMonth.find((item) => item._id.month === month);
  //     // console.log('🚀 ~ file: useBilling.ts ~ line 67 ~ getMonthlyGSCount ~ GSOfMonth',
  //     // GSOfMonth);
  //     return GSOfMonth?.count;
  //   }
  //   return 0;
  // };
  const getStorePlan = useCallback((storeId) => {
    console.log(store.plan);
    return store.plan;
  }, []);
  const averageNoOfGS = useCallback(() => {
    const { appTrialEnd } = store;
    const trialMonth = appTrialEnd ? new Date(appTrialEnd).getMonth() : 0;
    const currentMonth = (new Date()).getMonth();
    const totalMonth = (currentMonth + 1) - (trialMonth + 1 ?? 0);
    return totalGS / Math.abs(totalMonth);
  }, [store, totalGS]);

  const isAppTrial = () => {
    const { appTrialEnd } = store;
    if (appTrialEnd) {
      const appTrialEndDate = new Date(appTrialEnd);
      const currentDate = new Date();
      const diff = appTrialEndDate.getTime() - currentDate.getTime();
      // if (diff < 0) setappTrial(false);
      if (diff < 0) return false;
    }
    // setappTrial(true);
    return true;
  };
  const isAppTrialOnGivenDate = (appTrialDate: any, recordDate: any) => {
    console.log('🚀 ~ file: useBilling.ts ~ line 104 ~ isAppTrialOnGivenDate ~ recordDate', recordDate);
    console.log('🚀 ~ file: useBilling.ts ~ line 104 ~ isAppTrialOnGivenDate ~ appTrialDate', appTrialDate);
    let flag = false;
    if (appTrialDate) {
      // date = new Date(Date.UTC(year, month, day, hour, minute, second));
      const appTrialEndDate = new Date(appTrialDate);
      console.log('🚀 ~ file: useBilling.ts ~ line 107 ~ isAppTrialOnGivenDate --- appTrialEndDate', appTrialEndDate);
      const recDate = new Date(recordDate);
      console.log('🚀 ~ file: useBilling.ts ~ line 109 ~ isAppTrialOnGivenDate --- recDate', recDate);
      // if (recordDate.getTime() >= appTrialEndDate.getTime()) {
      if (recordDate > appTrialDate) {
        console.log('🚀 ~ file: useBilling.ts ~ line 108 ~ isAppTrialOnGivenDate ~ recDate', recDate);
        flag = false;
      } else flag = true;
    }
    return flag;
  };

  return {
    // getMonthlyGSCount,
    totalGS,
    totalRevenue,
    currencySymbol,
    appTrial,
    isAppTrialOnGivenDate,
    isAppTrial,
    averageNoOfGS,
  };
}
