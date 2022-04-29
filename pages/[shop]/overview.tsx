import React, { useEffect, useContext, useState } from 'react';
import type { NextPage } from 'next';
// import Head from 'next/head';
import { useRouter } from 'next/router';
import Page from 'components/Layout/Page/Page';
import { StoreContext } from 'store/store.context';
import { useQuery } from '@apollo/client';
import { GET_STORE } from 'store/store.graphql';

import CampaignOverview from 'components/Forms/Dashboard/CampaignOverview';
import CampaignMetrics from 'components/Forms/Dashboard/CampaignMetrics';
import CampaignStrength from 'components/Forms/Dashboard/CampaignStrength';
import { Col, Container, Row } from 'react-bootstrap';

// import useStore from 'hooks/useStore';

const ShopMain: NextPage = () => {
  console.log('overview page');
  return (
    <Page headingText="Overview" onLogin={() => { }} onLogout={() => { }} onCreateAccount={() => { }}>
      <Container>
        <Row>
          <Col lg={7} className="p-0">
            <CampaignOverview />
            <CampaignMetrics />
          </Col>
          <Col lg={5} className="p-0">
            <CampaignStrength />
          </Col>
        </Row>
      </Container>
    </Page>
    // <Page headingText="Overview" onLogin={() => {}} onLogout={() => {}}
    // onCreateAccount={() => {}}>
    //   dashboard overview
    //   {shop}
    //   {/* <div><pre>{ jsonStore }</pre></div> */}
    //   {loading && <p>.......loading....</p>}
    //   {data && <p>{JSON.stringify(data, null, '\t')}</p>}
    //   {/* {installationDialogue()} */}

  // </Page>
  );
};

export default ShopMain;
