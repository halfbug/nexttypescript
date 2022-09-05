import { useCallback, useContext, useState } from 'react';
import { GroupshopContext } from 'store/groupshop.context';
import { CartProduct, DealProduct } from 'types/groupshop';
import getSymbolFromCurrency from 'currency-symbol-map';
import _ from 'lodash';
import { IProduct } from 'types/store';
import useIP from './useIP';
import useUtilityFunction from './useUtilityFunction';
import useAppContext from './useAppContext';

export default function useDeal() {
  // const {
  //   gsctx,
  //   dispatch,
  // } = useContext(GroupshopContext);
  const { filterArray, findInArray2 } = useUtilityFunction();
  const { gsctx, dispatch, isGroupshop } = useAppContext();

  const [clientIP] = useIP();
  const [displayAddedBy, setdisplayAddedBy] = useState<boolean>(true);
  const [allDiscount, setallDiscount] = useState<(string | undefined)[] | undefined>(undefined);
  const {
    dealProducts,
    members: gmembers,
    addedProducts,
  } = gsctx;
  const isInfluencer = !!(!isGroupshop && dealProducts && dealProducts?.length < 1);
  // const isInfluencer = useCallback(
  //   () => !!(!isGroupshop && dealProducts && dealProducts?.length < 1),
  //   [gsctx],
  // );
  const isInfluencerGS = !isGroupshop;
  const isGSnRef = isGroupshop && dealProducts && dealProducts?.length > 1;
  // const ownerPrds = isInfluencerGS ? [] : gmembers[0]?.products[0] ?? [];

  const addedByRefferal = dealProducts?.filter((item) => item.isInfluencer === false);
  const addedByInfluencer = dealProducts?.filter((item) => item.isInfluencer === true);
  const addedProductsByInfluencer: any = _.uniq(gsctx?.influencerProducts);

  const clientDealProducts = useCallback(
    ():string[] => {
      const addedPrds = filterArray(gsctx?.dealProducts ?? [], gmembers[0]?.products ?? [], 'productId', 'id');
      // console.log('🚀 useDeal ~ addedPrds', addedPrds);

      return ([...addedPrds.filter(
        ({ customerIP } :{customerIP: string}) => customerIP === clientIP,
      )?.map(
        ({ productId }:DealProduct) => productId,
      ) ?? []]);
    }, [gsctx.dealProducts, clientIP],
  );
  // check influencer customer
  const checkCustomerDealProducts = useCallback(
    ():string[] | undefined => ([...addedByRefferal?.filter(
      ({ customerIP } :{customerIP: string}) => customerIP === clientIP,
    )?.map(
      ({ productId }:DealProduct) => productId,
    ) ?? []]), [clientIP, gsctx.dealProducts],
  );

  const currencySymbol = getSymbolFromCurrency(gsctx?.store?.currencyCode || 'USD');

  const discount = gsctx?.discountCode?.percentage;

  const dPrice = useCallback((price: number) => price - ((+discount / 100) * price), [gsctx]);

  const gsURL = typeof window !== 'undefined' ? `${window?.location?.origin}${gsctx?.url}` : '';
  const gsShortURL = gsctx?.shortUrl ?? gsURL;
  //   `https://appfornt.groupshop.co${gsctx?.url}`;
  const maxPercent = gsctx?.campaign?.salesTarget?.rewards?.[2]?.discount;
  const brandName = gsctx?.store?.brandName;
  const productShareUrl = useCallback((pid:string) => {
    // console.log('🚀 ~ file: useDeal.ts ~ line 36 ~ productShareUrl ~ pid', pid);
    const pidbreak = pid.split('/');
    // console.log('🚀 ~ file: useDeal.ts ~ line 38 ~ productShareUrl ~ pidbreak', pidbreak);
    return `${gsURL}/product&${pidbreak[4]}`;
  }, [gsctx.url]);

  const getBuyers = useCallback((pid:string) => gsctx.members.filter(
    (mem) => mem.products?.find((prd) => prd.id === pid),
  ), [gsctx.members]);
  const getBuyers2 = useCallback((pid:string) => gsctx?.memberDetails?.filter(
    (mem) => mem.lineItems?.find((prd: any) => prd.product.id === pid),
  ) ?? [], [gsctx.members]);

  const formatName = useCallback((customer : any) => `${customer.firstName ?? ''} ${customer.firstName ? customer.lastName.charAt(0) : customer.lastName}`,
    [gsctx.members]);

  const topFive = useCallback(
    (entity : any) => (Array.isArray(entity)
      ? entity.slice(0, entity.length > 5 ? 5 : entity.length) : []),
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
        secs: 0,
      });
    }
    return ({
      time: diff,
      days: Math.floor(diff / 86400000), // days
      hrs: Math.floor((diff % 86400000) / 3600000), // hours
      mins: Math.round(((diff % 86400000) % 3600000) / 60000), // minutes
      secs: Math.round((((diff % 86400000) % 3600000) / 60000) / 60000), // seconds
    });
  },
  [gsctx.members]);

  const isExpired = isGroupshop ? !(getDateDifference().time > -1) : false;

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
      const totalPrice:any = member.products?.reduce((tot, prd) => tot + +(prd.price), 0);
      // eslint-disable-next-line radix
      const totalDiscountedAmount = totalPrice! * (parseInt(discountVal) / 100);
      // console.log('🚀useDeal totalDiscountedAmount', totalDiscountedAmount);
      return cashback + (totalDiscountedAmount);
    }, 0);

    return total.toFixed(2);
  }, [gsctx]);

  const getBannerTotalCashBackByOrder = useCallback((discountVal:any) => {
    const total = gsctx?.members.reduce((cashback, member) => {
      const totalPrice: any = member.role === 'owner' ? member.lineItems?.reduce(
        (tot:any, prd:any) => tot + ((prd.discountedPrice ?? prd.price) * prd.quantity), 0,
      ) : member.lineItems?.reduce(
        (tot:any, prd:any) => tot + +(prd.price * prd.quantity), 0,
      );

      // eslint-disable-next-line radix
      const totalDiscountedAmount = totalPrice! * (parseInt(discountVal) / 100);
      // console.log('🚀useDeal totalDiscountedAmount', totalDiscountedAmount);
      return cashback + (totalDiscountedAmount);
    }, 0);
    return total.toFixed(2);
  }, [gsctx]);
  const getBannerTotalCashBackByMember = useCallback((memberNum: number, discountVal: any) => {
    const totalPrice = +memberNum === 0 ? gsctx?.members[memberNum].lineItems?.reduce(
      (tot:any, prd:any) => tot + +((prd.discountedPrice ?? prd.price) * prd.quantity), 0,
    ) : gsctx?.members[memberNum].lineItems?.reduce(
      (tot:any, prd:any) => tot + +(prd.price * prd.quantity), 0,
    );

    // eslint-disable-next-line radix
    const total = totalPrice! * (parseInt(discountVal) / 100);
    // console.log('🚀useDeal totalDiscountedAmount', totalDiscountedAmount);
    return total.toFixed(2);
  }, [gsctx]);

  const unLockCB = useCallback((discountVal, milestones, members) => {
    let cb = 0;
    setallDiscount(getDiscounts());
    const arr = getDiscounts();
    const firstDis = arr?.length ? arr[0] : '20%';
    const secDis = arr?.length ? arr[1] : '30%';
    const thirdDis = arr?.length ? arr[2] : '35%';
    const ownerCB1 = 50; // owner CB when 5 friends
    const ownerCB2 = 90;// owner CB when 9 friends

    let newDiscount = discountVal;
    if (members.length === 1) { // owner
      newDiscount = discountVal;
      cb = +(getBannerTotalCashBackByOrder(newDiscount));
    } else if (members.length === 2) { // 1st frnd
      const nextCB = parseInt(secDis!, 10) - discountVal; // next cb can be availed
      cb = +(getBannerTotalCashBackByMember(0, discountVal))
      + +(getBannerTotalCashBackByMember(1, nextCB))
      + +(getBannerTotalCashBackByMember(0, nextCB));
    } else if (members.length === 3) { // 2nd frnd
      // no cashback m2 unlock
      const nextCB = parseInt(secDis!, 10) - parseInt(firstDis!, 10); // next cb can be availed
      cb = +(getBannerTotalCashBackByMember(0, firstDis)) //
      + +(getBannerTotalCashBackByMember(1, nextCB)) //
      + +(getBannerTotalCashBackByMember(2, nextCB)) //
      + +(getBannerTotalCashBackByMember(0, nextCB));
    } else if (members.length === 4) { // 3rd frnd
      const oldCB = parseInt(secDis!, 10) - parseInt(firstDis!, 10); // next cb can be availed
      const nextCB1 = parseInt(thirdDis!, 10) - parseInt(secDis!, 10); // next cb can be availed
      const nextCBOwner = ownerCB1 - parseInt(secDis!, 10);
      cb = +(getBannerTotalCashBackByMember(0, firstDis)) // old upper calc
      + +(getBannerTotalCashBackByMember(1, oldCB)) // old upper calc
      + +(getBannerTotalCashBackByMember(2, oldCB)) // old upper calc
      + +(getBannerTotalCashBackByMember(0, oldCB)) // old upper calc
      + +(getBannerTotalCashBackByMember(0, nextCBOwner))
      + +(getBannerTotalCashBackByMember(1, nextCB1))
      + +(getBannerTotalCashBackByMember(2, nextCB1))
      + +(getBannerTotalCashBackByMember(3, nextCB1));
    } else if (members.length === 5) {
      // no cashback m3 unlock
      const oldCB = parseInt(secDis!, 10) - parseInt(firstDis!, 10); // next cb can be availed
      const nextCB1 = parseInt(thirdDis!, 10) - parseInt(secDis!, 10); // next cb can be availed
      const nextCBOwner = ownerCB1 - parseInt(secDis!, 10);
      cb = +(getBannerTotalCashBackByMember(0, firstDis)) // old upper calc
      + +(getBannerTotalCashBackByMember(1, oldCB)) // old upper calc
      + +(getBannerTotalCashBackByMember(2, oldCB)) // old upper calc
      + +(getBannerTotalCashBackByMember(0, oldCB)) // old upper calc
      + +(getBannerTotalCashBackByMember(0, nextCBOwner))
      + +(getBannerTotalCashBackByMember(1, nextCB1))
      + +(getBannerTotalCashBackByMember(2, nextCB1))
      + +(getBannerTotalCashBackByMember(3, nextCB1))
      + +(getBannerTotalCashBackByMember(4, nextCB1));
    } else if (members.length >= 6) {
      const oldCB = parseInt(secDis!, 10) - parseInt(firstDis!, 10); // next cb can be availed
      const nextCB1 = parseInt(thirdDis!, 10) - parseInt(secDis!, 10); // next cb can be availed
      const nextCBOwner = ownerCB1 - parseInt(secDis!, 10);
      const nextCBOwner2 = ownerCB2 - ownerCB1;
      cb = +(getBannerTotalCashBackByMember(0, firstDis)) // old upper calc
      + +(getBannerTotalCashBackByMember(1, oldCB)) // old upper calc
      + +(getBannerTotalCashBackByMember(2, oldCB)) // old upper calc
      + +(getBannerTotalCashBackByMember(0, oldCB)) // old upper calc
      + +(getBannerTotalCashBackByMember(0, nextCBOwner))
      + +(getBannerTotalCashBackByMember(1, nextCB1))
      + +(getBannerTotalCashBackByMember(2, nextCB1))
      + +(getBannerTotalCashBackByMember(3, nextCB1))
      + +(getBannerTotalCashBackByMember(4, nextCB1)) //
      + +(getBannerTotalCashBackByMember(0, nextCBOwner2));
    }
    // else if (members.length === 8) {
    //   // add 3rd person product discount only
    //   members[2].products?.reduce((tot, prd) => tot + +(prd.price), 0);
    // }
    const formattedCB = +(cb.toFixed(2).toString().replace('.00', ''));
    return formattedCB;
  }, [gsctx]);

  const nextDiscountCalculator = ((disc: string) => {
    const rew = gsctx.campaign?.salesTarget?.rewards!;
    const nextIndex = gsctx.campaign?.salesTarget?.rewards?.findIndex(
      (reward) => reward.discount === `${disc}%`,
    );

    const nextDiscount = (nextIndex === 0 || nextIndex === 1) ? rew[nextIndex + 1].discount
      : rew[0].discount;
    return nextDiscount as string;
  });
  const milestones = gsctx?.milestones;
  // const activateURL = `${gsURL}?activated=${Math.floor((Math.random() * 6) + 1).toFixed(2)}-GS`;
  const activateURL = `${gsURL}/status&activated`;
  const shortActivateURL = gsctx?.exipredShortLink ?? activateURL;

  const banner = gsctx?.campaign?.settings?.s3imageUrl ?? 'https://gsnodeimages.s3.amazonaws.com/bg.jpg';
  // const getExpectedCashBack = `$${gsctx?.expectedCashBack}` ?? '';
  const baseLine = gsctx?.partnerRewards?.baseline;

  const formatNameCase = (name : string) => {
    const full = name.toLowerCase().split(' ');
    const fullname = full.map((item: string) => {
      if (item !== '') return `${item[0].toUpperCase()}${item.slice(1)}`;
      return '';
    }).join(' ');
    return fullname;
  };
  const leftOverProducts = isInfluencerGS ? gsctx?.store?.products?.filter(
    (item) => !dealProducts?.some((item2) => item2.productId === item.id),
  ) : gsctx?.store?.products?.filter(
    (item: any) => !addedProducts?.some((item2) => item2.productId === item.id),
  );
  const getOwnerName = useCallback(() => (
    isInfluencerGS ? formatNameCase(`${gsctx?.partnerDetails?.fname} ${gsctx?.partnerDetails?.lname?.charAt(0) ?? ''}`)
      : formatNameCase(`${gsctx?.members[0].orderDetail.customer.firstName} ${gsctx?.members[0].orderDetail.customer.lastName.charAt(0)}`)), [gsctx]);
  const socialText = `Shop ${brandName} on my Groupshop and get up to ${maxPercent} off`;
  const nativeShareText = `Shop ${brandName} on my Groupshop and get up to ${maxPercent} off`;
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
    // unLockCashBack,
    unLockCB,
    getBannerTotalCashBackByOrder,
    activateURL,
    banner,
    gsctx,
    // getExpectedCashBack,
    isInfluencer,
    addedProductsByInfluencer,
    baseLine,
    isInfluencerGS,
    isGSnRef,
    addedByRefferal,
    getBuyers2,
    getOwnerName,
    checkCustomerDealProducts,
    formatNameCase,
    maxPercent,
    brandName,
    shortActivateURL,
    socialText,
    nativeShareText,
    leftOverProducts,
  };
}
