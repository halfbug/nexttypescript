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
      productName,
      productId,
      productBrand: gsctx?.store?.brandName,
      promotionTag: `milestone ${gsctx?.milestones.length} - ${gsctx?.discountCode?.percentage}`,
      originalPrice,
      finalPrice,
    });

    // console.log('--------<<<<<<<<<<gtm>>>>>>----------');
    // console.log({
    //   event: 'productView',
    //   productName,
    //   productId,
    //   productBrand: gsctx?.store?.brandName,
    //   promotionTag: `milestone ${gsctx?.milestones.length} - ${gsctx?.discountCode?.percentage}`,
    //   originalPrice,
    //   finalPrice,

    // });
  };

  return {
    googleEventCode,
    googleProductCode,

  };
}
