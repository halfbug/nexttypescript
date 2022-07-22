import { useCallback, useContext } from 'react';
import { useRouter } from 'next/router';
import { GroupshopContext } from 'store/groupshop.context';
import { PartnerGroupshopContext } from 'store/partner-groupshop.context';

export default function useAppContext() {
  const { pathname } = useRouter();
  const isGroupshop = !pathname.includes('/partner-deal/');
  const { gsctx, dispatch } = useContext(pathname.includes('/partner-deal/') ? PartnerGroupshopContext : GroupshopContext);

  return { gsctx, dispatch, isGroupshop };
}
