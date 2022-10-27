import React, { useState, useEffect, useContext } from 'react';
import type { NextPage } from 'next';
// import Head from 'next/head';
import Page from 'components/Layout/Page/Page';
import CampaignOverview from 'components/Forms/Dashboard/CampaignOverview';
import CampaignMetrics from 'components/Forms/Dashboard/CampaignMetrics';
import CampaignStrength from 'components/Forms/Dashboard/CampaignStrength';
import { Col, Container, Row } from 'react-bootstrap';
import { StoreContext } from 'store/store.context';
import { GET_OVERVIEW_METRICS, GET_TOTAL_UNIQUE_CLICKS_BY_ID } from 'store/store.graphql';
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
  const [numPurchases, setNumPurchases] = useState<any>('-');
  const [uniqueClicks, setUniqueClicks] = useState<any>('-');
  const [aov, setAov] = useState<number | string>('-');
  const [trafficValue, setTrafficValue] = useState<number | string>('-');
  const [cashbackGiven, setCashbackGiven] = useState<number | string>('-');
  const [rogs, setRogs] = useState<number | string>('-');
  const [startFrom, setStartFrom] = useState<any>('-');
  const [toDate, setToDate] = useState<any>('-');
  const { formatNumber, storeCurrencySymbol } = useUtilityFunction();

  const handleSearch = ((startDate:any, endDate:any) => {
    setStartFrom(startDate);
    setToDate(endDate);
  });

  useEffect(() => {
    async function gets3logo() {
      const key = getKeyFromS3URL(logoImage);
      const logoS3 = await getSignedUrlS3(key);
      setbrandLogo(logoS3);
    }
    if (brandLogo === '') {
      gets3logo();
    }
  });

  const {
    data: uniqueData, refetch: uniqueRefetch,
  } = useQuery(GET_TOTAL_UNIQUE_CLICKS_BY_ID, {
    variables: { storeId: store.id, startFrom, toDate },
  });

  useEffect(() => {
    if (uniqueData) {
      const numUniqueVisitors = uniqueData?.getUniqueClicks?.uniqueVisitors || 0;
      const numOfOrder = uniqueData?.getUniqueClicks?.totalOrders || 0;
      if (numUniqueVisitors > 0) {
        setUniqueClicks(numUniqueVisitors);
        const clicktimes = 0.98;
        const calTraffric = (clicktimes * numUniqueVisitors);
        setTrafficValue(`${storeCurrencySymbol(store?.currencyCode ?? 'USD')}${formatNumber(calTraffric)}`);
      } else {
        setUniqueClicks('-');
        setTrafficValue('-');
      }
      if (numOfOrder > 0) {
        setNumPurchases(numOfOrder);
      } else {
        setNumPurchases('-');
      }
    }
  }, [uniqueData]);

  const {
    loading, error, data, refetch,
  } = useQuery(GET_OVERVIEW_METRICS, {
    variables: { storeId: store.id, startFrom, toDate },
  });

  useEffect(() => {
    if (data && uniqueData) {
      // console.log(JSON.stringify(data));
      const rev = data.overviewMetrics[0]?.revenue || '0';
      const cashBack = data.overviewMetrics[0]?.cashBack || 0;
      if (rev > 0) {
        setRevenue(`${storeCurrencySymbol(store?.currencyCode ?? 'USD')}${formatNumber(rev)}`);
        if (numPurchases) {
          const getAov = rev / numPurchases;
          setAov(`${storeCurrencySymbol(store?.currencyCode ?? 'USD')}${formatNumber(getAov)}`);
        }
        if (cashBack > 0) {
          const calRogs = rev / cashBack;
          setRogs(`${formatNumber(calRogs)}X`);
        } else {
          setRogs('-');
        }
      } else {
        setNumPurchases('-');
        setRevenue('-');
        setAov('-');
        setRogs('-');
      }
      if (cashBack > 0) {
        setCashbackGiven(`${storeCurrencySymbol(store?.currencyCode ?? 'USD')}${formatNumber(cashBack)}`);
      } else {
        setCashbackGiven('-');
      }
    }
  }, [data, uniqueData, numPurchases]);

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
              uniqueClick={uniqueClicks}
              trafficValue={trafficValue}
              cashbackGiven={cashbackGiven}
              handleSearch={handleSearch}
            />
          </Col>
          {/* <Col lg={5} className="gx-5">
            <CampaignStrength />
          </Col> */}
        </Row>
      </Container>
    </Page>
  );
};

export default ShopMain;
