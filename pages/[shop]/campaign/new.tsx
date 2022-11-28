import React, { useState, useEffect, useContext } from 'react';
import Page from 'components/Layout/Page/Page';
import { Container, Row, Col } from 'react-bootstrap';
import styles from 'styles/CampaignListing.module.scss';
import { StoreContext } from 'store/store.context';
import CreateCampaign from 'components/Forms/Dashboard/CreateCampaign';
import { GetServerSidePropsContext } from 'next';

const NewCampaign = () => {
  const { store, dispatch } = useContext(StoreContext);

  return (
    <Page headingText="New Campaign" onLogin={() => {}} onLogout={() => {}} onCreateAccount={() => {}}>
      <CreateCampaign />
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
export default NewCampaign;
