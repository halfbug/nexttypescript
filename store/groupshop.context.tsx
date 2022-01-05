import * as React from 'react';
import { IGroupshop } from 'types/groupshop';
import { gsreducer, GroupshopActions } from './groupshop.reducer';

interface GSContextType {
  groupshop: IGroupshop,
  dispatch: React.Dispatch<GroupshopActions>;
}

const initialState: IGroupshop = {
  members: [],
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
};

export const GroupshopContext = React.createContext<GSContextType>(
  { groupshop: initialState, dispatch: ():any => {} },
);

export const GroupshopContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [groupshop, dispatch] = React.useReducer(gsreducer, initialState);

  return (
    <GroupshopContext.Provider value={{ groupshop, dispatch }}>
      {children}
    </GroupshopContext.Provider>
  );
};
