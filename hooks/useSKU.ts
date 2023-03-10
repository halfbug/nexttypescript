import { useCallback, useEffect, useState } from 'react';
import { IProduct } from 'types/store';
import useAppContext from './useAppContext';
import useUtilityFunction from './useUtilityFunction';

const useSKU = () => {
  const { gsctx, isPartner } = useAppContext();
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [campaignProducts, setCampaignProducts] = useState<any[]>([]);
  const [ownerProducts, setOwnerProducts] = useState<any[]>([]);
  const [memberProducts, setMemberProducts] = useState<any[]>([]);
  const [hideSection, setHideSection] = useState<boolean>(false);
  const [hideTopPicks, setHideTopPicks] = useState<boolean>(false);
  const [hidePopular, setHidePopular] = useState<boolean>(false);
  const { uniqueArray } = useUtilityFunction();

  const {
    dealProducts,
    popularProducts: popularProductsStore,
    influencerProducts,
    campaign,
  } = gsctx;

  const deal: any = useCallback(() => {
    const arr: any = [];
    if (isPartner && influencerProducts && campaign && campaign?.products) {
      influencerProducts?.forEach((ele: any) => {
        if (!campaign?.products?.includes(ele.id)) {
          arr.push(ele.id);
        }
      });
      return [...arr, ...campaign?.products];
    }

    if (popularProductsStore
      && popularProductsStore.length && campaign && campaign?.products) {
      popularProductsStore?.forEach((ele: any) => {
        if (!campaign?.products?.includes(ele.id)) {
          arr.push(ele.id);
        }
      });
      return [...arr, ...campaign?.products];
    }
    return [];
  }, [gsctx]);

  useEffect(() => {
    if (gsctx.store?.allInventoryProducts?.length) {
      const temp: IProduct[] = [];
      gsctx.members?.forEach((item) => {
        item?.products?.map((ele: any) => temp.push(ele));
      });
      const arr = uniqueArray([...gsctx.store?.allInventoryProducts, ...temp]);
      setAllProducts(arr);
    }
    if (gsctx.campaign?.products?.length) {
      setCampaignProducts(gsctx.campaign?.products);
    }
    if (gsctx.members.length) {
      const temp: IProduct[] = [];
      gsctx.members[0]?.products?.map((ele) => temp.push(ele));
      setOwnerProducts(temp);
      setMemberProducts([...gsctx?.popularProducts ?? [], ...gsctx?.ownerDeals ?? []]);
    }
    if (gsctx.allProducts?.length && gsctx.popularProducts?.length) {
      if (deal().length > 4) {
        setHideSection(false);
        return;
      }
      const products = gsctx.allProducts.map((ele) => ele.id)
        .filter((value, index, self) => self.indexOf(value) === index);
      const popularProducts = gsctx.popularProducts.map((ele) => ele.id)
        .filter((value, index, self) => self.indexOf(value) === index);
      const isSame = popularProducts.map((ele) => (
        products.includes(ele)
      )).reduce((curr, next) => curr === next);
      if (dealProducts && (gsctx.campaign?.products!?.length + dealProducts?.length) < 5
        && products.length === popularProducts.length
        && allProducts.length < 5) {
        setHideSection(isSame);
      } else {
        setHideSection(false);
      }
    }
  }, [gsctx]);

  useEffect(() => {
    if (deal().length > 4) {
      setHideTopPicks(false);
    } else if (deal().length <= 4) {
      setHideTopPicks(true);
    }
  }, [ownerProducts, popularProductsStore]);

  useEffect(() => {
    if (deal().length > 4) {
      setHidePopular(false);
    }
    if (deal().length < 5) {
      setHidePopular(true);
    }
  }, [dealProducts, campaignProducts]);

  return {
    SKU: allProducts, memberProducts, hideSection, campaignProducts, hideTopPicks, hidePopular,
  };
};

export default useSKU;
