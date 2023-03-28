import {
  useCallback, useContext, useEffect, useState,
} from 'react';
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
  const {
    gsctx, dispatch, isGroupshop, isChannel, isDrops,
  } = useAppContext();

  const [clientIP] = useIP();
  const [displayAddedBy, setdisplayAddedBy] = useState<boolean>(true);
  const [allDiscount, setallDiscount] = useState<(string | undefined)[] | undefined>(undefined);
  const [isExpired, setisExpired] = useState<boolean>(false);
  const {
    dealProducts,
    members: gmembers,
    addedProducts,
    ownerDeals,
  } = gsctx;
  const isInfluencer = !!(!isGroupshop && !isChannel && dealProducts && dealProducts?.length < 1);
  const isChannelOwner = isChannel
  && ((!dealProducts) || (dealProducts && dealProducts?.length < 1));
  // const isInfluencer = useCallback(
  //   () => !!(!isGroupshop && dealProducts && dealProducts?.length < 1),
  //   [gsctx],
  // );
  const isInfluencerGS = !isGroupshop && !isChannel;
  const isGSnRef = isGroupshop && dealProducts && dealProducts?.length > 1;
  // const ownerPrds = isInfluencerGS ? [] : gmembers[0]?.products[0] ?? [];

  const addedByRefferal = !isChannel ? dealProducts?.filter((item) => item.isInfluencer === false) : dealProducts?.filter((item) => item.type === 'deal');
  const addedByInfluencer = !isChannel ? dealProducts?.filter((item) => item.isInfluencer === true) : dealProducts?.filter((item) => item.type === 'owner');
  const addedProductsByInfluencer: any = _.uniq(gsctx?.influencerProducts);
  const addedProductsByOwner: any = _.uniq(gsctx?.ownerProducts);

  const getDealUserName = () => {
    if (isInfluencerGS) {
      return gsctx?.partnerDetails?.fname ?? '';
    }

    if (isChannel) {
      return gsctx.customerDetail?.firstName ?? '';
    }

    return '';
  };

  const clientDealProducts = useCallback(
    (): string[] => {
      // eslint-disable-next-line max-len
      // const addedPrds = filterArray(gsctx?.dealProducts ?? [], gmembers[0]?.products ?? [], 'productId', 'id');
      const addedPrds = isChannel ? gsctx?.dealProducts?.filter((item) => item.type === 'deal' || item.type === 'owner') ?? [] : gsctx?.dealProducts?.filter((item) => item.type === 'deal') ?? [];
      return ([...addedPrds.filter(
        ({ customerIP }: { customerIP: string }) => customerIP === clientIP,
      )?.map(
        ({ productId }: DealProduct) => productId,
      ) ?? []]);
    }, [gsctx.dealProducts, clientIP],
  );
  // check influencer customer
  const checkCustomerDealProducts = useCallback(
    (): string[] | undefined => ([...addedByRefferal?.filter(
      ({ customerIP }: { customerIP: string }) => customerIP === clientIP,
    )?.map(
      ({ productId }: DealProduct) => productId,
    ) ?? []]), [clientIP, gsctx.dealProducts],
  );

  const currencySymbol = getSymbolFromCurrency(gsctx?.store?.currencyCode || 'USD');

  const currencySymbolDiscovery = (currency: any) => getSymbolFromCurrency(currency || 'USD');

  const discount = gsctx?.discountCode?.percentage || '40';

  const dPrice = useCallback((price: number) => price - ((+discount / 100) * price), [gsctx]);

  const disPrice = useCallback(
    (price: number, disDiscount: number) => price - ((+disDiscount / 100) * price), [gsctx],
  );

  const gsURL = typeof window !== 'undefined' ? `${window?.location?.origin}${gsctx?.url}` : '';
  const gsShortURL = gsctx?.shortUrl ?? gsURL;
  //   `https://appfornt.groupshop.co${gsctx?.url}`;

  let maxPercent;
  if (isChannel) {
    maxPercent = gsctx?.channelRewards?.baseline;
  } else if (isDrops) {
    maxPercent = `${gsctx.store?.drops?.rewards?.maximum}%`;
  } else {
    maxPercent = isGroupshop ? gsctx?.campaign?.salesTarget?.rewards?.[2]?.discount
      : gsctx?.partnerRewards?.baseline;
  }
  const brandName = gsctx?.store?.brandName;
  const productShareUrl = useCallback((pid: string) => {
    // console.log('🚀 ~ file: useDeal.ts ~ line 36 ~ productShareUrl ~ pid', pid);
    const pidbreak = pid.split('/');
    // console.log('🚀 ~ file: useDeal.ts ~ line 38 ~ productShareUrl ~ pidbreak', pidbreak);
    return `${gsURL}/product&${pidbreak[4]}`;
  }, [gsctx.url]);

  const getBuyers = useCallback((pid: string) => gsctx.members.filter(
    (mem) => mem.products?.find((prd) => prd?.id === pid),
  ), [gsctx.members]);
  const getBuyers2 = useCallback((pid: string) => gsctx?.memberDetails?.filter(
    (mem) => mem.lineItems?.find((prd: any) => prd.product.id === pid),
  ) ?? [], [gsctx.members]);

  const getBuyersDiscover = (pid: string, member:any) => (
    member?.filter((mem:any) => mem?.products?.find((prd:any) => prd?.id === pid))
  );

  const formatName = useCallback((customer : any) => `${customer.firstName ?? ''} ${customer.firstName ? customer?.lastName?.charAt(0) ?? '' : customer?.lastName ?? ''}`,
    [gsctx.members]);

  const nameOnProductGrid = useCallback((customer) => {
    if (!customer?.firstName?.length) {
      if (customer?.lastName?.length > 7) {
        return customer.lastName.slice(0, 7);
      }
      return customer?.lastName;
    }
    if (customer?.firstName?.length > 7) {
      return `${customer.firstName.slice(0, 7)} ${customer?.lastName?.charAt(0)}`;
    }
    return `${customer.firstName} ${customer?.lastName?.charAt(0)}`;
  }, [gsctx.members]);

  const topFive = useCallback((entity: any) => {
    // On mobile it'll show 2 members
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 500;
      if (isMobile) {
        return Array.isArray(entity)
          ? entity.slice(0, entity.length > 2 ? 2 : entity.length) : [];
      }
    }
    return Array.isArray(entity)
      ? entity.slice(0, entity.length > 5 ? 5 : entity.length) : [];
  }, [gsctx.members]);

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
  [gsctx.members, gsctx.expiredAt]);

  useEffect(() => {
    if (gsctx.expiredAt === null) {
      setisExpired(false);
    } else {
      setisExpired(isGroupshop || isChannel || isDrops ? !(getDateDifference().time > -1) : false);
    }
  }, [gsctx.expiredAt]);

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
    const filtered = dealProducts?.filter((ele) => {
      if (isChannel) {
        return ele;
      } if (ele.type === 'deal') {
        return ele;
      }
      return ele;
    }).find((item) => item.productId === productId);

    return filtered?.addedBy;
  },
  [gsctx]);

  const displayAddedByFunc = useCallback((productId) => {
    const { members } = gsctx;
    const ownerProd = members[0]?.products;
    const prod1 = ownerProd?.find((item) => item?.id === productId);
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
    if (isDrops && discountedPrice === 0) {
      return price * (40 / 100);
    }
    return discountedPrice.toFixed(2);
  });

  const socialLinks = gsctx?.store?.social;

  const getDiscounts = useCallback(() => {
    const allDiscountArr = gsctx.campaign?.salesTarget?.rewards?.map((rew) => rew.discount);
    return allDiscountArr;
  }, [gsctx]);

  const getBannerTotalCashBack = useCallback((discountVal) => {
    const total = gsctx?.members.reduce((cashback, member) => {
      const totalPrice: any = member.products?.reduce((tot, prd) => tot + +(prd.price), 0);
      // eslint-disable-next-line radix
      const totalDiscountedAmount = totalPrice! * (parseInt(discountVal) / 100);
      console.log('🚀useDeal totalDiscountedAmount', totalDiscountedAmount);
      return cashback + (totalDiscountedAmount);
    }, 0);

    return total.toFixed(2);
  }, [gsctx]);

  const getBannerTotalCashBackByOrder = useCallback((discountVal: any) => {
    const total = gsctx?.members.reduce((cashback, member) => {
      const totalPrice: any = member.role === 'owner' ? member.lineItems?.reduce(
        (tot: any, prd: any) => tot + ((prd.discountedPrice ?? prd.price) * prd.quantity), 0,
      ) : member.lineItems?.reduce(
        (tot: any, prd: any) => tot + +(prd.price * prd.quantity), 0,
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
      (tot: any, prd: any) => tot + +((prd.discountedPrice ?? prd.price) * prd.quantity), 0,
    ) : gsctx?.members[memberNum].lineItems?.reduce(
      (tot: any, prd: any) => tot + +(prd.price * prd.quantity), 0,
    );

    // eslint-disable-next-line radix
    const total = totalPrice! * (parseInt(discountVal) / 100);
    // console.log('🚀useDeal totalDiscountedAmount', totalDiscountedAmount);
    return total.toFixed(2);
  }, [gsctx]);

  const calculation = (memberIndex: number, amount: number, self: any) => {
    if (!gsctx.id) {
      return false;
    }

    const milestone1: any = gsctx.campaign?.salesTarget?.rewards?.length
    && parseInt(`${gsctx.campaign?.salesTarget?.rewards[0].discount}`, 10);

    const milestone2: any = gsctx.campaign?.salesTarget?.rewards?.length
          && parseInt(`${gsctx.campaign?.salesTarget?.rewards[1].discount}`, 10);

    const milestone3: any = gsctx.campaign?.salesTarget?.rewards?.length
    && parseInt(`${gsctx.campaign?.salesTarget?.rewards[2].discount}`, 10);

    if (memberIndex === 0) {
      return { discount: 0, cashback: [0] };
    }

    if (memberIndex === 1) {
      const count = (amount * milestone1) / 100;
      self[0].cashbackAmount.cashback.push((self[0].purchaseCount * milestone1) / 100);
      return { discount: count, cashback: [0] };
    }

    if (memberIndex === 2) {
      // MILESTONE 1 COMPLETE
      const count = (amount * milestone1) / 100;
      return { discount: count, cashback: [0] };
    }

    if (memberIndex === 3) {
      // MILESTONE 2 UNLOCKED
      self[0].cashbackAmount.cashback.push(
        (self[0].purchaseCount * (milestone2 - milestone1)) / 100,
      );
      self[1].cashbackAmount.cashback.push(
        (self[1].purchaseCount * (milestone2 - milestone1)) / 100,
      );
      self[2].cashbackAmount.cashback.push(
        (self[2].purchaseCount * (milestone2 - milestone1)) / 100,
      );
      const count = (amount * milestone2) / 100;
      return { discount: count, cashback: [0] };
    }

    if (memberIndex === 4) {
      // MILESTONE 2 COMPLETE
      const count = (amount * milestone2) / 100;
      return { discount: count, cashback: [0] };
    }

    if (memberIndex === 5) {
      // MILESTONE 3 UNLOCKED
      self[1].cashbackAmount.cashback.push(
        (self[1].purchaseCount * (milestone3 - milestone2)) / 100,
      );
      self[2].cashbackAmount.cashback.push(
        (self[2].purchaseCount * (milestone3 - milestone2)) / 100,
      );
      self[3].cashbackAmount.cashback.push(
        (self[3].purchaseCount * (milestone3 - milestone2)) / 100,
      );
      self[4].cashbackAmount.cashback.push(
        (self[4].purchaseCount * (milestone3 - milestone2)) / 100,
      );
      self[0].cashbackAmount.cashback.push(
        (self[0].purchaseCount * (50 - milestone2)) / 100,
      );
      const count = (amount * milestone3) / 100;
      return { discount: count, cashback: [0] };
    }

    if (memberIndex >= 6 && memberIndex <= 8) {
      // MILESTONE 3 COMPLETE
      const count = (amount * milestone1) / 100;
      return { discount: count, cashback: [0] };
    }

    if (memberIndex === 9) {
      const count = (amount * milestone1) / 100;
      self[0].cashbackAmount.cashback.push(
        (self[0].purchaseCount * (40)) / 100,
      );
      return { discount: count, cashback: [0] };
    }

    if (memberIndex > 9) {
      const count = (amount * milestone1) / 100;
      return { discount: count, cashback: [0] };
    }

    return [];
  };

  const getRewads = (unlockedAmount: number, arr: any[], members: any[]) => {
    const milestone1: any = gsctx.campaign?.salesTarget?.rewards?.length
    && parseInt(`${gsctx.campaign?.salesTarget?.rewards[0].discount}`, 10);

    const milestone2: any = gsctx.campaign?.salesTarget?.rewards?.length
          && parseInt(`${gsctx.campaign?.salesTarget?.rewards[1].discount}`, 10);

    const milestone3: any = gsctx.campaign?.salesTarget?.rewards?.length
    && parseInt(`${gsctx.campaign?.salesTarget?.rewards[2].discount}`, 10);

    const applyPercent1 = milestone2 - milestone1;
    const applyPercent2 = milestone3 - milestone2;
    const applyPercent3 = 50 - milestone2;

    if (members.length === 1) {
      const percentAmount = (+arr[members.length - 1].purchaseCount * milestone1) / 100;
      const currentReward = (+unlockedAmount + +percentAmount).toFixed(4);
      const nextReward = +currentReward
      + (+arr[members.length - 1].purchaseCount * applyPercent1) / 100;
      return { currentReward, nextReward };
    }
    if (members.length === 2) {
      const percentAmount = arr.map((ele) => (ele.purchaseCount * applyPercent1) / 100)
        .reduce((curr, next) => curr + next);
      const currentReward = (+unlockedAmount + +percentAmount).toFixed(4);

      const percent0 = (arr[0].purchaseCount * applyPercent3) / 100;
      const percent1 = (arr[1].purchaseCount * applyPercent2) / 100;
      const nextReward = +currentReward + +percent0 + +percent1;
      return { currentReward, nextReward };
    }
    if (members.length === 3) {
      const percentAmount = arr.map((ele) => (ele.purchaseCount * applyPercent1) / 100)
        .reduce((curr, next) => curr + next);
      const currentReward = (+unlockedAmount + +percentAmount).toFixed(4);

      const percent0 = (arr[0].purchaseCount * applyPercent3) / 100;
      const percent1 = (arr[1].purchaseCount * applyPercent2) / 100;
      const percent2 = (arr[2].purchaseCount * applyPercent2) / 100;
      const nextReward = +currentReward + +percent0 + +percent1 + +percent2;
      return { currentReward, nextReward };
    }
    if (members.length === 4 || members.length === 5) {
      const percentAmount = arr.map((ele, i) => (i === 0
        ? (ele.purchaseCount * applyPercent3) / 100 : (ele.purchaseCount * applyPercent2) / 100))
        .reduce((curr, next) => curr + next);
      const currentReward = (+unlockedAmount + +percentAmount).toFixed(4);

      const percent0 = (arr[0].purchaseCount * 40) / 100;
      const nextReward = +currentReward + +percent0;
      return { currentReward, nextReward };
    }
    if (members.length > 5 && members.length < 10) {
      const percentAmount = (arr[0].purchaseCount * 40) / 100;
      const currentReward = (+unlockedAmount + +percentAmount).toFixed(4);
      const nextReward = 'NA';
      // console.log('🎈 currentReward', currentReward, nextReward);
      return { currentReward, nextReward };
    }
    if (members.length >= 10) {
      const currentReward = (+unlockedAmount).toFixed(4);
      const nextReward = 'NA';
      return { currentReward, nextReward };
    }

    return { currentReward: 0, nextReward: 0 };
  };

  const cashback = useCallback(() => {
    if (gsctx.id) {
      const { members } = gsctx;
      const spent: any[] = [];
      members.map((ele, i) => {
        const d = ele.lineItems
          ?.map((item: any) => +item.price * item.quantity)
          ?.reduce((total: any, curr: any) => total + curr, 0);
        spent.push({
          member: i,
          purchaseCount: d,
          cashbackAmount: calculation(i, d, spent),
        });
        return false;
      });
      // console.log('🎈', spent);
      const totalCashbackAmount = spent.map((ele) => (
        ele.cashbackAmount?.discount
        + ele.cashbackAmount.cashback.reduce((total: number, curr: number) => total + curr, 0)
      )).reduce((total: number, curr: number) => total + curr, 0);

      const temp = getRewads(totalCashbackAmount, spent, members);
      const currentAmout = temp.currentReward;
      const nextAmount = temp.nextReward;

      // if only owner exist then orderamount milestone1 % else do all the total cashback
      const finalAmount = {
        currentAmout: !Number.isNaN(+currentAmout) ? (+currentAmout).toFixed(2) : 'NA',
        nextAmount: !Number.isNaN(+nextAmount) ? (+nextAmount).toFixed(2) : 'NA',
        totalUnlockedAmount: members.length === 1
          ? (+currentAmout).toFixed(2) : (+totalCashbackAmount).toFixed(2),
      };

      return finalAmount;
    }
    return { nextAmount: 0, currentAmout: 0, totalUnlockedAmount: 0 };
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
  let shortActivateURL;
  if (isDrops) {
    shortActivateURL = gsctx.expiredShortUrl ?? activateURL;
  } else {
    shortActivateURL = isChannel
      ? gsctx?.expiredShortLink ?? activateURL : gsctx?.exipredShortLink ?? activateURL;
  }

  const banner = gsctx?.store?.settings?.general?.imageUrl ? gsctx?.store?.settings?.general?.imageUrl : `${process.env.IMAGE_PATH}/bg.jpg`;
  // const getExpectedCashBack = `$${gsctx?.expectedCashBack}` ?? '';
  const baseLine = gsctx?.partnerRewards?.baseline;

  const channelBaseLine = isChannel ? gsctx.channelRewards?.baseline : '';

  const formatNameCase = (name: string) => {
    const full = name.toLowerCase().split(' ');
    const fullname = full.map((item: string) => {
      if (item !== '') return `${item[0].toUpperCase()}${item.slice(1)}`;
      return '';
    }).join(' ');
    return fullname;
  };
  const leftOverProducts = useCallback(() => (isInfluencerGS ? gsctx?.store?.products?.filter(
    (item) => !dealProducts?.some((item2) => item2.productId === item.id),
  ) ?? [] : gsctx?.store?.products?.filter(
    (item: any) => !addedProducts?.some((item2) => item2.productId === item.id),
  ).filter(
    (item: any) => !ownerDeals?.some((item2) => item2.id === item.id),
  ) ?? []), [gsctx, gsctx?.store?.products]);

  const getOwnerName = useCallback(() => {
    if (isChannel) {
      return formatNameCase(`${gsctx?.customerDetail?.firstName ?? ''} ${gsctx?.customerDetail?.firstName ? gsctx?.customerDetail?.lastName?.charAt(0) ?? '' : gsctx?.customerDetail?.lastName ?? ''}`);
    }

    if (isDrops) {
      return formatNameCase(`${gsctx?.customerDetail?.firstName ?? ''} ${gsctx?.customerDetail?.firstName ? gsctx?.customerDetail?.fullName?.charAt(0) ?? '' : gsctx?.customerDetail?.fullName ?? ''}`);
    }

    if (isInfluencerGS) {
      return formatNameCase(`${gsctx?.partnerDetails?.fname ?? ''} ${gsctx?.partnerDetails?.fname ? gsctx?.partnerDetails?.lname?.charAt(0) ?? '' : gsctx?.partnerDetails?.lname ?? ''}`);
    }
    return formatNameCase(`${gsctx?.members[0].orderDetail.customer.firstName ?? ''} ${gsctx?.members[0].orderDetail.customer.firstName ? gsctx?.members[0]?.orderDetail?.customer?.lastName?.charAt(0) ?? '' : gsctx?.members[0]?.orderDetail?.customer?.lastName ?? ''}`);
  }, [gsctx]);

  const getOwnerFirstName = useCallback(() => {
    if (isChannel) {
      return formatNameCase(`${gsctx?.customerDetail?.firstName ? gsctx?.customerDetail?.firstName : gsctx?.customerDetail?.lastName}`);
    }

    if (isInfluencerGS) {
      return formatNameCase(`${gsctx?.partnerDetails?.fname ? gsctx?.partnerDetails?.fname : gsctx?.partnerDetails?.lname}`);
    }
    return formatNameCase(`${gsctx?.members[0].orderDetail.customer.firstName ? gsctx?.members[0].orderDetail.customer.firstName : gsctx?.members[0]?.orderDetail?.customer?.lastName}`);
  }, [gsctx]);

  const socialText = `Shop ${brandName} on my ${isDrops ? 'Groupshop' : 'Microstore'} and get up to ${maxPercent} off`;
  const nativeShareText = `Shop ${brandName} on my ${isDrops ? 'Groupshop' : 'Microstore'} and get up to ${maxPercent} off`;

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
    addedProductsByOwner,
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
    cashback,
    addedByInfluencer,
    getOwnerFirstName,
    nameOnProductGrid,
    isChannelOwner,
    channelBaseLine,
    getDealUserName,
    getBuyersDiscover,
    disPrice,
    currencySymbolDiscovery,
    isDrops,
  };
}
