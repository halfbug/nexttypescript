/* eslint-disable no-undef */
import React from 'react';
import styles from 'styles/Groupshop.module.scss';
import {
  Col, Row,
} from 'react-bootstrap';
import ShareButton from 'components/Buttons/ShareButton/ShareButton';

const ShoppingBoxMobile = () => (
  <>
    <Row>
      <Col md={12}>
        <div className={['d-flex align-items-center', styles.groupshop_shopping_box_mobile].join(' ')}>
          <div className={['p-2 d-flex bg-white align-items-center', styles.groupshop_shopping_box_mobile_content].join(' ')} />
          <ShareButton
            placement="right-start"
            shareurl=""
            label=""
            className="px-2 rounded-pill bg-white ms-2"
          />
        </div>
      </Col>
    </Row>
  </>
);

export default ShoppingBoxMobile;
