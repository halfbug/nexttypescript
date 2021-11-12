export interface IStore {
  shopifySessionId?: string;
  brandName?: string;
  shop?: string;
  accessToken?: string;
  installationStep?: number;
  logoImage?: string;
  industry?: string;
  newCampaign?: ICampaign;
}

export interface ICampaign {
  campaignName?: string;
  productSelectionCriteria?: string;
  joinExisting?:boolean;
}
