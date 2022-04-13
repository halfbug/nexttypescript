/* eslint-disable jsx-quotes */
import * as React from 'react';
import styles from 'styles/Billing.module.scss';
import {
  Row, Col,
} from 'react-bootstrap';
import Bulb from 'assets/images/bulb.svg';

export default function BulbInfo() {
  return (
    <div className={styles.billing}>
      <Row className={styles.billing_bulbinfo_box_4}>
        <Col lg={5} className={styles.billing_bulbinfo}>
          <p>
            <span className='pt-1'><Bulb size={16} /></span>
            You’re currently averaging 1,280 Groupshops per month
          </p>
        </Col>
      </Row>
    </div>
  );
}
