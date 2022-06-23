/* eslint-disable no-undef */
import React from 'react';
import styles from 'styles/Groupshop.module.scss';
import { Button, Col, Row } from 'react-bootstrap';
import NativeShareButton from 'components/Buttons/NativeShareButton/NativeShareButton';
import { Send } from 'react-bootstrap-icons';

const ShoppingBoxMobile = (
  { shareurl, val }: { shareurl: string,
    // onClick: any,
    val: string | undefined
  },
) => (
  <>
    <div className={styles.groupshop_shopping_box_mobile}>
      {/* <ShareButton
          placement="auto"
          shareurl={shareurl}
          label="Share with friends"
          className="px-3 bg-white ms-2"
          onClick={() => googleEventCode('earn-cashback-modal')}
        /> */}
      <NativeShareButton
        label={`Share and earn ${val}`}
        className="px-3 bg-white ms-2"
        shareurl={shareurl}
        // onClick={onClick}
        icon={<Send size={18} />}
      />
    </div>
  </>
);
export default ShoppingBoxMobile;
