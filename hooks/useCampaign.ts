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
  // console.log('🚀 ~ file: useCampaign.ts ~ line 12 ~ useCampaign ~ store', store);
  useEffect(() => {
    setcampaign(getCampaign());
    setNewcampaign(getNewCampaign());
  }, [store]);
  // console.log({ campaign });

  // useEffect(() => {
  // console.log('🚀 ~ file: useCampaign.ts ~ line 22 ~ useCampaign ~ store', store);
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
  }, [store]);

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

  const updateCampaign = useCallback((id, field, value) => {
    // console.log('//////////////////////////');
    // console.log({ id });
    // console.log({ field });
    // console.log({ value });
    let updatedCampaigns: ICampaign[] = [];
    if (store?.campaigns) {
      updatedCampaigns = store?.campaigns?.map((item:any) => {
        const newItem = { ...item };
        if (newItem.id === id) {
          // eslint-disable-next-line no-param-reassign
          newItem[field] = value;
          setcampaign(newItem);
          // getCampaign();
          return newItem;
        }
        return newItem;
      });
      // dispatch({ type: 'UPDATE_CAMPAIGN', payload: { campaigns: updatedCampaigns } });
    }
    return updatedCampaigns;
  }, []);

  const deleteProductCollections = useCallback((id) => {
    let updatedCampaigns: ICampaign[] = [];
    if (store?.campaigns) {
      updatedCampaigns = store?.campaigns?.map((item:any) => {
        const newItem = { ...item };
        if (newItem.id === id) {
          // eslint-disable-next-line no-param-reassign
          newItem.products = [];
          newItem.collections = [];
          setcampaign(newItem);
          // getCampaign();
          return newItem;
        }
        return newItem;
      });
    }
    return updatedCampaigns;
  }, [store]);

  const setValue = (field: string, value: string | number) => {
    dispatch({ type: 'NEW_CAMPAIGN', payload: { newCampaign: { [field]: value } } });
  };
  const updateStoreForEditCampaignId = (campaignid: any) => {
    dispatch({ type: 'SINGLE_CAMPAIGN', payload: { singleEditCampaignId: campaignid } });
  };

  return {
    getCampaign,
    campaign,
    getNewCampaign,
    newcampaign,
    clearNewCampaign,
    updateSelectedCampaignProducts,
    updateSelectedCampaignAddProducts,
    updateCampaign,
    deleteProductCollections,
    setValue,
    updateStoreForEditCampaignId,
  };
}
