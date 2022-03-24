import { useQuery } from '@apollo/client';
import getSymbolFromCurrency from 'currency-symbol-map';
import {
  useCallback, useContext, useState, useEffect,
} from 'react';
import { GroupshopContext } from 'store/groupshop.context';
import { StoreContext } from 'store/store.context';
import { GET_MONTHLY_GS, GET_TOTAL_GS, GET_TOTAL_REVENUE } from 'store/store.graphql';

export default function useBilling() {
  const { gsctx, dispatch } = useContext(GroupshopContext);
  const { store } = useContext(StoreContext);

  const [totalGS, settotalGS] = useState(0);
  const [totalRevenue, settotalRevenue] = useState(0);

  // query to get total # of gs of merchant store
  const {
    loading, data, refetch,
  } = useQuery(GET_TOTAL_GS, {
    variables: { storeId: store.id },
  });
    // query to get total # of revenue
  const {
    data: data2, refetch: refetch2,
  } = useQuery(GET_TOTAL_REVENUE, {
    variables: { storeId: store.id },
  });
  useEffect(() => {
    if (data2?.findTotalRevenue) { settotalRevenue(data2.findTotalRevenue.revenue); }
  }, [data2]);

  console.log('🚀 ~ file: useBilling.ts TOTAL # of GS', data);
  console.log('🚀 ~ file: useBilling.ts TOTAL # of REV', data2);
  console.log('🚀 ~ file: useBilling.ts TOTAL # of totalRevenue', totalRevenue);

  /// ///////useeffects//////////
  useEffect(() => {
    if (data?.totalGroupshops.length) { settotalGS(data.totalGroupshops.length); }
  }, [data]);
  // useEffect(() => {
  //   if (data2.getMonthlyGSBilling.length) { setmonthlyGS(data2.getMonthlyGSBilling); }
  // }, [data2]);
  useEffect(() => {
    refetch();
    refetch2();
  }, []);
  // useEffect(() => {
  //   // refetch();
  //   refetch2();
  // }, []);
  const currencySymbol = getSymbolFromCurrency(gsctx?.store?.currency || 'USD');

  const getMonthlyGS = useCallback((storeId) => {
    console.log({ storeId });
    return 'gsmonth';
  }, []);
  const getStorePlan = useCallback((storeId) => {
    console.log(store.plan);
    return store.plan;
  }, []);
  const getMonthlyEstimateCost = useCallback((orderno) => {
    console.log({ orderno });
    return 'orderno';
  }, []);
  const getCashBack = useCallback((gsid) => {
    console.log({ gsid });
    return 'gsid';
  }, []);
  const getRevenue = useCallback((gsid) => {
    console.log({ gsid });
    return 'gsid';
  }, []);
  const getPayment = useCallback((gsid) => {
    console.log({ gsid });
    return 'gsid';
  }, []);

  return {
    getMonthlyGS,
    getCashBack,
    getMonthlyEstimateCost,
    getRevenue,
    getPayment,
    totalGS,
    totalRevenue,
    currencySymbol,
  };
}
