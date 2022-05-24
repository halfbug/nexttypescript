import React from 'react';
import { Col, Row } from 'react-bootstrap';
import InfoIcon from 'assets/images/info-icon.svg';
import styles from 'styles/Partner.module.scss';

export default function PartnerRewards() {
  return (
    <section className={styles.partner__rewards_box}>
      <div className={styles.partner__rewards_box__header}>
        Partner Rewards
      </div>
      <Row>
        <Col md={6}>
          <div className={styles.partner__rewards_box__heading}>
            Baseline
            <InfoIcon />
          </div>
          <div>
            <span className={styles.partner__rewards_box__percentage}>25%</span>
            <span className={styles.partner__rewards_box__edit}>Edit</span>
          </div>
        </Col>
        <Col md={6}>
          <div className={styles.partner__rewards_box__heading}>
            Maximum
            <InfoIcon />
          </div>
          <div>
            <span className={styles.partner__rewards_box__percentage}>25%</span>
            <span className={styles.partner__rewards_box__edit}>Edit</span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="mt-4">
          <div className={styles.partner__rewards_box__heading}>
            Partner Commission
            <InfoIcon />
          </div>
          <div>
            <span className={styles.partner__rewards_box__percentage}>25%</span>
            <span className={styles.partner__rewards_box__edit}>Edit</span>
          </div>
        </Col>
      </Row>
    </section>
  );
}
