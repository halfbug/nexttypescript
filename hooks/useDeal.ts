import { useCallback, useContext, useState } from 'react';
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
  const [displayAddedBy, setdisplayAddedBy] = useState<boolean>(true);
  // const [allDiscount, setallDiscount] = useState<(string | undefined)[]>([]);

  const clientDealProducts = useCallback(
    ():string[] | undefined => ([...gsctx?.dealProducts?.filter(
      ({ customerIP } :{customerIP: string}) => customerIP === clientIP,
    )?.map(
      ({ productId }:DealProduct) => productId,
    ) ?? []]), [clientIP, gsctx.dealProducts],
  );

  const currencySymbol = getSymbolFromCurrency(gsctx?.store?.currency || 'USD');

  const discount = gsctx?.discountCode?.percentage;

  const dPrice = useCallback((price: number) => price - ((+discount / 100) * price), [gsctx]);

  const gsURL = typeof window !== 'undefined' ? `${window?.location?.origin}${gsctx?.url}` : '';
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

  const getDateDifference = useCallback(() => {
    const { expiredAt } = gsctx;
    const expiryDate = new Date(expiredAt);
    const currentDate = new Date();
    const diff = expiryDate.getTime() - currentDate.getTime();
    if (diff < 0) {
      return ({
        time: diff,
        days: 0,
        hrs: 0,
        mins: 0,
      });
    }
    return ({
      time: diff,
      days: Math.floor(diff / 86400000), // days
      hrs: Math.floor((diff % 86400000) / 3600000), // hours
      mins: Math.round(((diff % 86400000) % 3600000) / 60000), // minutes
    });
  },
  [gsctx.members]);

  const isExpired = !(getDateDifference().time > -1);

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

  const getBannerTotalCashBack = useCallback((discountVal) => {
    const total = gsctx?.members.reduce((cashback, member) => {
      const totalPrice = member.products?.reduce((tot, prd) => tot + +(prd.price), 0);
      // eslint-disable-next-line radix
      const totalDiscountedAmount = totalPrice! * (parseInt(discountVal) / 100);
      // console.log('🚀useDeal totalDiscountedAmount', totalDiscountedAmount);
      return cashback + (totalDiscountedAmount);
    }, 0);

    return total.toFixed(2);
  }, [gsctx]);
  const unLockCashBack = useCallback((discountVal, milestones) => {
    const prevDiscount = milestones.length > 1
    // eslint-disable-next-line radix
      ? parseInt(milestones[milestones.length - 2].discount)
      : 0;
    // eslint-disable-next-line radix
    const discountCurrent = parseInt(discountVal);
    const discountToCal = discountCurrent - prevDiscount;
    console.log({ prevDiscount });
    const mem: any = gsctx?.members[0];
    const total = mem.products?.reduce((tot: any, prd: any) => tot + +(prd.price), 0);
    const totalDiscountedAmount = total! * (discountToCal / 100);

    return parseFloat(totalDiscountedAmount.toFixed(2));
  }, [gsctx]);
  const formatNumber = ((num: number) => {
    const floatNum = parseFloat(num.toFixed(2));
    const lastDigit = floatNum % 10;
    const newFormatedNum = lastDigit === 0 ? num : floatNum;
    return newFormatedNum;
  });

  const milestones = gsctx?.milestones;
  return {
    currencySymbol,
    discount,
    dPrice,
    gsURL,
    clientDealProducts,
    getBuyers,
    formatName,
    topFive,
    getDateDifference,
    isExpired,
    productShareUrl,
    addedByName,
    totalCashBack,
    displayAddedBy,
    displayAddedByFunc,
    productPriceDiscount,
    socialLinks,
    getDiscounts,
    milestones,
    getBannerTotalCashBack,
    unLockCashBack,
    formatNumber,
  };
}
