import {
  useContext,
  useEffect, useState, useCallback,
} from 'react';
import { GroupshopContext } from 'store/groupshop.context';
// import useCart from './useCart';
import useCode from './useCode';
import useLocalStorage from './useLocalStorage';
import useAppContext from './useAppContext';
// import useUtilityFunction from './useUtilityFunction';

const useSaveCart = () => {
  const { gsctx, dispatch } = useAppContext();
  const { discountCode } = useCode();
  //   const { loadPreSelectedCart } = useCart();
  const varName = discountCode ?? 'GS-00234';
  const [loading, setloading] = useState<Boolean>(true);
  const [initialLoading, setInitialLoading] = useState<Boolean>(false);

  const {
    setStorage, existStorage, removeStorage, getStorage,
  } = useLocalStorage(varName);
  const { cart, id } = gsctx;

  useEffect(() => {
    if (cart && initialLoading === true) { setStorage(cart); }
    // console.log('🚀 ~ file: useSaveCart.ts ~ line 29 ~ useEffect ~ cart?.length', cart?.length);
  }, [cart, discountCode, initialLoading]);

  useEffect(() => {
    if (id) {
      if (existStorage() && loading) {
        dispatch({ type: 'UPDATE_CART', payload: { ...gsctx, cart: [...getStorage()] } });
      }
      if (existStorage()
       && cart && cart[0]?.id === getStorage()[0]?.id && loading) { setloading(false); }
      setInitialLoading(true);
    }
  }, [gsctx]);

  const emptyCart = useCallback(() => {
    removeStorage();
    return true;
  }, [varName]);

  return { cart, emptyCart };
};
export default useSaveCart;
