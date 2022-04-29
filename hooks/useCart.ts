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

  const addCartProduct = useCallback((product : CartProduct) => {
    const alreadyCartProduct = gsctx.cart?.find(
      (prd) => prd.selectedVariant.id === product.selectedVariant.id,
    );
    if (alreadyCartProduct) plusQuantity(alreadyCartProduct.selectedVariant.id);
    else {
      dispatch({ type: 'UPDATE_CART', payload: { ...gsctx, cart: [...gsctx.cart ?? [], product] } });
    }
  }, [gsctx.cart]);

  const cartProducts = gsctx?.cart || [];

  const removeProduct = useCallback((pid : string) => {
    dispatch({ type: 'UPDATE_CART', payload: { ...gsctx, cart: [...gsctx.cart?.filter((prd) => prd.selectedVariant.id !== pid) || []] } });
  }, [gsctx.cart]);

  const plusQuantity = useCallback((pid: string) => dispatch({
    type: 'UPDATE_CART',
    payload: {
      ...gsctx,
      cart: gsctx?.cart?.map((cp) => {
        const ncp = { ...cp };
        if (ncp.selectedVariant.id === pid) { ncp.selectedVariant.selectedQuantity += 1; }

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
        if (cp.selectedVariant.id === pid) { ncp.selectedVariant.selectedQuantity -= 1; }

        return ncp;
      }),
    },
  }), [gsctx.cart]);

  const getTotal = useCallback(() => gsctx.cart?.reduce(
    (total: number,
      {
        price: mprice,
        selectedVariant: { selectedQuantity, price },
      }) => {
      const myTot = total + (dPrice(+(price ?? mprice)) * selectedQuantity);
      return +myTot;
    },
    0,
  ), [gsctx.cart]);

  const isCartEmpty = gsctx?.cart?.length === 0;

  const getShopifyUrl = useCallback(() => {
    const cartDetail = cartProducts.map(({ selectedVariant: { id, selectedQuantity } }) => `${id.split('/')[4]}:${selectedQuantity}`).join(',');
    // `id=${id.split('/')[4]}&quantity=${selectedQuantity}`).join('&');
    console.log(`https://${gsctx?.store?.shop}/cart/${cartDetail}?discount=${gsctx.discountCode.title}`);
    return `https://${gsctx?.store?.shop}/cart/${cartDetail}?discount=${gsctx.discountCode.title}`;
  }, [gsctx.cart]);

  const getSuggestedProducts = useCallback(() => {
    const { allProducts } = gsctx;
    // console.log({ allProducts });

    return allProducts;
  }, [gsctx]);
  // ......... this func calculates all products actual price and show thier sum
  const getTotalActualCartTotal = useCallback(() => {
    let totalPrice: any = 0;
    const { cart } = gsctx;
    if (cart?.length) {
      totalPrice = cart?.reduce(
        (tot, prd) => (
          tot + (+(prd.selectedVariant.price) * prd.selectedVariant.selectedQuantity)
        ), 0,
      );
    }
    console.log({ totalPrice });

    return +totalPrice;
  }, [gsctx.cart]);
  const getCartSaveMoney = useCallback((discount) => {
    const totalPrice1 = getTotalActualCartTotal()
    - (getTotal() ?? 0);
    const saved = totalPrice1;
    return +totalPrice1;
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
    getSuggestedProducts,
    getTotalActualCartTotal,
    getCartSaveMoney,
  };
}
