import { useContext, useEffect, useState } from 'react';
import { GroupshopContext } from 'store/groupshop.context';
import { Member } from 'types/groupshop';
import useDeal from './useDeal';

const useTopBanner = () => {
  const [cashBackText, setCashBackText] = useState('');
  const [text, setText] = useState('');
  const [cashbackVal, setCashBackVal] = useState<number | undefined | string>('...');
  const { unLockCB } = useDeal();
  const { gsctx, dispatch } = useContext(GroupshopContext);
  const {
    members, discountCode: { percentage }, milestones,
  } = gsctx;
  useEffect(() => {
    if (percentage) setCashBackVal(unLockCB(percentage, milestones, members));
  }, [gsctx]);

  useEffect(() => {
    // if (percentage) setCashBackVal(unLockCB(percentage, milestones, members));
    if (members) {
      if (members.length === 1 || members.length === 3) {
        setText('For the next two shoppers only');
        setCashBackText(`Plus unlock $${cashbackVal} cashback for`);
      } else if (members.length === 2 || members.length === 4) {
        setText('For the next one shopper only');
        setCashBackText(`Plus unlock $${cashbackVal} cashback for`);
      } else if (members.length >= 5) {
        setText('all orders');
        setCashBackText(`This group has unlocked over $${cashbackVal} in discounts and cashback. `);
      }
    }
  }, [gsctx, cashbackVal]);

  return {
    text, setText, cashBackText,
  };
};
export default useTopBanner;
