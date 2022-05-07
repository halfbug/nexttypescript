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
  singleEditCampaignId?: string;
  plan?: any;
  // plan?: 'LAUNCH' | 'EXPLORE' | 'GROWTH' | 'UNICORN' | undefined;
  totalGroupShop?: number | undefined;
  currencyCode?: string;
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
  salesTarget?: ISalesTarget;
  settings?: ISettings;
  socialLinks?: ISocialLink;
  selectedTarget?: ISalesTarget;
  addableProductsArray?: string[];
  addableCollections?: ICollection[];
  addableProducts?: IProduct[];
  details?: any;

}
export interface ICampaignForm {
  settings?: any;
  id?: string | null | undefined;
  name?: string;
  criteria?: string;
  joinExisting?: any;
  products?: IProduct[];
  rewards?: string;
  selectedTarget?: any;
  brandColor?: string;
  customColor?: string;
  customBg?: string;
  imageUrl?: string;
  youtubeUrl?: string;
  media?: string;
  instagram?: string;
  pinterest?: string;
  tiktok?: string;
  twitter?: string;
  facebook?: string;
  isActive?: boolean;
  addableProducts?: IProduct[];
  maxDiscountVal?: string;
  minDiscountVal?: string;
  minDiscount?: number;
  maxDiscount?: number;
  isRewardEdit?: boolean;
  socialLinks?: ISocialLink;

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

export interface Ioption{
  id : string;
  name: string;
  position : number;
  values : string[];
}

export interface IProduct {
  outofstock?: boolean;
  id: string,
  title: string;
  featuredImage: string;
  price: string;
  currencyCode: string;
  description?: string;
  orders?: any;
  options?: Ioption[];
  images?: any[];
  variants?: any[];
  inventoryQuantity?: number;
  selectedOptions?: any;
  image?: any;
  purchaseCount?: number;
}
export interface ISettings {
  brandColor: string;
  customColor: string;
  customBg: string;
  imageUrl: string;
  youtubeUrl: string;
  media: string;
}

export interface RootProps {
  pending?: Boolean;
}

export interface ISalesTarget {
  id: string;
  name?: string;
  rogsMin?: string;
  rogsMax?: string;
  status?: string;
  rewards?: IRewards[];
  isActive?: boolean;
}
export interface IRewards {
  id: string;
  discount?: string;
  customerCount?: string;
}
export interface ISocialLink {
  instagram?: string;
  pinterest?: string;
  tiktok?: string;
  twitter?: string;
  facebook?: string;
}
export interface IBilling {
  nooforder: number;
}
