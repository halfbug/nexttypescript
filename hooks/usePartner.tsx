import { useCallback, useContext, useState } from 'react';
import { DealProduct } from 'types/groupshop';
import getSymbolFromCurrency from 'currency-symbol-map';
import { PartnerGroupshopContext } from 'store/partner-groupshop.context';
import { IProduct } from 'types/store';
import useIP from './useIP';

export default function usePartner() {
  const {
    gsctx,
    dispatch,
  } = useContext(PartnerGroupshopContext);

  const [clientIP] = useIP();
  const [displayAddedBy, setdisplayAddedBy] = useState<boolean>(true);

  const clientDealProducts = useCallback(
    ():string[] | undefined => ([...gsctx?.dealProducts?.filter(
      ({ customerIP } :{customerIP: string}) => customerIP === clientIP,
    )?.map(
      ({ productId }:DealProduct) => productId,
    ) ?? []]), [clientIP, gsctx.dealProducts],
  );

  const currencySymbol = getSymbolFromCurrency(gsctx?.store?.currencyCode || 'USD');

  const discount = gsctx?.discountCode?.percentage;

  const dPrice = useCallback((price: number) => price - ((+discount / 100) * price), [gsctx]);

  const gsURL = typeof window !== 'undefined' ? `${window?.location?.origin}${gsctx?.url}` : '';
  const gsShortURL = gsctx?.shortUrl ?? '';
  //   `https://appfornt.groupshop.co${gsctx?.url}`;

  const productShareUrl = useCallback((pid:string) => {
    // console.log('🚀 ~ file: useDeal.ts ~ line 36 ~ productShareUrl ~ pid', pid);
    const pidbreak = pid.split('/');
    // console.log('🚀 ~ file: useDeal.ts ~ line 38 ~ productShareUrl ~ pidbreak', pidbreak);
    return `${gsURL}/product&${pidbreak[4]}`;
  }, [gsctx.url]);

  const getBuyers = useCallback((pid:string) => gsctx.members.filter(
    (mem) => mem.products?.find((prd) => prd.id === pid),
  ), [gsctx.members]);

  const formatName = useCallback((customer : any) => `${customer.firstName} ${customer.lastName.charAt(0)}`,
    [gsctx.members]);

  const topFive = useCallback(
    (entity : any) => Array.isArray(entity) && entity.slice(0, entity.length),
    [gsctx.members],
  );

  // const getDateDifference = useCallback(() => {
  //   const { expiredAt } = gsctx;
  //   const expiryDate = new Date(expiredAt);
  //   const currentDate = new Date();
  //   const diff = expiryDate.getTime() - currentDate.getTime();
  //   if (diff < 0) {
  //     return ({
  //       time: diff,
  //       days: 0,
  //       hrs: 0,
  //       mins: 0,
  //       secs: 0,
  //     });
  //   }
  //   return ({
  //     time: diff,
  //     days: Math.floor(diff / 86400000), // days
  //     hrs: Math.floor((diff % 86400000) / 3600000), // hours
  //     mins: Math.round(((diff % 86400000) % 3600000) / 60000), // minutes
  //     secs: Math.round((((diff % 86400000) % 3600000) / 60000) / 60000), // seconds
  //   });
  // },
  // [gsctx.members]);

  // const isExpired = !(getDateDifference().time > -1);
  const isExpired = false;

  const totalCashBack = useCallback((price) => {
    const {
      members, discountCode: { percentage },
      campaign,
    } = gsctx;
    const rew = { ...campaign?.salesTarget?.rewards };
    // eslint-disable-next-line radix
    const maxdiscount: number = parseInt(rew[2].discount || '0');

    let cashback: number = 0;
    if (members.length < 5) {
      cashback = ((maxdiscount - +(percentage)) / 100) * +(price);
      cashback = +(cashback);
      cashback = Math.floor(cashback);
    }
    return cashback;
  },
  [gsctx]);

  const addedByName = useCallback((productId) => {
    const { dealProducts } = gsctx;
    const filtered = dealProducts?.find((item) => item.productId === productId);

    return filtered?.addedBy;
  },
  [gsctx]);

  const displayAddedByFunc = useCallback((productId) => {
    const { members } = gsctx;
    const ownerProd = members[0]?.products;
    const prod1 = ownerProd?.find((item) => item.id === productId);
    let flagVar;
    // console.log({ prod1 });

    if (prod1) flagVar = false;
    if (!prod1) flagVar = true;
    return flagVar;

    // if (prod1) setdisplayAddedBy(false);
    // if (!prod1) setdisplayAddedBy(true);
  },
  [gsctx]);

  const productPriceDiscount = ((price: number, percent: number) => {
    const discountedPrice = price * (percent / 100);
    return discountedPrice.toFixed(2);
  });

  const socialLinks = gsctx?.campaign?.socialLinks;

  const getDiscounts = useCallback(() => {
    const allDiscountArr = gsctx.campaign?.salesTarget?.rewards?.map((rew) => rew.discount);
    return allDiscountArr;
  }, [gsctx]);

  // const activateURL = `${gsURL}?activated=${Math.floor((Math.random() * 6) + 1).toFixed(2)}-GS`;
  const activateURL = `${gsURL}/status&activated`;
  return {
    currencySymbol,
    discount,
    dPrice,
    gsURL,
    gsShortURL,
    clientDealProducts,
    getBuyers,
    formatName,
    topFive,
    isExpired,
    productShareUrl,
    addedByName,
    totalCashBack,
    displayAddedBy,
    displayAddedByFunc,
    productPriceDiscount,
    socialLinks,
    getDiscounts,
    activateURL,
  };
}
