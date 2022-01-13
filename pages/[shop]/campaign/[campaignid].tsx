/* eslint-disable max-len */
import React from 'react';
import type { NextPage } from 'next';
import Page from 'components/Layout/Page/Page';
import UpdateCampaign from 'components/Forms/UpdateCampaign';

const Campaign: NextPage = () => (
  <Page headingText="Campaign" onLogin={() => {}} onLogout={() => {}} onCreateAccount={() => {}}>
    <UpdateCampaign />
  </Page>
);

export default Campaign;
