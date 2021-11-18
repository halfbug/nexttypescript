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
  collections?: ICollection[];
  products?: IProduct[];
  [x:string]: any;
}
export interface ICampaign {
  name?: string;
  productSelectionCriteria?: string;
  joinExisting?:boolean;
  createCampaignInput?: object;
}

export interface ICollection{
  title:string;
  id: string;
  productsCount: number;
  products: IProduct[]
}

export interface IProduct{
  id: string,
  title: string;
  featuredImage: string;
  price: string;
  currencyCode: string;
}
