import { useCallback, useContext } from 'react';
import { GroupshopContext } from 'store/groupshop.context';
import { CartProduct } from 'types/groupshop';

export default function useCart() {
  const {
    gsctx,
    dispatch,
  } = useContext(GroupshopContext);

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

  // const cleanTypename = useCallback((obj: any) => {
  //   try {
  //   } catch (err) {
  //   }
  //   finally{
  //   return obj;
  //   }
  // }, []);

  return {
    addCartProduct, cartProducts, removeProduct, plusQuantity, minusQuantity,
  };
}
