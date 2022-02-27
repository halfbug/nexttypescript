import React from 'react';
import type { NextPage } from 'next';
import Page from 'components/Layout/Page/Page';
import BillingCalculator from 'components/Forms/Dashboard/BillingCalculator';
import BillingTable from 'components/Forms/Dashboard/BillingTable';

const Billing: NextPage = () => (
  <Page headingText="Billing" onLogin={() => {}} onLogout={() => {}} onCreateAccount={() => {}}>
    <BillingCalculator />
    <BillingTable />
  </Page>
);

export default Billing;
