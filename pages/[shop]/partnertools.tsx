import Page from 'components/Layout/Page/Page';
import ActiveAffiliate from 'components/Widgets/ActiveAffiliate';
import NewPartnerForm from 'components/Widgets/NewPartnerForm';
import type { NextPage } from 'next';
import React, { useState, useEffect, useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import styles from 'styles/Partner.module.scss';
import { GET_ALL_PARTERS } from 'store/store.graphql';
import { StoreContext } from 'store/store.context';
import { useQuery } from '@apollo/client';

const PartnerTools: NextPage = () => {
  const [partnerList, setPartnerList] = useState<[]>([]);
  const { store, dispatch } = useContext(StoreContext);
  const {
    loading, data, refetch,
  } = useQuery(GET_ALL_PARTERS, {
    variables: { storeId: store.id },
  });

  const handleAfterSubmit = () => {
    if (data) {
      refetch();
    }
  };

  useEffect(() => {
    if (data) {
      setPartnerList(data.partnerGroupshops);
    }
  }, [data]);

  return (
    <Page headingText="Partner Tools" onLogin={() => { }} onLogout={() => { }} onCreateAccount={() => { }}>
      <Row className={styles.partner}>
        <h3>Partner Tools</h3>
        <NewPartnerForm handleAfterSubmit={handleAfterSubmit} partnerList={partnerList} />
      </Row>
      <Row className={styles.partner}>
        <ActiveAffiliate partnerList={partnerList} handleAfterSubmit={handleAfterSubmit} />
      </Row>
    </Page>
  );
};

export default PartnerTools;
