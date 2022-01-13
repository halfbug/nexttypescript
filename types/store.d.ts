export interface IStore {
  show?: boolean;
  id?: string;
  shopifySessionId?: string;
  brandName?: string;
  shop?: string;
  accessToken?: string;
  installationStep?: number | null;
  logoImage?: string;
  industry?: string;
  newCampaign?: ICampaign;
  totalProducts?: number;
  collections?: ICollection[];
  products?: IProduct[];
  [x: string]: any;
  settings?: ISettings;
  campaigns?: ICampaign[];
}
export interface ICampaign {
  id?: string | null | undefined;
  name?: string;
  criteria?: string;
  joinExisting?: any;
  createCampaignInput?: object;
  updateCampaignInput?: object;
  productsArray?: string[];
  collections?: ICollection[];
  products?: IProduct[];
  rewards?: string;

}

export interface ICollection {
  title: string;
  id: string;
  productsCount: number;
  products: IProduct[]
}
export interface ILineItem{
price: string;
product : {
  id: string
}
}

export interface IProduct {
  id: string,
  title: string;
  featuredImage: string;
  price: string;
  currencyCode: string;
  // lineItems?: any;
  orders?: any;
}
export interface ISettings {
  brandColor: string;
  customColor: string;
  customBg: string;
  imageUrl: string;
  youtubeUrl: string;
}

export interface RootProps {
  pending?: Boolean;
}