export interface IStore {
  id?: string;
  shopifySessionId?: string;
  brandName?: string;
  shop?: string;
  accessToken?: string;
  installationStep?: number;
  logoImage?: string;
  industry?: string;
  newCampaign?: ICampaign;
  updateStoreInput?: object;
}
export interface ICampaign {
  campaignName?: string;
  productSelectionCriteria?: string;
  joinExisting?:boolean;
}
