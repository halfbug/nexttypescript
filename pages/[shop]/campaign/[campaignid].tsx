/* eslint-disable max-len */
import React, { useContext, useState } from 'react';
import type { GetServerSidePropsContext, NextPage } from 'next';
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
export default Campaign;
