import React from 'react';
import { Col, Row } from 'react-bootstrap';
import styles from 'styles/Partner.module.scss';
import UniqueClicksLogo from 'assets/images/unique-clicks.svg';
import NewPurchaseLogo from 'assets/images/new-purchase.svg';
import NewCustomerLogo from 'assets/images/new-customer.svg';
import CashBackLogo from 'assets/images/cashback.svg';
import ArrowRightLogo from 'assets/images/arrow-right.svg';
import OrderFromLogo from 'assets/images/order-from.svg';

export default function AffiliateDetail() {
  return (
    <section className={styles.partner__box_last}>
      <div className="pb-3 pe-3">
        <h4 className="mt-0">
          llian Davis
          {' '}
          <span className={styles.partner__wom_score}>9</span>
          {' '}
          <span>WOM Score</span>
        </h4>
        <hr className={styles.partner__sperator} />

        <Row className="mt-4">
          <Col lg={6} md={6} xs={6}>
            <span className={styles.partner__detail_tag__tag1}>$428 generated</span>
          </Col>
          <Col lg={6} md={6} xs={6}>
            <span className={['pe-2 ps-1', styles.partner__detail_tag__tag2].join(' ')}>
              {/* <UniqueClicksLogo /> */}
              👆 148 unique clicks
            </span>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col lg={6} md={6} xs={6}>
            <span className={styles.partner__detail_tag__tag3}>
              {/* <NewPurchaseLogo /> */}
              🛒  3 purchases
            </span>
          </Col>
          <Col lg={6} md={6} xs={6}>
            <span className={['pe-2 ps-1', styles.partner__detail_tag__tag4].join(' ')}>
              {/* <NewCustomerLogo /> */}
              ✨ 2 new customers
            </span>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col lg={6} md={6} xs={6}>
            <span className={styles.partner__detail_tag__tag5}>
              {/* <CashBackLogo /> */}
              💸 $112 cashback
            </span>
          </Col>
          <Col lg={6} md={6} xs={6} className="d-flex justify-content-start align-items-center">
            <div className={styles.partner__btn}>
              <span>View Groupshop</span>
              {' '}
              <ArrowRightLogo />
            </div>
          </Col>
        </Row>

        <hr className={styles.partner__sperator} />

        <Row className={styles.partner_order}>
          {/* <OrderFromLogo /> */}
          🔗 Orders from this Groupshop
        </Row>
        <Row className="mt-3">
          <Col lg={4} md={4} xs={4} className={styles.partner__simple_txt}>W83HFSD</Col>
          <Col lg={4} md={4} xs={4} className={styles.partner__simple_txt__aligned}>03/10/21</Col>
          <Col lg={4} md={4} xs={4} className="d-flex justify-content-end align-items-center px-4"><ArrowRightLogo /></Col>
        </Row>
        <Row className="mt-3">
          <Col lg={4} md={4} xs={4} className={styles.partner__simple_txt}>W83HFSD</Col>
          <Col lg={4} md={4} xs={4} className={styles.partner__simple_txt__aligned}>03/10/21</Col>
          <Col lg={4} md={4} xs={4} className="d-flex justify-content-end align-items-center px-4"><ArrowRightLogo /></Col>
        </Row>
        <Row className="mt-3">
          <Col lg={4} md={4} xs={4} className={styles.partner__simple_txt}>W83HFSD</Col>
          <Col lg={4} md={4} xs={4} className={styles.partner__simple_txt__aligned}>03/10/21</Col>
          <Col lg={4} md={4} xs={4} className="d-flex justify-content-end align-items-center px-4"><ArrowRightLogo /></Col>
        </Row>
      </div>
    </section>
  );
}
