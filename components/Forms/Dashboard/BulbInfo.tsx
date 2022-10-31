/* eslint-disable jsx-quotes */
import * as React from 'react';
import styles from 'styles/Billing.module.scss';
import {
  Row, Col,
} from 'react-bootstrap';
import Bulb from 'assets/images/bulb.svg';
import useBilling from 'hooks/useBilling';

export default function BulbInfo() {
  const { averageNoOfGS } = useBilling();

  return (
    <div className={styles.billing}>
      <Row className={styles.billing_bulbinfo_box_4}>
        <Col lg={5} className={styles.billing_bulbinfo}>
          <p>
            <span className={styles.billing_bulbinfo_bulbh}><Bulb size={16} /></span>
            You’re currently averaging
            {' '}
            {averageNoOfGS()}
            {' '}
            Groupshops per month
          </p>
        </Col>
      </Row>
    </div>
  );
}
