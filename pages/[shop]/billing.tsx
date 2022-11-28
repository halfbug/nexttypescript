import React from 'react';
import type { GetServerSidePropsContext, NextPage } from 'next';
import Page from 'components/Layout/Page/Page';
import BillingCalculator from 'components/Forms/Dashboard/BillingCalculator';
import BillingPackage from 'components/Forms/Dashboard/BillingPackage';
import BulbInfo from 'components/Forms/Dashboard/BulbInfo';
import {
  Row,
} from 'react-bootstrap';
import PaymentHistory from 'components/Forms/Dashboard/PaymentHistory';
import BillingPartnerTools from 'components/Forms/Dashboard/BillingPartnerTools';

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
      {/* <BillingCalculator /> */}
      <BillingPartnerTools />
      <PaymentHistory />
    </Row>
  </Page>
);
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // console.log('🚀 ~ file: [ins].tsx ~ line 51 ~ getServerSideProps ~ context', context?.req);
  const { cookies: { token } } = context.req;
  // console.log(' ~ token', token);
  if (token) {
    return {
      props: { token }, // Will be passed to the page component as props
    };
  }
  return { props: {} };
}
export default Billing;
