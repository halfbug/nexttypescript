import { IProduct as Product, IStore as Store, ICampaign as Campaign } from './store';

export type DealProduct ={
  productId: string;

  type?: 'deal' | 'abandoned';

  addedBy: string;

  customerIP: string;
}

export type DiscountCode ={
  title: string;

  percentage: string;

  priceRuleId: string;
}

export type Refund ={
  status: 'done' | 'panding';

  createdAt: Date;

  discount: number;

  amount: number;
}

export type Milestone ={
  activatedAt: Date;

  discount: string;
}

export type Member ={
  orderId: string;

  availedDiscount: number;

  role: 'owner' | 'referral';

  refund?: Refund[];

  products?: Product[];

  orderDetail?: any;

  lineItems?: any;

}

export type CartProduct = Product & {
 selectedVariant: Product & { selectedQuantity : number};
//  selectedQuantity: number;
};

export interface IGroupshop {
  id: string;

  campaignId: string;

  storeId: string;

  totalProducts: number;

  dealProducts?: DealProduct[];

  url: string;

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

}
