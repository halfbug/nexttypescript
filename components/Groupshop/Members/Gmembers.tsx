import React, { useState } from 'react';
import {
  Button, Placeholder, Popover, Overlay,
} from 'react-bootstrap';
import styles from 'styles/Groupshop.module.scss';
import CrossICon from 'assets/images/cross.svg';
import { useMediaQuery } from 'react-responsive';
import { RootProps } from 'types/store';
import useUtilityFunction from 'hooks/useUtilityFunction';
import AvailableRewardsBox from '../RewardBox/AvailableRewardsBox';

interface GMembersProps extends RootProps{
  names : any[];
  discount: string;
  brandname:any;
  fullshareurl:string;
  memberLength: any;
  shareUrl:string;
  rewards: any;
  currencySymbol : any;
}

const Gmembers = ({
  names, currencySymbol, discount, brandname, memberLength, fullshareurl,
  shareUrl, rewards, pending,
}: GMembersProps) => {
  const [showRewardModel, setshowRewardModel] = useState(false);
  const [custName, setCustName] = useState('');
  const [pendingRewards, setpendingRewards] = useState(0);
  const [isOwner, setIsOwner] = useState(true);
  const { formatNumber } = useUtilityFunction();

  const milestoneCalc = (dis:any) => {
    const availDiscount = parseInt(dis, 10);
    const maxDiscount = parseInt(rewards[2].discount, 10);
    return maxDiscount - availDiscount;
  };

  const countTotalPrice = (lineItems: any) => {
    let totalPrice = 0;
    // eslint-disable-next-line array-callback-return
    lineItems?.map((item: any) => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  };

  const handleClick = (member: any, index: any) => {
    let maxRefund = 0;
    setCustName(member.name);
    const mileCalc = milestoneCalc(member?.availedDiscount ?? 0);
    const orderPrice = countTotalPrice(member.lineItems);
    const discountPercentage = (index === 0) ? 90 : mileCalc;
    // eslint-disable-next-line max-len
    const refundAmount = (member?.refund) ? member.refund.reduce((a:any, b:any) => a + b.amount, 0) : 0;
    if ((memberLength <= 9 && index === 0) || (memberLength <= 5)) {
      maxRefund = ((orderPrice * (discountPercentage)) / 100) - refundAmount;
    } else if (index === 5) {
      maxRefund = ((orderPrice * (parseInt(rewards[2].discount, 10))) / 100);
    } else if (index > 5) {
      maxRefund = ((orderPrice * (parseInt(rewards[0].discount, 10))) / 100);
    } else {
      maxRefund = refundAmount;
    }
    setpendingRewards(maxRefund);
    if (index === 0) { setIsOwner(true); } else { setIsOwner(false); }
    setshowRewardModel(true);
  };

  const handleClose = (event: any, state: string) => {
    setshowRewardModel(false);
  };

  const handlesetShow = () => {
    setshowRewardModel(false);
  };

  const isLargeScreen = useMediaQuery({
    query: '(min-width: 476px)',
  });

  if (pending) {
    return (
      <>
        <Placeholder.Button as="p" className="border-0 m-1 placeholder-glow bg-light" />
        <Placeholder.Button as="p" className="border-0 m-1 placeholder-glow bg-light" />
      </>
    );
  }
  return (
    <>

      {names?.map((member, idx) => (
        <>
          <div>
            <Button onClick={(e) => handleClick(member, idx)} variant="light" className={styles.groupshop__top_item}>
              {idx === 0 && '👑'}
              {' '}
              {member.name}
            </Button>
          </div>
          {(idx + 1) % 10 === 0 && (
          <div className={styles.groupshop__member_line_break} />
          )}
        </>
      ))}
      <AvailableRewardsBox
        show={showRewardModel}
        name={custName}
        discount={discount}
        brandname={brandname}
        fullshareurl={fullshareurl}
        shareUrl={shareUrl}
        owner={isOwner}
        handlesetShow={handlesetShow}
        currencySymbol={currencySymbol}
        reward={formatNumber(pendingRewards)}
        memberLength={memberLength}
        handleClose={() => setshowRewardModel(false)}
      />
    </>
  );
};

// Gmembers.defaultProps = {
//   user: {},
// };

export default Gmembers;
