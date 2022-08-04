/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import styles from 'styles/Groupshop.module.scss';
import { Button, Col, Row } from 'react-bootstrap';
import NativeShareButton from 'components/Buttons/NativeShareButton/NativeShareButton';
import { Send } from 'react-bootstrap-icons';
import useTopBanner from 'hooks/useTopBanner';

const ShoppingBoxMobile = (
  {
    shareurl, val, brandName, maxPercent,
  }: { shareurl: string,
    // onClick: any,
    val: undefined | string
    brandName?: string;
    maxPercent?: string | undefined;
  },
) => (
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
        label={`Share & earn $${val ?? '...'}`}
        className="px-3 py-2 ms-2"
        shareurl={shareurl}
        // onClick={onClick}
        icon={<Send size={18} />}
        text={`Shop ${brandName} on my Groupshop & get up to ${maxPercent} off`}
      />
    </div>
  </>
);
ShoppingBoxMobile.defaultProps = {
  brandName: '',
  maxPercent: '',
};

export default ShoppingBoxMobile;
