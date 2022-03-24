import React from 'react';
import type { NextPage } from 'next';
import Page from 'components/Layout/Page/Page';
import BillingCalculator from 'components/Forms/Dashboard/BillingCalculator';
import BillingPackage from 'components/Forms/Dashboard/BillingPackage';
import BulbInfo from 'components/Forms/Dashboard/BulbInfo';
import {
  Row,
} from 'react-bootstrap';
import PaymentHistory from 'components/Forms/Dashboard/PaymentHistory';

const Billing: NextPage = () => (
  <Page headingText="Billing" onLogin={() => {}} onLogout={() => {}} onCreateAccount={() => {}}>
    {/* <Col lg={12}>
      <BillingPackage />
    </Col>
    <Col lg={12}>
      <BulbInfo />
    </Col>
    <Col lg={12}>
      <BillingCalculator />
    </Col>
    <Col lg={12}>
      <BillingTable />
    </Col> */}
    <Row>
      <BillingPackage />
      <BulbInfo />
      <BillingCalculator />
      <PaymentHistory />
    </Row>
  </Page>
);

export default Billing;
