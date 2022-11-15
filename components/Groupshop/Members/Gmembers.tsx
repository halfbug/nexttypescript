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
  shareUrl:string;
  currencySymbol : any;
}

const Gmembers = ({
  names, currencySymbol, discount, brandname, fullshareurl, shareUrl, pending,
}: GMembersProps) => {
  const [showRewardModel, setshowRewardModel] = useState(false);
  const [custName, setCustName] = useState('');
  const [pendingRewards, setpendingRewards] = useState(0);
  const [isOwner, setIsOwner] = useState(true);
  const { formatNumber } = useUtilityFunction();

  const handleClick = (member: any, index: any) => {
    setCustName(member.name);
    const orderPrice = +member.price;
    // eslint-disable-next-line max-len
    const refundAmount = (member?.refund) ? member.refund.reduce((a:any, b:any) => a + b.amount, 0) : 0;
    const maXRefund = ((orderPrice * (90)) / 100) - refundAmount;
    setpendingRewards(maXRefund);
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
        handleClose={() => setshowRewardModel(false)}
      />
    </>
  );
};

// Gmembers.defaultProps = {
//   user: {},
// };

export default Gmembers;
