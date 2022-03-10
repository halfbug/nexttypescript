import {
  useCallback, useContext, useState, useEffect,
} from 'react';
import { GroupshopContext } from 'store/groupshop.context';

export default function useBilling() {
  const { gsctx, dispatch } = useContext(GroupshopContext);

  const getMonthlyGS = useCallback((storeId) => {
    console.log({ storeId });
    return 'gsmonth';
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
  };
}
