import Page from 'components/Layout/Page/Page';
import ActiveAffiliate from 'components/Widgets/ActiveAffiliate';
import NewPartnerForm from 'components/Widgets/NewPartnerForm';
import type { GetServerSidePropsContext, NextPage } from 'next';
import React, { useState, useEffect, useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import styles from 'styles/Partner.module.scss';
import { GET_ALL_PARTERS } from 'store/store.graphql';
import { StoreContext } from 'store/store.context';
import { useQuery } from '@apollo/client';
import HintBox from 'components/Groupshop/HintBox/HintBox';

const PartnerTools: NextPage = () => {
  const [showHint, setShowHint] = useState<boolean>(false);
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
    setShowHint(true);
  }, [data]);

  return (
    <Page headingText="Partner Tools" onLogin={() => { }} onLogout={() => { }} onCreateAccount={() => { }}>
      <Row className={styles.partner}>
        <h3>Partner Tools</h3>
        <NewPartnerForm handleAfterSubmit={handleAfterSubmit} partnerList={partnerList} />
      </Row>
      <Row className={styles.partner}>
        <ActiveAffiliate
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          partnerList={partnerList}
          handleAfterSubmit={handleAfterSubmit}
        />
      </Row>
      <HintBox
        show={showHint}
        handleClose={() => { setShowHint(false); }}
        title="Use Partner Tools to..."
        hints={[
          'Create Groupshop pages for influencers, affiliates, or other commission-based partners.',
          'Easily track sales and engagement for your influencer & affiliate campaigns.',
        ]}
      />
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
export default PartnerTools;
