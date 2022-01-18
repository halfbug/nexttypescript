import React, { useState, useEffect, useContext } from 'react';
import Page from 'components/Layout/Page/Page';
import { Container, Row, Col } from 'react-bootstrap';
import styles from 'styles/CampaignListing.module.scss';
import { StoreContext } from 'store/store.context';
import CreateCampaign from 'components/Forms/Dashboard/CreateCampaign';

const NewCampaign = () => {
  const { store, dispatch } = useContext(StoreContext);

  return (
    <Page headingText="New Campaign" onLogin={() => {}} onLogout={() => {}} onCreateAccount={() => {}}>
      <CreateCampaign />
    </Page>
  );
};
export default NewCampaign;
