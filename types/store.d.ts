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
  totalProducts?: number;
  collections?: ICollections[];
  // updateStoreInput?: object;
}
export interface ICampaign {
  campaignName?: string;
  productSelectionCriteria?: string;
  joinExisting?:boolean;
}

export interface ICollections{
  title:string;
  id: string;
  productsCount: number;
  products: IProducts[]
}

export interface IProducts{
  id: string,
  title: string;
  featuredImage: string;
}
