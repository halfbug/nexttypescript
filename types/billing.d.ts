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
export type partnerTierInfo = {
  count?: number;
  tierName?: string;
  tierCharges?: number;
  tierLimit?: string;
  currentTierName?: string;
  currentTierCharges?: number;
  currentTierLimit?: string;

}