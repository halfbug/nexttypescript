import React, { useState } from 'react';
import {
  Button, Placeholder, Popover, Overlay,
} from 'react-bootstrap';
import styles from 'styles/Groupshop.module.scss';
import CrossICon from 'assets/images/cross.svg';
import { useMediaQuery } from 'react-responsive';
import { RootProps } from 'types/store';
import useAppContext from 'hooks/useAppContext';
import useUtilityFunction from 'hooks/useUtilityFunction';
import AvailablePartnerRewardsBox from '../RewardBox/AvailablePartnerRewardsBox';

interface MembersProps extends RootProps{
  names : any[];
  cashback : string[];
  discount: string;
  fullshareurl:string;
  rewards:any;
  shareUrl:string;
  brandname:any;
  currencySymbol : any;
}

const Members = ({
  names, cashback, discount, fullshareurl, rewards, currencySymbol, shareUrl, brandname, pending,
}: MembersProps) => {
  const [show, setShow] = useState<any>({});
  const [target, setTarget] = useState(null);
  const [custName, setCustName] = useState('');
  const [showRewardModel, setshowRewardModel] = useState(false);
  const [pendingRewards, setpendingRewards] = useState(0);
  const [isOwner, setIsOwner] = useState(true);
  const { formatNumber } = useUtilityFunction();
  const {
    gsctx: groupshop,
    dispatch,
  } = useAppContext();
  const ownerFname = (groupshop?.members[0]?.orderDetail.customer.firstName) ? groupshop?.members[0]?.orderDetail.customer.firstName : '';
  const ownerLname = (groupshop?.members[0]?.orderDetail?.customer?.lastName) ? groupshop?.members[0]?.orderDetail?.customer?.lastName.substr(0, 1) : '';
  const ownerName = `${ownerFname} ${ownerLname}`;

  const countTotalPrice = (lineItems: any) => {
    let totalPrice = 0;
    // eslint-disable-next-line array-callback-return
    lineItems?.map((item: any) => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  };

  const handleClick = (member: any, index: any) => {
    setCustName(member.fname);
    const orderPrice = countTotalPrice(member.lineItems);
    setpendingRewards(((orderPrice * (parseInt(rewards.baseline, 10))) / 100));
    setshowRewardModel(true);
    if (index === 0) { setIsOwner(true); } else { setIsOwner(false); }
  };
  const handleClose = (event: any, state: string) => {
    setShow({ [state]: false });
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
              {member.fname === ownerName && '👑'}
              {' '}
              {member.fname}
            </Button>
            <Overlay
              rootClose
              show={show[`m-${idx}`] || false}
              target={target}
              placement={isLargeScreen ? 'bottom' : 'top'}
              onHide={() => setShow({ ...show, [`m-${idx}`]: false })}
            >
              <Popover id={`popover-positioned-${idx}`}>
                <Popover.Body>
                  <div
                    className={['d-flex justify-content-end mb-1 ',
                      styles.groupshop__popover_cross].join('')}
                  >
                    <CrossICon onClick={(e: any) => handleClose(e, `m-${idx}`)} />
                  </div>
                  <h4>
                    {member.fname}
                  </h4>
                  <p className="mb-2">
                    {idx === 0 ? '👑GROUPSHOP OWNER' : 'GROUPSHOP MEMBER'}
                    {' '}
                  </p>
                  {/* <p>
                  {cashback[idx]}
                  {' '}
                  in discounts and cashback.
                </p> */}
                </Popover.Body>
              </Popover>
            </Overlay>
          </div>
          {(idx + 1) % 10 === 0 && (
          <div className={styles.groupshop__member_line_break} />
          )}
        </>
      ))}

      <AvailablePartnerRewardsBox
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
        memberLength="1"
        handleClose={() => setshowRewardModel(false)}
      />
    </>
  );
};

// Members.defaultProps = {
//   user: {},
// };

export default Members;
