/* eslint-disable no-undef */
import React from 'react';
import styles from 'styles/Groupshop.module.scss';
import { Button, Col, Row } from 'react-bootstrap';

const ShoppingBoxMobile = ({ shareurl, onClick }: { shareurl: string, onClick: any }) => (
  <>
    <div className={styles.groupshop_shopping_box_mobile}>
      {/* <ShareButton
          placement="auto"
          shareurl={shareurl}
          label="Share with friends"
          className="px-3 bg-white ms-2"
          onClick={() => googleEventCode('earn-cashback-modal')}
        /> */}
      <Button onClick={onClick} className="px-3 bg-white ms-2">Share and earn $X</Button>
      {/* <NativeShareButton
          label="How it Works"
          className="px-3 bg-white ms-2"
          shareurl={shareurl}
          onClick={onClick}
          // icon={<Send size={18} />}
        /> */}
    </div>
  </>
);
export default ShoppingBoxMobile;
