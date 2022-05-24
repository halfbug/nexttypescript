import Page from 'components/Layout/Page/Page';
import ActiveAffiliate from 'components/Widgets/ActiveAffiliate';
import AffiliateDetail from 'components/Widgets/AffiliateDetail';
import NewPartnerForm from 'components/Widgets/NewPartnerForm';
import PartnerRewards from 'components/Widgets/PartnerRewards';
import type { NextPage } from 'next';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import styles from 'styles/Partner.module.scss';

const PartnerTools: NextPage = () => (
  <Page headingText="Partner Tools" onLogin={() => { }} onLogout={() => { }} onCreateAccount={() => { }}>
    <Row className={styles.partner}>
      <h3>Partner Tools</h3>
      <Col xxl={8} xl={8} lg={8} md={8} xs={12}>
        <NewPartnerForm />
      </Col>
      <Col xxl={4} xl={4} lg={4} md={4} xs={12}>
        <PartnerRewards />
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
  </Page>
);

export default PartnerTools;
