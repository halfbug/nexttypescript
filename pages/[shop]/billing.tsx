import React from 'react';
import type { NextPage } from 'next';
import Page from 'components/Layout/Page/Page';
import BillingCalculator from 'components/Forms/Dashboard/BillingCalculator';
import BillingTable from 'components/Forms/Dashboard/BillingTable';
import BillingPackage from 'components/Forms/Dashboard/BillingPackage';
import BulbInfo from 'components/Forms/Dashboard/BulbInfo';
import {
  Row, Col, Form, Button, InputGroup,
} from 'react-bootstrap';

const Billing: NextPage = () => (
  <Page headingText="Billing" onLogin={() => {}} onLogout={() => {}} onCreateAccount={() => {}}>
    <Col lg={12}>
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
    </Col>
  </Page>
);

export default Billing;
