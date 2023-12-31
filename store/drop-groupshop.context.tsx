import * as React from 'react';
import { IGroupshop } from 'types/groupshop';
import { gsreducer, GroupshopActions } from './groupshop.reducer';

export interface GSDContextType {
  gsctx: IGroupshop,
  dispatch: React.Dispatch<GroupshopActions>;
}

export const gsdInit: IGroupshop = {
  members: [{
    products: [{
      id: '', price: '', title: '', featuredImage: '',
    }],
    orderDetail: { customer: '' },
    orderId: '',
    availedDiscount: 0,
    role: 'referral',
  }],
  id: '',
  storeId: '',
  totalProducts: 0,
  url: '',
  shortUrl: '',
  createdAt: new Date(),
  expiredAt: null,
  expiredShortUrl: '',
  discountCode: {
    title: '',
    percentage: '',
    priceRuleId: '',
  },
  store: {
    brandName: '',
    products: [],
    logoImage: '',
    settings: { general: { imageUrl: '' } },
    drops: {
      status: '',
      isVideoEnabled: false,
      spotlightColletionId: '',
      allProductsCollectionId: '',
      bestSellerCollectionId: '',
      latestCollectionId: '',
      rewards: {
        baseline: 0,
        average: 0,
        maximum: 0,
      },
      cartRewards: [{
        id: '',
        rewardTitle: '',
        rewardValue: '',
      }],
      spotlightDiscount: { percentage: '', priceRuleId: '', title: '' },
    },
  },
  cart: [],
  favorite: [],
  forYouSections: [],
  selectedCategory: '',
  spotlightProducts: [],
  sections: [],
  isDrops: true,
  customerDetail: {
    firstName: '', lastName: '', email: '', phone: '',
  },
  isActive: false,
  campaignId: '',
  milestones: [],
  revisedCount: 0,
  loading: false,
};

export const DropGroupshopContext = React.createContext<GSDContextType>(
  { gsctx: gsdInit, dispatch: ():any => {} },
);

export const GroupshopDropsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [gsctx, dispatch] = React.useReducer(gsreducer, gsdInit);
  console.log('🚀 ~ file: drops-groupshop.context.tsx ~ line 50 ~ gsctx', gsctx);

  return (
    <DropGroupshopContext.Provider value={{ gsctx, dispatch }}>
      {children}
    </DropGroupshopContext.Provider>
  );
};
