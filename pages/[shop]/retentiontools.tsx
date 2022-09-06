import Page from 'components/Layout/Page/Page';
import type { NextPage } from 'next';
import React, { useState, useEffect, useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import RetentionInvite from 'components/Widgets/RetentionInvite';
import RetentionImport from 'components/Widgets/RetentionImport';
import { StoreContext } from 'store/store.context';
import { GET_ACTIVE_CAMPAIGN, GET_RETENTION_LOGS } from 'store/store.graphql';
import { useQuery } from '@apollo/client';

export default function RetentionTools() {
  const { store, dispatch } = useContext(StoreContext);
  const [retentionList, setRetentionList] = useState<[]>([]);
  const [activeCampaign, setActiveCampaign] = useState('');

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
            handleAfterSubmit={handleAfterSubmit}
            activeCampaign={activeCampaign}
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
          />
        </Col>
      </Row>
    </Page>
  );
}
