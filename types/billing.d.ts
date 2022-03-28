export type BillingIDType ={
  year: number;
  month: number;
}
export type BillingType ={
    _id: BillingIDType;

    count: number;

    cashBack: number;

    revenue: number;

    feeCharges: number;
  }
export type MonthlyGSType ={
    _id: BillingIDType;

    count: number;

  }
