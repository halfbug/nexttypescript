import { useQuery } from '@apollo/client';
import getSymbolFromCurrency from 'currency-symbol-map';
import {
  useCallback, useContext, useState, useEffect,
} from 'react';
import { GroupshopContext } from 'store/groupshop.context';
import { StoreContext } from 'store/store.context';
import {
  GET_ACTIVE_PARTNER_COUNT,
  GET_MONTHLY_GS, GET_MONTH_COUNT, GET_TOTAL_GS,
  GET_TOTAL_GS_FROM_BILLING, GET_TOTAL_GS_MONTHLY, GET_TOTAL_PARTNER_REVENUE, GET_TOTAL_REVENUE,
} from 'store/store.graphql';
import { MonthlyGSType } from 'types/billing';

export default function useBilling() {
  const { gsctx, dispatch } = useContext(GroupshopContext);
  const { store } = useContext(StoreContext);

  const [totalGS, settotalGS] = useState(0);
  const [totalGSByMonth, settotalGSByMonth] = useState<MonthlyGSType[] | []>([]);
  const [totalRevenue, settotalRevenue] = useState(0);
  const [totalPartnerRevenue, settotalPartnerRevenue] = useState(0);
  const [totalActivePartner, settotalActivePartner] = useState(0);
  const [partnerTier, setpartnerTier] = useState(0);
  const [partnerTierFee, setpartnerTierFee] = useState(0);
  const [partnerTierLimit, setpartnerTierLimit] = useState('');
  const [totalMonths, settotalMonths] = useState<undefined | number>(undefined);
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
  const {
    data: data3, refetch: refetch3,
  } = useQuery(GET_MONTH_COUNT, {
    variables: { storeId: store.id },
  });
  const {
    data: data4, refetch: refetch4,
  } = useQuery(GET_TOTAL_PARTNER_REVENUE, {
    variables: { storeId: store.id },
  });
  const {
    data: data5, refetch: refetch5,
  } = useQuery(GET_ACTIVE_PARTNER_COUNT, {
    variables: { storeId: store.id },
  });

  useEffect(() => {
    if (data5?.getActivePartnersCount) {
      settotalActivePartner(data5?.getActivePartnersCount.count);
      setpartnerTier(data5?.getActivePartnersCount.tierName);
      setpartnerTierFee(data5?.getActivePartnersCount.tierCharges);
      setpartnerTierLimit(data5?.getActivePartnersCount.tierLimit);
    }
  }, [data5]);
  useEffect(() => {
    if (data4?.getPartnerRevenue) {
      settotalPartnerRevenue(data4?.getPartnerRevenue.revenue);
    }
  }, [data4]);
  useEffect(() => {
    if (data3?.getStoreMonthsCount) {
      settotalMonths(data3?.getStoreMonthsCount.count);
    }
  }, [data3]);
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
    console.log('🚀 ~ file: useBilling ~ averageNoOfGS ~ totalMonths', totalMonths);
    if (totalMonths) return totalGS <= 0 ? 0 : Math.floor(totalGS / totalMonths);
    return '';
  }, [totalGS, totalMonths]);

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
    totalPartnerRevenue,
    totalActivePartner,
    partnerTier,
    partnerTierFee,
    partnerTierLimit,
  };
}
