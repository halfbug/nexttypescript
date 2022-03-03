import * as React from 'react';
import { IGroupshop } from 'types/groupshop';
import { gsreducer, GroupshopActions } from './groupshop.reducer';

export interface GSContextType {
  gsctx: IGroupshop,
  dispatch: React.Dispatch<GroupshopActions>;
}

export const gsInit: IGroupshop = {
  members: [{
    orderDetail: { customer: '' }, orderId: '', availedDiscount: 0, role: 'referral',
  }],
  id: '',
  campaignId: '',
  storeId: '',
  totalProducts: 0,
  url: '',
  createdAt: new Date(),
  expiredAt: new Date(),
  discountCode: {
    title: '',
    percentage: '',
    priceRuleId: '',
  },
  milestones: [],
  store: { brandName: '', products: [] },
  cart: [],
  campaign: { salesTarget: { id: '', rewards: [] } },
};

export const GroupshopContext = React.createContext<GSContextType>(
  { gsctx: gsInit, dispatch: ():any => {} },
);

export const GroupshopContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [gsctx, dispatch] = React.useReducer(gsreducer, gsInit);

  return (
    <GroupshopContext.Provider value={{ gsctx, dispatch }}>
      {children}
    </GroupshopContext.Provider>
  );
};
