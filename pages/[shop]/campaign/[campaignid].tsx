/* eslint-disable max-len */
import React from 'react';
import type { NextPage } from 'next';
import Page from 'components/Layout/Page/Page';
import DashboardCampaign from 'components/Forms/DashboardCampaign';

const Campaign: NextPage = () => (
  <Page headingText="Campaign" onLogin={() => {}} onLogout={() => {}} onCreateAccount={() => {}}>
    <DashboardCampaign />
  </Page>
);

export default Campaign;
