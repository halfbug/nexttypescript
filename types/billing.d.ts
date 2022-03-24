export type BillingIDType ={
  year: number;
  month: number;
}
export type BillingType ={
    _id: BillingIDType;

    count: number;

    totalCashBack: number;

    revenue: number;

    amount: number;
  }
