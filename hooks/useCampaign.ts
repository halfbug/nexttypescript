import {
  useCallback, useContext, useState, useEffect,
} from 'react';
import { StoreContext } from 'store/store.context';
import { ICampaign } from 'types/store';

export default function useCampaign() {
  const {
    store,
    dispatch,
  } = useContext(StoreContext);
  const [campaign, setcampaign] = useState<ICampaign | undefined>(undefined);
  const [newcampaign, setNewcampaign] = useState<ICampaign | undefined>(undefined);

  useEffect(() => {
    setcampaign(getCampaign());
    setNewcampaign(getNewCampaign());
  }, [store]);
  // console.log({ campaign });
  // console.log({ store });
  // useEffect(() => {
  //   setcampaign(getCampaign());
  // }, [store.singleEditCampaignId]);

  const getCampaign = useCallback(() => {
    let Incampaign;
    if (store?.campaigns && store.singleEditCampaignId) {
      const arr:any = store.campaigns.filter((item:any) => item.id === store.singleEditCampaignId);
      //   console.log({ arr });
      Incampaign = { ...arr[0] };
    }
    return Incampaign;
  }, [store.singleEditCampaignId]);

  const getNewCampaign = useCallback(() => {
    let newCampaign = {};
    if (store?.newCampaign) {
      newCampaign = store?.newCampaign;
    }
    return newCampaign;
  }, [store.newCampaign]);

  const clearNewCampaign = useCallback(() => {
    dispatch({
      type: 'UPDATE_STORE',
      payload: {
        singleEditCampaignId: '',
        newCampaign: {
          products: [],
          collections: [],
          productsArray: [],
          addableProductsArray: [],
          addableCollections: [],
          addableProducts: [],
          criteria: '',
          // productsArray: [],
        },
      },
    });
  }, []);

  const updateSelectedCampaignProducts = useCallback((id, prod) => {
    if (store?.campaigns) {
      const updatedCampaigns = store?.campaigns?.map((item:any) => {
        if (item.id === id) {
          // eslint-disable-next-line no-param-reassign
          item.products = prod.map((pro:any) => pro.id);
          return item;
        }
        return item;
      });
      dispatch({ type: 'UPDATE_CAMPAIGN', payload: { campaigns: updatedCampaigns } });
    }
  }, []);

  const updateSelectedCampaignAddProducts = useCallback((id, prod) => {
    const updatedCampaigns = store?.campaigns?.map((item:any) => {
      if (item.id === id) {
        // eslint-disable-next-line no-param-reassign
        item.addableProducts = prod.map((pro:any) => pro.id);
        return item;
      }
      return item;
    });
    dispatch({ type: 'UPDATE_CAMPAIGN', payload: { campaigns: updatedCampaigns } });
  }, []);

  return {
    getCampaign,
    campaign,
    getNewCampaign,
    newcampaign,
    clearNewCampaign,
    updateSelectedCampaignProducts,
    updateSelectedCampaignAddProducts,
  };
}
