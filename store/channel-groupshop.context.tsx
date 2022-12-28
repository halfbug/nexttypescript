import * as React from 'react';
import { IGroupshop } from 'types/groupshop';
import { gsreducer, GroupshopActions } from './groupshop.reducer';

export interface GSCContextType {
  gsctx: IGroupshop,
  dispatch: React.Dispatch<GroupshopActions>;
}

export const gspInit: IGroupshop = {
  // memberDetails: [{
  //   orderId: '',
  //   customerInfo: {
  //     firstName: '', lastName: '', email: '', ip: '', phone: '',
  //   },
  //   comissionAmount: 0,
  //   orderAmount: 0,
  // }],
  memberDetails: [],

  // members: [{
  //   products: [{
  //     id: '', price: '', title: '', featuredImage: '',
  //   }],
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
  campaignId: '',
  channelId: '',
  storeId: '',
  totalProducts: 0,
  url: '',
  shortUrl: '',
  createdAt: new Date(),
  expiredAt: new Date(),
  expiredShortLink: '',
  discountCode: {
    title: '',
    percentage: '',
    priceRuleId: '',
  },
  milestones: [],
  store: {
    brandName: '', products: [], logoImage: '', settings: { general: { imageUrl: '' } },
  },
  cart: [],
  campaign: {
    socialLinks: {
      facebook: '', instagram: '', tiktok: '', twitter: '',
    },
    salesTarget: { id: '', rewards: [] },
    products: [],
  },
  bestSeller: [],
  allProducts: [],
  customerDetail: {
    firstName: '', lastName: '', email: '', phone: '',
  },
  channelRewards: {
    baseline: '',
    average: '',
    maximum: '',
    commission: '',
  },
  isActive: false,
  dealProducts: [],
};

export const ChannelGroupshopContext = React.createContext<GSCContextType>(
  { gsctx: gspInit, dispatch: ():any => {} },
);

export const GroupshopChannelContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [gsctx, dispatch] = React.useReducer(gsreducer, gspInit);
  console.log('🚀 ~ file: channel-groupshop.context.tsx ~ line 50 ~ gsctx', gsctx);

  return (
    <ChannelGroupshopContext.Provider value={{ gsctx, dispatch }}>
      {children}
    </ChannelGroupshopContext.Provider>
  );
};
