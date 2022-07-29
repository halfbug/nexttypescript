import {
  IProduct as Product, IStore as Store, ICampaign as Campaign, PartnerRewards,
} from './store';

export type DealProduct = {
  productId: string;

  type?: 'deal' | 'abandoned';

  addedBy: string;

  customerIP: string;

  isInfluencer?: boolean | undefined;
}
export type partnerDetails ={
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

  cart?: CartProduct[];

  bestSeller?: Product[];

  addedProducts?: DealProduct[];

  status?: string;

  // expectedCashBack?: number;
  obSettings?: ObSettings;

  partnerDetails?: partnerDetails;

  visitors?: number;

  partnerRewards?: PartnerRewards;

  partnerCommission?: string;

  memberDetails?: PartnerMember[];

  refferalProducts?: Product[];

  influencerProducts?: Product[];
}
export interface InfluencerGroupshop {
  partnerDetails?: partnerDetails | undefined;
}
export type IPGroupshop = IGroupshop & InfluencerGroupshop;
export type CustomPropsType = {
  [key: string]: any;
};
