import React, { useState, useEffect, useContext } from 'react';
import type { NextPage } from 'next';
// import Head from 'next/head';
import Page from 'components/Layout/Page/Page';
import CampaignOverview from 'components/Forms/Dashboard/CampaignOverview';
import CampaignMetrics from 'components/Forms/Dashboard/CampaignMetrics';
import CampaignStrength from 'components/Forms/Dashboard/CampaignStrength';
import { Col, Container, Row } from 'react-bootstrap';
import { StoreContext } from 'store/store.context';
import { GET_OVERVIEW_METRICS, GET_TOTAL_ORDERS } from 'store/store.graphql';
import { useQuery } from '@apollo/client';
import useUtilityFunction from 'hooks/useUtilityFunction';

// import useStore from 'hooks/useStore';

const ShopMain: NextPage = () => {
  const { store, dispatch } = useContext(StoreContext);
  const shopName: string[] | undefined = store?.shop?.split('.', 1);
  const [brandLogo, setbrandLogo] = useState<string>('');
  const { logoImage } = store;
  const { getSignedUrlS3, getKeyFromS3URL } = useUtilityFunction();
  const [revenue, setRevenue] = useState<number | string>('-');
  const [numPurchases, setNumPurchases] = useState<any>(undefined);
  const [aov, setAov] = useState<number | string>('-');
  const [uniqueClick, setUniqueClick] = useState<number | string>('-');
  const [trafficValue, setTrafficValue] = useState<number | string>('-');
  const [cashbackGiven, setCashbackGiven] = useState<number | string>('-');
  const [rogs, setRogs] = useState<number | string>('-');
  const { formatNumber, storeCurrencySymbol } = useUtilityFunction();

  useEffect(() => {
    async function gets3logo() {
      const key = getKeyFromS3URL(logoImage);
      const logoS3 = await getSignedUrlS3(key);
      setbrandLogo(logoS3);
    }
    gets3logo();
  });

  const {
    data: orderData, refetch: orderRefetch,
  } = useQuery(GET_TOTAL_ORDERS, {
    variables: { shop: store?.shop },
  });

  useEffect(() => {
    if (orderData) {
      const numOfOrder = orderData?.getOrderCount?.countTotalOrders;
      setNumPurchases(numOfOrder);
    }
  }, [orderData]);

  const {
    loading, error, data, refetch,
  } = useQuery(GET_OVERVIEW_METRICS, {
    variables: { storeId: store.id },
  });

  useEffect(() => {
    if (data && orderData) {
      const rev = data.overviewMetrics[0]?.revenue || '0';
      const cashBack = data.overviewMetrics[0]?.cashBack || 0;
      const getVisitors = data.overviewMetrics[0]?.totalVisitors || 0;
      setUniqueClick(formatNumber(getVisitors));
      if (rev > 0) {
        setRevenue(`${storeCurrencySymbol(store?.currencyCode ?? 'USD')}${formatNumber(rev)}`);
        if (numPurchases) {
          const getAov = rev / numPurchases;
          setAov(`${storeCurrencySymbol(store?.currencyCode ?? 'USD')}${formatNumber(getAov)}`);
        }
        const calTraffric = rev / getVisitors;
        const calRogs = rev / cashBack;
        setRogs(`${formatNumber(calRogs)}`);
        setTrafficValue(`${storeCurrencySymbol(store?.currencyCode ?? 'USD')}${formatNumber(calTraffric)}`);
      } else {
        setTrafficValue('-');
        setNumPurchases('-');
        setRevenue('-');
        setAov('-');
        setRogs('-');
      }
      if (cashBack > 0) {
        setCashbackGiven(formatNumber(cashBack));
      } else {
        setCashbackGiven('-');
      }
    }
  }, [data, orderData, numPurchases]);

  useEffect(() => {
    orderRefetch();
    refetch();
  }, []);

  return (
    <Page headingText="Overview" onLogin={() => { }} onLogout={() => { }} onCreateAccount={() => { }}>
      <Container>
        <Row className="pt-4">
          <Col lg={7} className="gx-5">
            <CampaignOverview brandLogo={brandLogo} rogs={rogs} />
            <CampaignMetrics
              revenue={revenue}
              numPurchases={numPurchases}
              aov={aov}
              uniqueClick={uniqueClick}
              trafficValue={trafficValue}
              cashbackGiven={cashbackGiven}
            />
          </Col>
          <Col lg={5} className="gx-5">
            <CampaignStrength />
          </Col>
        </Row>
      </Container>
    </Page>
  );
};

export default ShopMain;
