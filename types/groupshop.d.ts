import {
  IProduct as Product, IStore as Store, ICampaign as Campaign, PartnerRewards,
  ChannelRewards, IProduct,
} from './store';

export type DealProduct = {
  productId: string;

  type?: 'deal' | 'owner' | 'abandoned' | 'first';

  addedBy: string;

  customerIP: string;

  isInfluencer?: boolean | undefined;
}
export type partnerDetails ={
  shopifyCustomerId?: string | null;
  fname: string;

  lname?: string;

  email: string;
}

export type DiscountCode = {
  title: string;

  percentage: string;

  priceRuleId: string;
}

export type Refund = {
  status: 'done' | 'panding';

  createdAt: Date;

  discount: number;

  amount: number;
}

export type Milestone = {
  activatedAt: Date;

  discount: string;
}
export class CustomerInfo {
  // 'customer_id': string;
  fullName?: string;

  firstName: string;

  lastName: string;

  email: string;

  ip?: string;

  phone: string;

  // 'sms_marketing': string;
}

export type PartnerMember ={
  orderId: string;

  orderDetail?: any;

  lineItems?: any;

  comissionAmount?: number;

  orderAmount?: number;

  isRedeem?: boolean;

  customerInfo?: CustomerInfo;

}
export type Member ={
  orderId: string;

  availedDiscount?: number;

  role?: 'owner' | 'referral';

  refund?: Refund[];

  products?: Product[];

  orderDetail?: any;

  lineItems?: any;

  comissionAmount?: number;

  orderAmount?: number;

  isRedeem?: boolean;

  customerInfo?: CustomerInfo;

}

export type CartProduct = Product & {
  selectedVariant: Product & { selectedQuantity: number };
  //  selectedQuantity: number;
};

export type ObSettings = {
  ownerUrl?: string;
  allowEmails?: boolean;
  allowTexts?: boolean;
  mobileNumber?: number;
  email?: string;
  shopHeader?: string;
  instagramLink?: string;
  pinteresrLink?: string;
  tiktokLink?: string;
  twitterLink?: string;
  themeBanner?: string;
  products?: string[];
  step?: number;
}

export type sections = {
  id?: string;
  name: string;
  shopifyId: string;
  type: string;
  products: Product[];
  mergedIds: string[];
  pageInfo: any;
}

export type forYouSections = {
  name: string;
  sections: sections[];
}

export type Collections = {
  shopifyId: string;
  name: string;
  type: string;
  sortOrder: number;
}

export type subCategories = {
  categoryId: string;
  collections: string;
  sortOrder: number;
  title: string;
  sections?: sections[] | undefined;
}

export type Categories = {
  categoryId: string;
  collections: Collections[];
  parentId: string;
  sortOrder: number;
  subCategories: subCategories[];
  title: string;
  sections?: sections[] | undefined;
}

export interface IGroupshop {
  id: string;

  channelId?: string;

  customerDetail?: CustomerInfo;

  consumerCommmission?: string;

  campaignId: string;

  storeId: string;

  totalProducts: number;

  dealProducts?: DealProduct[];

  url: string;

  shortUrl?: string;

  createdAt: Date;

  expiredAt: any;

  discountCode: DiscountCode;

  members: Member[];

  milestones: Milestone[];

  store?: Store;

  popularProducts?: Product[];

  campaign?: Campaign;

  allProducts?: Product[];

  cart?: CartProduct[] | undefined ;

  bestSeller?: Product[];

  addedProducts?: DealProduct[];

  status?: string;

  // expectedCashBack?: number;
  obSettings?: ObSettings;

  partnerDetails?: partnerDetails | null;

  visitors?: number;

  partnerRewards?: PartnerRewards;

  channelRewards?: ChannelRewards;

  partnerCommission?: string;

  isActive?: boolean | undefined;

  memberDetails?: PartnerMember[];

  refferalProducts?: Product[];

  influencerProducts?: Product[];

  ownerProducts?: Product[];

  exipredShortLink?: string;

  expiredShortLink?: string;

  expiredShortUrl?: string;

  ownerDeals?: Product[];

  refferalDealsProducts?: DealProduct[]; // customer of normal GS

  ownerDealsProducts?: DealProduct[]; // products of owner from OB popup

  // FOR DROPS GS
  latestProducts?: Product[];

  spotlightProducts?: Product[];

  bestSellerProducts?: Product[];

  skincareProducts?: Product[],

  runningOutProducts?: Product[],

  hairProducts?: Product[],

  isDrops?: boolean;

  revisedCount?: number;

  sections?: sections[];

  firstCategory?: subCategories;

  selectedCategory?: string;

  categories?: Categories[];

  cartSuggested?: Product[];

  loading?: boolean;

  favorite?: Product[];

  forYouSections?: forYouSections[];

}
export interface InfluencerGroupshop {
  partnerDetails?: partnerDetails | undefined;
}
export type IPGroupshop = IGroupshop & InfluencerGroupshop;
export type CustomPropsType = {
  [key: string]: any;
};

export type MatchingGS = {
  id: string;
  members: Member[];
  numMembers?: number;
  campaignId: string;
  storeId: string;
  totalProducts: number;
  dealProducts?: DealProduct[];
  url: string;
  shortUrl?: string;
  exipredShortLink?: string;
  createdAt: Date;
  expiredAt: Date;
  discountCode?: DiscountCode;
  milestones: Milestone[];
  store?: Store;
  popularProducts?: Product[];
  campaign?: Campaign;
  allProducts?: Product[];
  bestSeller?: Product[];
  obSettings?: ObSettings;
  ownerDeals?: Product[];
  reffDeals?: Product[];
  ownerDealsProducts?: DealProduct[];
  refferalDealsProducts?: DealProduct[];
};
