import {
  useContext,
  useEffect, useState, useCallback,
} from 'react';
import { GroupshopContext } from 'store/groupshop.context';
// import useCart from './useCart';
import useCode from './useCode';
import useLocalStorage from './useLocalStorage';
// import useUtilityFunction from './useUtilityFunction';

const useSaveCart = () => {
  const {
    gsctx,
    dispatch,
  } = useContext(GroupshopContext);
  const { discountCode } = useCode();
  //   const { loadPreSelectedCart } = useCart();
  const varName = discountCode ?? 'GS-00234';
  const [loading, setloading] = useState<Boolean>(true);

  const {
    setStorage, existStorage, removeStorage, getStorage,
  } = useLocalStorage(varName);
  const { cart, id } = gsctx;

  useEffect(() => {
    if (cart && cart?.length >= 0) { setStorage(cart); }
  }, [cart, discountCode]);

  useEffect(() => {
    if (id) {
      if (existStorage() && loading) {
        dispatch({ type: 'UPDATE_CART', payload: { ...gsctx, cart: [...getStorage()] } });
      }
      if (existStorage()
       && cart && cart[0]?.id === getStorage()[0]?.id && loading) { setloading(false); }
    }
  }, [gsctx]);

  const emptyCart = useCallback(() => {
    removeStorage();
    return true;
  }, [varName]);

  return { cart, emptyCart };
};
export default useSaveCart;
