import {
  useCallback, useContext, useState, useEffect,
} from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
import { StoreContext } from 'store/store.context';
import { allTierInfo, partnerTierInfo } from 'types/store';
import { useQuery } from '@apollo/client';
import { GET_PARTNER_INFO } from 'store/store.graphql';

export default function usePartner() {
  const { store } = useContext(StoreContext);
  const [partnerInfo, setPartnerInfo] = useState<partnerTierInfo | undefined>(undefined);
  const [tierSwitch, setTierSwitch] = useState<number[]>([]);
  const [allTier, setAllTier] = useState<allTierInfo[] | undefined>(undefined);
  const [currentTier, setcurrentTier] = useState<allTierInfo | undefined>(undefined);

  const currencySymbol = getSymbolFromCurrency(store?.currencyCode || 'USD');
  const {
    data, refetch,
  } = useQuery(GET_PARTNER_INFO, {
    variables: { storeId: store.id },
  });
  useEffect(() => {
    if (data?.getAllPartnerTiersInfo) {
      setPartnerInfo(data?.getAllPartnerTiersInfo);
      setTierSwitch(data?.getAllPartnerTiersInfo.switchCount);
      setAllTier(data?.getAllPartnerTiersInfo.allTiersInfo);
      console.log(typeof store.tier, store.tier, 'ct');
      const ct:allTierInfo[] = data?.getAllPartnerTiersInfo?.allTiersInfo.filter(
        (item: allTierInfo) => item.staticName === store.tier,
      );
      console.log('🚀 ~ file: usePartner.tsx:31 ~ useEffect ~ ct', ct);
      setcurrentTier(ct[0]);
    }
  }, [data]);
  useEffect(() => {
    refetch();
  }, []);

  return {
    currencySymbol,
    partnerInfo,
    tierSwitch,
    allTier,
    currentTier,
  };
}
