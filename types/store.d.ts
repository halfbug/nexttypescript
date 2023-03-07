export interface Drops {
  status?: string;
  isVideoEnabled?: boolean;
  spotlightColletionId?: string;
  spotlightDiscount?: DiscountCode;
  latestCollectionId?: string;
  bestSellerCollectionId?: string;
  allProductsCollectionId?: string;
  rewards?: PartnerRewards;
  klaviyo?: Klaviyo;
}

export type Klaviyo = {
  publicKey: string;
  privateKey: string;
  listId: string;
  signup1: string;
  signup2: string;
  signup3: string;
  signup4: string;
}

export interface IStore {
  show?: boolean;
  id?: string;
  // shopifySessionId?: string;
  brandName?: string;
  shop?: string;
  // accessToken?: string;
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
  appTrialEnd?: Date | undefined;
  allInventoryProducts?: IProduct[];
  discoveryTool?: DiscoveryTools;
  tier?: any;
  drops?: Drops;
}
export interface ICampaign {
  isActive?: boolean;
  id?: string | null | undefined;
  name?: string;
  criteria?: string;
  joinExisting?: any;
  createCampaignInput?: object;
  updateCampaignInput?: object;
  productsArray?: string[];
  collectionsArray?: string[];
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
  collections?: ICollection[];
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
  socialLinks?: ISocialLink;

}

export type DiscountCode = {
  title: string;
  percentage: string;
  priceRuleId: string;
}

export type partnerDetails = {
  fname: string;
  lname: string;
  email: string;
  shopifyCustomerId?: string;
}

export type PartnerRewards = {
  baseline: number;
  average: number;
  maximum: number;
}

export type ChannelRewards = {
  baseline: string;
  average: string;
  maximum: string;
  commission: string;
}

export type DealProduct = {
  productId: string;
  type?: 'deal' | 'abandoned';
  addedBy: string;
  customerIP: string;
}

export interface IPartnerTools {
  updatePartnersInput?: object;
  email: string;
  minDiscount: any;
  maxDiscount: any;
  partnerCommission: any;
}

export type lCustomers = {
  email?: string;
  firstName?: string;
  lastName?: string;
}

export type listCustomers = {
  createDate?: string;
  haveGroupshop?: string;
  id?: string;
  name?: string;
  price?: string;
  shopifyCreateAt?: string;
  customer?: lCustomers;
}

export interface PastCustomerGroupshop {
  storeId: string;
  groupshopsCreated: string;
  startDate: string;
  endDate: string;
  minOrderValue: string;
}

export interface ICollection {
  title: string;
  id: string;
  productsCount: number;
  products: IProduct[]
}
export interface ILineItem {
  price: string;
  product: {
    id: string
  }
}

export interface Ioption {
  id: string;
  name: string;
  position: number;
  values: string[];
}

export interface IProduct {
  outofstock?: boolean;
  id: string,
  title: string;
  featuredImage: string;
  featuredVideo?: string;
  price: string;
  currencyCode?: string;
  description?: string;
  orders?: any;
  options?: Ioption[];
  images?: any[];
  variants?: any[];
  inventoryQuantity?: number;
  selectedOptions?: any;
  image?: any;
  purchaseCount?: number;
  secondaryCount?: number;
  status?: string;
}

export interface IGeneralSettings {
  brandColor?: string | undefined;
  customBg?: string | undefined;
  imageUrl?: string | undefined;
  youtubeUrl?: string | undefined;
  media?: string | undefined;
}

export interface ILayoutSettings {
  bannerProductPage?: number;
  bannerCartPage?: number;
  bannerStyle?: string;
  bannerDesign?: string;
  bannerCustomColor?: string;
  callToActionText?: string;
  bannerSummaryPage?: string;
}

export interface IMarketingSettings {
  recoverAbandoned?: number;
  WhatsAppnotifications?: number;
  facebookPixels?: string;
  tiktokPixels?: string;
  googlePixels?: string;
  snapchatPixels?: string;
}
export interface ISettings {
  general?: IGeneralSettings;
  layout?: ILayoutSettings;
  marketing?: IMarketingSettings;
  brandColor?: string;
  customBg?: string;
  imageUrl?: string;
  youtubeUrl?: string;
  media?: string;
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
  instagram?: string | undefined;
  pinterest?: string | undefined;
  tiktok?: string | undefined;
  twitter?: string | undefined;
  facebook?: string | undefined;
}
export interface IBilling {
  nooforder: number;
}

export interface IRetailTools {
  updateChannelInput?: object;
  channelname: string;
  slugName: string;
  minDiscount: any;
  maxDiscount: any;
  commission: any;
}
export interface DiscoveryTools {
  status?: string,
  matchingBrandName?: MatchingBrandName[],
}

export interface MatchingBrandName {
  id?: string,
  brandName?: string,
}

export type IUser = { firstName: string; lastName: string; }

export type partnerTierInfo = {
  count?: number;
  tierName?: any;
  tierCharges?: number;
  tierLimit?: string;
  currentTierName?: string;
  currentTierCharges?: number;
  currentTierLimit?: string;
  switchCount?: number[];
  allTiersInfo?: allTierInfo[];

}
export type allTierInfo = {
  index?: number;
  name?: any;
  fee?: number;
  limit?: string;
  switchStartCount?: number;
  staticName?: string;
}