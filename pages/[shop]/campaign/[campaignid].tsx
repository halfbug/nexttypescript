/* eslint-disable max-len */
import React, { useContext, useState } from 'react';
import type { NextPage } from 'next';
import Page from 'components/Layout/Page/Page';
import UpdateCampaign from 'components/Forms/Dashboard/UpdateCampaign';

const Campaign: NextPage = () => {
  const [headingText, setheadingText] = useState('');
  return (
    <Page headingText={headingText} onLogin={() => {}} onLogout={() => {}} onCreateAccount={() => {}}>
      <UpdateCampaign setHeading={setheadingText} />
    </Page>
  );
};

export default Campaign;
