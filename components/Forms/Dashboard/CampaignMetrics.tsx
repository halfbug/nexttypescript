/* eslint-disable jsx-quotes */
import * as React from 'react';
import styles from 'styles/Overview.module.scss';
import SummaryBox from 'components/Shared/SummaryBox/SummaryBox';

// import images
import ProductLogo from 'assets/images/viral-product-icon.svg';
import { Col, Row } from 'react-bootstrap';

export default function CampaignMetrics() {
  return (
    <div className={styles.metrics}>
      <div className={styles.metrics__header}>
        <h3>Campaign Metrics</h3>
      </div>
      <div className={styles.metrics__box}>
        <Row>
          <Col lg={4}>
            <SummaryBox label="Total Revenue " value="$2,300" iconType="RevenueIcon" />
          </Col>
          <Col lg={4}>
            <SummaryBox label="Number of Purchases" value="432" iconType="PurchaseIcon" />
          </Col>
          <Col lg={4}>
            <SummaryBox label="Average Order Value" value="$41" iconType="ScaleIcon" />
          </Col>
        </Row>
        <Row>
          <Col lg={4}>
            <SummaryBox label="Unique Clicks" value="8,300" iconType="ClickIcon" />
          </Col>
          <Col lg={4}>
            <SummaryBox label="Traffic Value" value="$432" iconType="TrafficIcon" />
          </Col>
          <Col lg={4}>
            <SummaryBox label="Cashback Given" value="$41" iconType="CashBackIcon" />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col lg={6} className="mt-1">
            <div className={[styles.metrics__box__customers, 'h-100 p-4'].join(' ')}>
              <div className={styles.metrics__box__customers__header}>
                Most Viral Customers
              </div>
              <div className={`${styles.metrics__box__customers__node} pb-2`}>
                <div>
                  Ilian Davis
                </div>
                <div className={styles.metrics__box__customers__node__value}>
                  $428 generated
                </div>
                <div className='text-end'>
                  <ArrowIcon />
                </div>
              </div>
              <hr />
              <div className={`${styles.metrics__box__customers__node} pb-2`}>
                <div>
                  Anna Karter
                </div>
                <div className={styles.metrics__box__customers__node__value}>
                  $213 generated
                </div>
                <div className='text-end'>
                  <ArrowIcon />
                </div>
              </div>
            </div>
          </Col>
          <Col lg={6} className="mt-1">
            <div className={[styles.metrics__box__products, 'h-100 p-4'].join(' ')}>
              <div className={styles.metrics__box__products__header}>
                <div>Most Viral Product</div>
                <div className='text-end'>
                  <ArrowIcon />
                </div>
              </div>
              <div className={styles.metrics__box__products__detail}>
                <div className={styles.metrics__box__products__detail__image}>
                  <ProductLogo />
                </div>
                <div>
                  <div className={styles.metrics__box__products__detail__title}>
                    Insert Waves Here
                  </div>
                  <div className={styles.metrics__box__products__detail__value1}>
                    $395 generated
                  </div>
                  <div className={styles.metrics__box__products__detail__value2}>
                    39 Buys
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>

  );
}

const ArrowIcon = () => (
  <svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M1.75005 8.8751C1.53671 8.8751 1.32338 8.78934 1.16088 8.61872C0.835046 8.2766 0.835046 7.7236 1.16088 7.38147L3.91505 4.4896L1.26505 1.60822C0.945879 1.25997 0.955046 0.706096 1.28588 0.370971C1.61755 0.0358458 2.14505 0.0454708 2.46421 0.391971L5.68255 3.89197C5.99838 4.23585 5.99421 4.78097 5.67255 5.11872L2.33921 8.61872C2.17671 8.78934 1.96338 8.8751 1.75005 8.8751Z" fill="#CFB9E4" />
  </svg>
);
