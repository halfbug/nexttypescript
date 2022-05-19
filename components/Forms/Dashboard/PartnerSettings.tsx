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
        <Col xxl={8} xl={8} lg={8} md={8} xs={12}>
          <ActiveAffiliate />
        </Col>
        <Col xxl={4} xl={4} lg={4} md={4} xs={12}>
          <AffiliateDetail />
        </Col>
      </Row>
    </>
  );
}
