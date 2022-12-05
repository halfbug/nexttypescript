import {
  IProduct as Product, IStore as Store, ICampaign as Campaign, PartnerRewards,
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

export interface IGroupshop {
  id: string;

  campaignId: string;

  storeId: string;

  totalProducts: number;

  dealProducts?: DealProduct[];

  url: string;

  shortUrl?: string;

  createdAt: Date;

  expiredAt: Date;

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

  partnerCommission?: string;

  isActive?: boolean | undefined;

  memberDetails?: PartnerMember[];

  refferalProducts?: Product[];

  influencerProducts?: Product[];

  exipredShortLink?: string;

  ownerDeals?: Product[];

  refferalDealsProducts?: DealProduct[]; // customer of normal GS

  ownerDealsProducts?: DealProduct[]; // products of owner from OB popup

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
