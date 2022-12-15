import { useEffect, useState } from 'react';
import { IProduct } from 'types/store';
import useAppContext from './useAppContext';

const useSKU = () => {
  const { gsctx } = useAppContext();
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [campaignProducts, setCampaignProducts] = useState<any[]>([]);
  const [ownerProducts, setOwnerProducts] = useState<any[]>([]);
  const [memberProducts, setMemberProducts] = useState<any[]>([]);
  const [hideSection, setHideSection] = useState<boolean>(false);
  const [hideTopPicks, setHideTopPicks] = useState<boolean>(false);
  const [hidePopular, setHidePopular] = useState<boolean>(false);

  const { dealProducts, popularProducts: popularProductsStore } = gsctx;

  useEffect(() => {
    if (gsctx.store?.allInventoryProducts?.length) {
      setAllProducts(gsctx.store?.allInventoryProducts);
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
      const products = gsctx.allProducts.map((ele) => ele.id)
        .filter((value, index, self) => self.indexOf(value) === index);
      const popularProducts = gsctx.popularProducts.map((ele) => ele.id)
        .filter((value, index, self) => self.indexOf(value) === index);
      const isSame = popularProducts.map((ele) => (
        products.includes(ele)
      )).reduce((curr, next) => curr === next);
      if (gsctx.campaign?.products!?.length < 5
        && products.length === popularProducts.length
        && allProducts.length < 5) {
        setHideSection(isSame);
      } else {
        setHideSection(false);
      }
    }
  }, [gsctx]);

  useEffect(() => {
    if (popularProductsStore
      && ownerProducts.length
      && campaignProducts.length < 5) {
      const temp = ownerProducts.map((ele) => {
        if (campaignProducts.includes(ele.id)) {
          return true;
        }
        return false;
      }).reduce((curr, next) => curr === next);
      if (temp) {
        setHideTopPicks(true);
      } else if (!temp && (campaignProducts.length + popularProductsStore?.length) > 4) {
        setHideTopPicks(false);
      } else if (!temp && (campaignProducts.length + popularProductsStore?.length) < 5) {
        setHideTopPicks(true);
      }
    }
  }, [ownerProducts, popularProductsStore]);

  useEffect(() => {
    if (dealProducts?.length && campaignProducts.length < 5) {
      const temp = dealProducts.map((ele) => {
        if (campaignProducts.includes(ele.productId)) {
          return true;
        }
        return false;
      }).reduce((curr, next) => curr === next);
      setHidePopular(temp);
    } else {
      setHidePopular(false);
    }
  }, [dealProducts, campaignProducts]);

  return {
    SKU: allProducts, memberProducts, hideSection, campaignProducts, hideTopPicks, hidePopular,
  };
};

export default useSKU;
