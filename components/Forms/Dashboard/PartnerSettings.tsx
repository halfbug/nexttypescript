import ActiveAffiliate from 'components/Widgets/ActiveAffiliate';
import AffiliateDetail from 'components/Widgets/AffiliateDetail';
import NewPartnerForm from 'components/Widgets/NewPartnerForm';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import styles from 'styles/Partner.module.scss';

export default function PartnerSettings() {
  return (
    <>
      <Row className={styles.partner}>
        <h3>Partner Tools</h3>
        <Col xxl={9} xl={10} lg={12}>
          <NewPartnerForm />
        </Col>
      </Row>
      <Row>
        <Col xxl={7} xl={9} lg={11} md={12} xs={12}>
          <ActiveAffiliate />
        </Col>
        <Col xxl={5} xl={6} lg={8} md={10} xs={12}>
          <AffiliateDetail />
        </Col>
      </Row>
    </>
  );
}
