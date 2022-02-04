import { useCallback, useContext } from 'react';
import { GroupshopContext } from 'store/groupshop.context';
import { CartProduct } from 'types/groupshop';
import getSymbolFromCurrency from 'currency-symbol-map';
import { IProduct } from 'types/store';

export default function useDeal() {
  const {
    gsctx,
    dispatch,
  } = useContext(GroupshopContext);

  //   const addCartProduct = useCallback(
  //   (product : CartProduct) => dispatch(
  //   { type: 'UPDATE_CART',
  //    payload: { ...gsctx, cart: [...gsctx.cart ?? [], product] } }), [gsctx.cart]);

  const currencySymbol = getSymbolFromCurrency(gsctx?.store?.currency || 'USD');

  const discount = gsctx?.discountCode?.percentage;

  const dPrice = useCallback((price: number) => Math.round(
    price - ((+discount / 100) * price),
  ), [gsctx]);

  //   const getURL = useCallback(() => `${window.location.origin}/${gsctx?.url}`,
  //     [gsctx.url.length]);
    
  const gsURL = typeof window !== 'undefined' ? `${window?.location?.origin}${gsctx?.url}` : '';
  //   `https://appfornt.groupshop.co${gsctx?.url}`;

  return {
    currencySymbol, discount, dPrice, gsURL,
  };
}
