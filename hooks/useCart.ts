import { useCallback, useContext } from 'react';
import { GroupshopContext } from 'store/groupshop.context';
import { CartProduct } from 'types/groupshop';
import useDeal from './useDeal';

export default function useCart() {
  const {
    gsctx,
    dispatch,
  } = useContext(GroupshopContext);

  const { dPrice } = useDeal();

  const addCartProduct = useCallback((product : CartProduct) => dispatch({ type: 'UPDATE_CART', payload: { ...gsctx, cart: [...gsctx.cart ?? [], product] } }), [gsctx.cart]);

  const cartProducts = gsctx?.cart || [];

  const removeProduct = useCallback((pid : string) => {
    dispatch({ type: 'UPDATE_CART', payload: { ...gsctx, cart: [...gsctx.cart?.filter(({ id }) => id !== pid) || []] } });
  }, [gsctx.cart]);

  const plusQuantity = useCallback((pid: string) => dispatch({
    type: 'UPDATE_CART',
    payload: {
      ...gsctx,
      cart: gsctx?.cart?.map((cp) => {
        const ncp = { ...cp };
        if (cp.id === pid) { ncp.selectedQuantity += 1; }

        return ncp;
      }),
    },
  }), [gsctx.cart]);

  const minusQuantity = useCallback((pid: string) => dispatch({
    type: 'UPDATE_CART',
    payload: {
      ...gsctx,
      cart: gsctx?.cart?.map((cp) => {
        const ncp = { ...cp };
        if (cp.id === pid) { ncp.selectedQuantity -= 1; }

        return ncp;
      }),
    },
  }), [gsctx.cart]);

  const getTotal = useCallback(() => gsctx.cart?.reduce(
    (total: number, { price, selectedQuantity }) => total + (dPrice(+price) * selectedQuantity),
    0,
  ), [gsctx.cart]);

  const isCartEmpty = gsctx?.cart?.length === 0;

  const getShopifyUrl = useCallback(() => {
    const cartDetail = cartProducts.map(({ selectedVariant: { id }, selectedQuantity }) => `${id.split('/')[4]}:${selectedQuantity}`).join(',');
    // `id=${id.split('/')[4]}&quantity=${selectedQuantity}`).join('&');
    console.log(`https://${gsctx?.store?.shop}/cart/${cartDetail}?discount=${gsctx.discountCode.title}`);
    return `https://${gsctx?.store?.shop}/cart/${cartDetail}?discount=${gsctx.discountCode.title}`;
  }, [gsctx.cart]);

  return {
    addCartProduct,
    cartProducts,
    removeProduct,
    plusQuantity,
    minusQuantity,
    getTotal,
    isCartEmpty,
    getShopifyUrl,
  };
}
