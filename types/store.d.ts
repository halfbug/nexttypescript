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
  settings?: ISettings;
}
export interface ICampaign {
  id?: string | null | undefined;
  name?: string;
  criteria?: string;
  joinExisting?: any;
  createCampaignInput?: object;
  productsArray?:string[];
  collections?: ICollection[];
  products?: IProduct[];
  rewards?: string;

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
export interface ISettings{
  brandColor: string;
  customColor: string;
  customBg: string;
  imageUrl: string;
  youtubeUrl: string;
}
