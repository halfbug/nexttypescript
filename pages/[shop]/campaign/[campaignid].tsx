/* eslint-disable max-len */
import React from 'react';
import type { NextPage } from 'next';
import Page from 'components/Layout/Page/Page';
import UpdateCampaign from 'components/Forms/UpdateCampaign';

const Campaign: NextPage = () => (
  <Page headingText="Fall 2021 Campaign" onLogin={() => {}} onLogout={() => {}} onCreateAccount={() => {}}>
    <UpdateCampaign />
  </Page>
);

export default Campaign;
