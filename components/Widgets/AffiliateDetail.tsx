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
    <section className={styles.partner__box_1}>
      <h4 className="mt-0">
        llian Davis
        {' '}
        <span className={styles.partner__wom_score}>9</span>
        {' '}
        <span>WOM Score</span>
      </h4>
      <hr className={styles.partner__separator} />

      <Row className="mt-4">
        <Col lg={5} md={5} xs={5}>
          <span className={styles.partner__detail_tag__tag1}>$428 generated</span>
        </Col>
        <Col lg={5} md={5} xs={5}>
          <span className={styles.partner__detail_tag__tag2}>
            <UniqueClicksLogo />
          </span>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col lg={5} md={5} xs={5}>
          <span className={styles.partner__detail_tag__tag3}>
            <NewPurchaseLogo />
          </span>
        </Col>
        <Col lg={5} md={5} xs={5}>
          <span className={styles.partner__detail_tag__tag4}>
            <NewCustomerLogo />
          </span>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col lg={5} md={5} xs={5}>
          <span className={styles.partner__detail_tag__tag5}>
            <CashBackLogo />
          </span>
        </Col>
        <Col lg={5} md={5} xs={5} className="d-flex justify-content-start align-items-center">
          <span className={styles.partner__btn}>View Groupshop</span>
          <ArrowRightLogo />
        </Col>
      </Row>

      <hr className={styles.partner__sperator} />

      <Row>
        <OrderFromLogo />
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
    </section>
  );
}
