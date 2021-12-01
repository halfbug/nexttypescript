import { IStore } from 'types/store';

export type StoreAction = {
  type: 'UPDATE_STEP' | 'UPDATE_STORE' | 'NEW_CAMPAIGN' | 'UPDATE_TOTALPRODUCTS' | 'SET_COLLECTIONS' | 'SET_PRODUCTS' | 'UPDATE_STORE_SETTINGS';
  payload: IStore;
};

export const reducer = (
  state: IStore,
  action: StoreAction,
): IStore => {
  if (action.type === 'UPDATE_STEP') {
    return { ...state, installationStep: action.payload.installationStep };
  }

  if (action.type === 'UPDATE_STORE') {
    console.log(action.payload);
    return { ...state, ...action.payload };
  }

  if (action.type === 'UPDATE_STORE_SETTINGS') {
    console.log(action.payload);
    return { ...state, ...action.payload };
  }

  if (action.type === 'NEW_CAMPAIGN') {
    console.log(action.payload);
    return { ...state, newCampaign: { ...state.newCampaign, ...action.payload.newCampaign } };
  }

  if (action.type === 'UPDATE_TOTALPRODUCTS') { return { ...state, totalProducts: action.payload.totalProducts }; }

  if (action.type === 'SET_COLLECTIONS') { return { ...state, collections: action.payload.collections }; }

  if (action.type === 'SET_PRODUCTS') { return { ...state, products: action.payload.products }; }

  return state;
};
