import { useContext, useEffect, useState } from 'react';
import { GroupshopContext } from 'store/groupshop.context';
import { Member } from 'types/groupshop';
import useDeal from './useDeal';

const useTopBanner = () => {
  const [cashBackText, setCashBackText] = useState('');
  const [text, setText] = useState('');
  const [cashbackVal, setCashBackVal] = useState<undefined | string>(undefined);
  const { unLockCB, currencySymbol } = useDeal();
  const { gsctx, dispatch } = useContext(GroupshopContext);
  const {
    members, discountCode: { percentage }, milestones,
  } = gsctx;
  useEffect(() => {
    if (percentage) setCashBackVal(unLockCB(percentage, milestones, members).toFixed(2).toString().replace('.00', ''));
    else setCashBackVal('...');
  }, [gsctx]);

  useEffect(() => {
    // if (percentage) setCashBackVal(unLockCB(percentage, milestones, members));
    if (members) {
      if (members.length === 1 || members.length === 3) {
        setText('For the next two shoppers only');
        setCashBackText(`Plus unlock ${currencySymbol}${cashbackVal} cashback for`);
      } else if (members.length === 2 || members.length === 4) {
        setText('For the next shopper only');
        setCashBackText(`Plus unlock ${currencySymbol}${cashbackVal} cashback for`);
      } else if (members.length >= 5) {
        setText('all orders');
        setCashBackText(`This group has unlocked over ${currencySymbol}${cashbackVal} in discounts and cashback. `);
      }
    }
  }, [gsctx, cashbackVal]);

  return {
    text, setText, cashBackText, cashbackVal,
  };
};
export default useTopBanner;
