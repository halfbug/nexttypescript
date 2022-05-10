import { useCallback, useContext, useState } from 'react';
import { GroupshopContext } from 'store/groupshop.context';
import { CartProduct, DealProduct } from 'types/groupshop';
import getSymbolFromCurrency from 'currency-symbol-map';
import { IProduct } from 'types/store';
import useIP from './useIP';

export default function useGtm() {
  const {
    gsctx,
  } = useContext(GroupshopContext);

  const flushtDataLayer = {
    event: undefined,
    modalName: undefined,
    productName: undefined,
    productId: undefined,
    productBrand: undefined,
    promotionTag: undefined,
    originalPrice: undefined,
    finalPrice: undefined,
    buttonName: undefined,
    currency: undefined,
    totalCartValue: undefined,
    items: undefined,
  };

  const googleEventCode = (modalName: string) => {
    // @ts-ignore
    window.dataLayer = window.dataLayer || [];

    // @ts-ignore
    // eslint-disable-next-line no-undef
    dataLayer.push({
      ...flushtDataLayer,
      event: 'modalChange',
      modalName,
    });
    // console.log('--------<<<<<<<<<<gtm>>>>>>----------');
    // console.log({
    //   event: 'modalChange',
    //   modalName,
    // });
  };

  const googleProductCode = (productInfo:{productName: string,
    productId : string,
    originalPrice: number,
    finalPrice: number}) => {
    // @ts-ignore
    window.dataLayer = window.dataLayer || [];

    const {
      productId, productName, originalPrice, finalPrice,
    } = productInfo;
    // @ts-ignore
    // eslint-disable-next-line no-undef
    dataLayer.push({
      ...flushtDataLayer,
      event: 'productView',
      items: [
        {
          productId,
          productName,
          promotionTag: `milestone ${gsctx?.milestones.length} - ${gsctx?.discountCode?.percentage}`,
          productBrand: gsctx?.store?.brandName,
          originalPrice,
          finalPrice,
          quantity: 1,
        }],
    });

    console.log('--------<<<<<<<<<<gtm>>>>>>----------');
    console.log({
      event: 'productView',
      items: [
        {
          productId,
          productName,
          promotionTag: `milestone ${gsctx?.milestones.length} - ${gsctx?.discountCode?.percentage}`,
          productBrand: gsctx?.store?.brandName,
          originalPrice,
          finalPrice,
          quantity: 1,
        }],

    });
  };

  const googleButtonCode = (buttonName: string) => {
    // @ts-ignore
    window.dataLayer = window.dataLayer || [];

    // @ts-ignore
    // eslint-disable-next-line no-undef
    dataLayer.push({
      ...flushtDataLayer,
      event: 'buttonClick',
      buttonName,
    });
    console.log({
      event: 'buttonClick',
      buttonName,
    });
  };
  // productId: product.id.split('/')[4],
  const checkoutCartView = (items : any, totalCartValue: number) => {
    // @ts-ignore
    window.dataLayer = window.dataLayer || [];

    // @ts-ignore
    // eslint-disable-next-line no-undef
    dataLayer.push({
      ...flushtDataLayer,
      event: 'checkoutCartView',
      currency: gsctx?.store?.currencyCode,
      totalCartValue,
      items,
    });
    console.log({
      event: 'checkoutCartView',
      currency: gsctx?.store?.currencyCode,
      totalCartValue,
      items,
    });
  };

  const checkoutButtonClick = (items : any, totalCartValue: number) => {
    // @ts-ignore
    window.dataLayer = window.dataLayer || [];

    // @ts-ignore
    // eslint-disable-next-line no-undef
    dataLayer.push({
      ...flushtDataLayer,
      event: 'checkoutButtonClick',
      currency: gsctx?.store?.currencyCode,
      totalCartValue,
      items,
    });
    console.log({
      event: 'checkoutCartView',
      currency: gsctx?.store?.currencyCode,
      totalCartValue,
      items,
    });
  };

  const checkoutUpsellClick = (items : any, totalCartValue: number) => {
    // @ts-ignore
    window.dataLayer = window.dataLayer || [];

    // @ts-ignore
    // eslint-disable-next-line no-undef
    dataLayer.push({
      ...flushtDataLayer,
      event: 'checkoutUpsellClick',
      currency: gsctx?.store?.currencyCode,
      totalCartValue,
      items,
    });
    console.log({
      event: 'checkoutUpsellClick',
      currency: gsctx?.store?.currencyCode,
      totalCartValue,
      items,
    });
  };
  return {
    googleEventCode,
    googleProductCode,
    googleButtonCode,
    checkoutCartView,
    checkoutButtonClick,
    checkoutUpsellClick,
  };
}
