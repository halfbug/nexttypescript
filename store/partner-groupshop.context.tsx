import * as React from 'react';
import { IGroupshop } from 'types/groupshop';
import { gsreducer, GroupshopActions } from './groupshop.reducer';

export interface GSPContextType {
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
  storeId: '',
  totalProducts: 0,
  url: '',
  shortUrl: '',
  createdAt: new Date(),
  expiredAt: new Date(),
  discountCode: {
    title: '',
    percentage: '',
    priceRuleId: '',
  },
  milestones: [],
  store: { brandName: '', products: [], logoImage: '' },
  cart: [],
  campaign: {
    socialLinks: {
      facebook: '', instagram: '', tiktok: '', twitter: '',
    },
    salesTarget: { id: '', rewards: [] },
  },
  bestSeller: [],
  allProducts: [],
  partnerDetails: { fname: '', email: '' },
  partnerCommission: '',
  // dealProducts: [],
};

export const PartnerGroupshopContext = React.createContext<GSPContextType>(
  { gsctx: gspInit, dispatch: ():any => {} },
);

export const GroupshopPartnerContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [gsctx, dispatch] = React.useReducer(gsreducer, gspInit);
  console.log('🚀 ~ file: partner-groupshop.context.tsx ~ line 50 ~ gsctx', gsctx);

  return (
    <PartnerGroupshopContext.Provider value={{ gsctx, dispatch }}>
      {children}
    </PartnerGroupshopContext.Provider>
  );
};
