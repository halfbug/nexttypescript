import Page from 'components/Layout/Page/Page';
import type { GetServerSidePropsContext, NextPage } from 'next';
import React, { useState, useEffect, useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import RetentionInvite from 'components/Widgets/RetentionInvite';
import RetentionImport from 'components/Widgets/RetentionImport';
import { StoreContext } from 'store/store.context';
import { GET_ACTIVE_CAMPAIGN, GET_RETENTION_LOGS } from 'store/store.graphql';
import { useQuery } from '@apollo/client';
import HintBox from 'components/Groupshop/HintBox/HintBox';

export default function RetentionTools() {
  const [showHint, setShowHint] = useState<boolean>(false);
  const { store, dispatch } = useContext(StoreContext);
  const [retentionList, setRetentionList] = useState<[]>([]);
  const [activeCampaign, setActiveCampaign] = useState('');
  const [showRetentionImport, setshowRetentionImport] = useState(false);

  // Get active campaign
  const {
    error, data,
  } = useQuery(GET_ACTIVE_CAMPAIGN, {
    variables: { storeId: store.id },
  });
  useEffect(() => {
    if (data) {
      setActiveCampaign(data.getActiveCampaign.id);
    }
    setShowHint(true);
  }, [data]);

  const handleAfterSubmit = () => {
    if (retentionData) {
      refetchRetention();
    }
  };

  // Get retention Tools logs
  const { data: retentionData, refetch: refetchRetention } = useQuery(GET_RETENTION_LOGS, {
    variables: { storeId: store.id },
  });
  useEffect(() => {
    if (retentionData) {
      setRetentionList(retentionData.retentiontools);
    }
  }, [retentionData]);

  return (
    <Page headingText="Retention Tools" onLogin={() => { }} onLogout={() => { }} onCreateAccount={() => { }}>
      <Row>
        <Col>
          <RetentionInvite
            storeId={store.id}
            handleAfterSubmit={handleAfterSubmit}
            activeCampaign={activeCampaign}
            setshowRetentionImport={setshowRetentionImport}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <RetentionImport
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            currencyCode={store?.currencyCode ?? 'USD'}
            retentionList={retentionList}
            showRetentionImport={showRetentionImport}
            handleAfterSubmit={handleAfterSubmit}
            setshowRetentionImport={setshowRetentionImport}
          />
        </Col>
      </Row>
      <HintBox
        show={showHint}
        handleClose={() => { setShowHint(false); }}
        title="Use Re-Activationn Tools to..."
        hints={[
          'Create Groupshop pages for customers that placed orders before you installed Groupshop.',
          'Re-engage with past customers who may want to earn by sharing your brand with friends & family.',
        ]}
      />
    </Page>
  );
}
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
