import * as React from 'react';
import { IStore } from 'types/store';
import { reducer, StoreAction } from './store.reducer';

interface StoreContextType {
  store: IStore,
  dispatch: React.Dispatch<StoreAction>;
}

const initialState: IStore = {
  show: true,
  shopifySessionId: '',
  brandName: '',
  shop: '',
  accessToken: '',
  installationStep: 0,
  logoImage: '',
  industry: '',
  newCampaign: { products: [], collections: [], productsArray: [] },
};

export const StoreContext = React.createContext<StoreContextType>(
  initialState as StoreContextType,
);

export const StoreContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [store, dispatch] = React.useReducer(reducer, {
    show: false,
    shopifySessionId: '',
    brandName: '',
    shop: '',
    accessToken: '',
    installationStep: 0,
    logoImage: '',
    industry: '',
  });

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
