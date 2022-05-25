/* eslint-disable no-undef */
import React from 'react';
import styles from 'styles/Groupshop.module.scss';
import {
  Col, Row,
} from 'react-bootstrap';
import ShareButton from 'components/Buttons/ShareButton/ShareButton';

const ShoppingBoxMobile = () => (
  <>

    <div className={styles.groupshop_shopping_box_mobile}>
      <ShareButton
        placement="right-start"
        shareurl=""
        label=""
        className="px-2 rounded-pill bg-white ms-2"
      />
    </div>

  </>
);

export default ShoppingBoxMobile;
