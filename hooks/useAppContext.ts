import { useCallback, useContext } from 'react';
import { useRouter } from 'next/router';
import { GroupshopContext } from 'store/groupshop.context';
import { PartnerGroupshopContext } from 'store/partner-groupshop.context';
import { ChannelGroupshopContext } from 'store/channel-groupshop.context';
import { DropGroupshopContext } from 'store/drop-groupshop.context';

export default function useAppContext() {
  const { pathname } = useRouter();
  const isGroupshop = !pathname.includes('/partner-deal/') && !pathname.includes('/ch/');
  const isChannel = pathname.includes('/ch/');
  const isDrops = pathname.includes('/drops/');

  if (isChannel) {
    const { gsctx, dispatch } = useContext(ChannelGroupshopContext);

    return {
      gsctx, dispatch, isGroupshop, isChannel, isDrops,
    };
  }
  if (isDrops) {
    const { gsctx, dispatch } = useContext(DropGroupshopContext);

    return {
      gsctx, dispatch, isGroupshop, isDrops,
    };
  }
  const { gsctx, dispatch } = useContext(pathname.includes('/partner-deal/') ? PartnerGroupshopContext : GroupshopContext);

  return {
    gsctx, dispatch, isGroupshop, isChannel, isDrops,
  };
}
