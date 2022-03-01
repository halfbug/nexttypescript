import { useCallback, useContext } from 'react';
import { GroupshopContext } from 'store/groupshop.context';
import { CartProduct, DealProduct } from 'types/groupshop';
import getSymbolFromCurrency from 'currency-symbol-map';
import { IProduct } from 'types/store';
import useIP from './useIP';

export default function useDeal() {
  const {
    gsctx,
    dispatch,
  } = useContext(GroupshopContext);

  const [clientIP] = useIP();

  const clientDealProducts = useCallback(
    ():string[] | undefined => ([...gsctx?.dealProducts?.filter(
      ({ customerIP } :{customerIP: string}) => customerIP === clientIP,
    )?.map(
      ({ productId }:DealProduct) => productId,
    ) ?? []]), [clientIP, gsctx.dealProducts],
  );

  const currencySymbol = getSymbolFromCurrency(gsctx?.store?.currency || 'USD');

  const discount = gsctx?.discountCode?.percentage;

  const dPrice = useCallback((price: number) => price - ((+discount / 100) * price), [gsctx]);

  const gsURL = typeof window !== 'undefined' ? `${window?.location?.origin}${gsctx?.url}` : '';
  //   `https://appfornt.groupshop.co${gsctx?.url}`;

  const getBuyers = useCallback((pid:string) => gsctx.members.filter(
    (mem) => mem.products?.find((prd) => prd.id === pid),
  ), [gsctx.members]);

  const formatName = useCallback((customer : any) => `${customer.firstName} ${customer.lastName.charAt(0)}`,
    [gsctx.members]);

  const topFive = useCallback(
    (entity : any) => Array.isArray(entity) && entity.slice(0, entity.length),
    [gsctx.members],
  );

  const getDateDifference = useCallback(() => {
    const { expiredAt } = gsctx;
    const expiryDate = new Date(expiredAt);
    const currentDate = new Date();
    const diff = expiryDate.getTime() - currentDate.getTime();
    if (diff < 0) {
      return ({
        time: diff,
        days: 0,
        hrs: 0,
        mins: 0,
      });
    }
    return ({
      time: diff,
      days: Math.floor(diff / 86400000), // days
      hrs: Math.floor((diff % 86400000) / 3600000), // hours
      mins: Math.round(((diff % 86400000) % 3600000) / 60000), // minutes
    });
  },
  [gsctx.members]);

  const isExpired = !(getDateDifference().time > -1);

  return {
    currencySymbol,
    discount,
    dPrice,
    gsURL,
    clientDealProducts,
    getBuyers,
    formatName,
    topFive,
    getDateDifference,
    isExpired,
  };
}
