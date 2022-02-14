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

  const dPrice = useCallback((price: number) => Math.round(
    price - ((+discount / 100) * price),
  ), [gsctx]);

  const gsURL = typeof window !== 'undefined' ? `${window?.location?.origin}${gsctx?.url}` : '';
  //   `https://appfornt.groupshop.co${gsctx?.url}`;

  const getBuyers = useCallback((pid:string) => gsctx.members.filter(
    (mem) => mem.products?.find((prd) => prd.id === pid),
  ), [gsctx.members]);

  return {
    currencySymbol, discount, dPrice, gsURL, clientDealProducts, getBuyers,
  };
}
