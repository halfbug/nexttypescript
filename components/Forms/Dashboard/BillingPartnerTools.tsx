/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-quotes */
import * as React from 'react';
import styles from 'styles/Billing.module.scss';
import { Row, Col } from 'react-bootstrap';
import WhiteButton from 'components/Buttons/WhiteButton/WhiteButton';

export default function BillingPartnerTools() {
  return (
    <Row className={styles.billing__partnerTools}>
      <Col lg={12}>
        <div className={styles.billing__partnerTools__header}>
          <h3>Partner Tools</h3>
        </div>
        <Row>
          <Col lg={6} className={styles.billing__partnerTools__activeBox}>
            <div className={styles.billing__partnerTools__activeBox__leftBox}>
              <div className={styles.billing__partnerTools__activeBox__amount}>
                $50/mo
              </div>
              <div className={styles.billing__partnerTools__activeBox__partner}>
                up to 5 active partners
              </div>
              <p className={styles.billing__partnerTools__activeBox__free}>
                First 3 partners are free.
              </p>
            </div>
            <div className={styles.billing__partnerTools__activeBox__rightBox}>
              <div className={styles.billing__partnerTools__activeBox__activePartner}>
                You currently have
                {' '}
                <span>4 active</span>
                {' '}
                partners.
              </div>
              <div>
                <WhiteButton>
                  Manage Partners
                </WhiteButton>
              </div>
            </div>
          </Col>
          <Col lg={4} className={styles.billing__partnerTools__tierBox}>
            <h4>
              Next Tier
            </h4>
            <div className={styles.billing__partnerTools__tierBox__amount}>
              $100/mo
            </div>
            <div className={styles.billing__partnerTools__tierBox__upto}>
              Up to 10 partners
            </div>
          </Col>
          <Col lg={2} />
        </Row>
      </Col>
    </Row>

  );
}
