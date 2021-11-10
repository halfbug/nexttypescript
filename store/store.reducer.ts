import { IStore } from 'types/store';

export type StoreAction = {
  type: 'UPDATE_STEP' | 'UPDATE_STORE' ;
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

  return state;
};
