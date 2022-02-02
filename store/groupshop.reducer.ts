import { IGroupshop } from 'types/groupshop';

export type GroupshopActions = {
  type: 'UPDATE_GROUPSHOP' | 'UPDATE_PRODUCTS' | 'UPDATE_CART';
  payload: IGroupshop;
};

export const gsreducer = (
  state: IGroupshop,
  action: GroupshopActions,
): IGroupshop => {
  console.log(action);
  switch (action.type) {
    // eslint-disable-next-line no-sequences
    case 'UPDATE_GROUPSHOP':
    case 'UPDATE_PRODUCTS':
      console.log('Action payload', action.payload);
      return { ...state, ...action.payload };
    case 'UPDATE_CART':
      return { ...state, cart: action.payload.cart };
    default:
      return state;
  }
};
