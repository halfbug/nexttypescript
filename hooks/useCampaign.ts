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
    // if (campaign === undefined) {
    setcampaign(getCampaign());
    setNewcampaign(getNewCampaign());
    console.log(store.campaigns);
    // }
  }, [store]);
  console.log({ campaign });
  console.log({ store });

  const getCampaign = useCallback(() => {
    let Incampaign;
    if (store?.campaigns) {
      const arr:any = store.campaigns.filter((item:any) => item.id === store.singleEditCampaignId);
      //   console.log({ arr });
      Incampaign = { ...arr[0] };
    }
    return Incampaign;
  }, [store.campaigns]);

  const getNewCampaign = useCallback(() => {
    let newCampaign={};
    if (store?.newCampaign) {
      newCampaign = store?.newCampaign;
      console.log({ newCampaign });
    }
    return newCampaign;
  }, [store.newCampaign]);

  return {
    getCampaign, campaign, getNewCampaign, newcampaign,
  };
}
