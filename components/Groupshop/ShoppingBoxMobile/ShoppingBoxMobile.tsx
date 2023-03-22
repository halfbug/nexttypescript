/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import styles from 'styles/Groupshop.module.scss';
import { Button, Col, Row } from 'react-bootstrap';
import NativeShareButton from 'components/Buttons/NativeShareButton/NativeShareButton';
import { Send } from 'react-bootstrap-icons';
import useTopBanner from 'hooks/useTopBanner';
import useAppContext from 'hooks/useAppContext';

const ShoppingBoxMobile = (
  {
    shareurl, val, brandName, maxPercent, label, isDrops,
  }: { shareurl: string,
    // onClick: any,
    val: undefined | string
    brandName?: string;
    maxPercent?: string | undefined;
    label?: string;
    isDrops?: boolean;
  },
) => {
  const { gsctx } = useAppContext();
  const { store } = gsctx;
  const milestone3 = store?.drops?.rewards?.maximum;
  return (
    <>
      <div className={styles.groupshop_shopping_box_mobile}>
        {/* <ShareButton
          placement="auto"
          shareurl={shareurl}
          fullshareurl=={shareurl}
          label="Share with friends"
          className="px-3 bg-white ms-2"
          onClick={() => googleEventCode('earn-cashback-modal')}
        /> */}
        <NativeShareButton
          label={val === '' ? `${label}` : `${label} $${val ?? '...'}`}
          className="px-3 py-2 ms-2"
          shareurl={shareurl}
        // onClick={onClick}
          icon={<Send size={18} />}
          text={isDrops
            ? `Shop on my Groupshop Drops and get up to ${milestone3}% off`
            : `Shop ${brandName} on my Microstore & get up to ${maxPercent} off`}
        />
      </div>
    </>
  );
};
ShoppingBoxMobile.defaultProps = {
  brandName: '',
  maxPercent: '',
  label: 'Share & earn',
  isDrops: false,
};

export default ShoppingBoxMobile;
