import { IGroupshop } from 'types/groupshop';

export type GroupshopActions = {
  type: 'UPDATE_GROUPSHOP' | 'UPDATE_PRODUCTS';
  payload: IGroupshop;
};

export const gsreducer = (
  state: IGroupshop,
  action: GroupshopActions,
): IGroupshop => {
  console.log(action);
  switch (action.type) {
    case 'UPDATE_GROUPSHOP':
      console.log('Action payload', action.payload);
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
