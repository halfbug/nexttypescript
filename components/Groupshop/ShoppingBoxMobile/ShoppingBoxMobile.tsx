/* eslint-disable no-undef */
import React from 'react';
import styles from 'styles/Groupshop.module.scss';
import {
  Col, Row,
} from 'react-bootstrap';
import ShareButton from 'components/Buttons/ShareButton/ShareButton';
import useGtm from 'hooks/useGtm';
import NativeShareButton from 'components/Buttons/NativeShareButton/NativeShareButton';
import { Send } from 'react-bootstrap-icons';

const ShoppingBoxMobile = ({ shareurl }: { shareurl: string }) => {
  const { googleEventCode, googleButtonCode } = useGtm();

  return (
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
          label="Share with friends"
          className="px-3 bg-white ms-2"
          shareurl={shareurl}
          icon={<Send size={18} />}
        />

      </div>

    </>
  );
};

export default ShoppingBoxMobile;
