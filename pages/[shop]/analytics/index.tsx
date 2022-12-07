import React, { useState, useEffect, useContext } from 'react';
import type { GetServerSidePropsContext, NextPage } from 'next';
import Page from 'components/Layout/Page/Page';
import { Col, Container, Row } from 'react-bootstrap';
import CoreMetrics from 'components/Forms/Dashboard/CoreMetrics';
import ViralityMetrics from 'components/Forms/Dashboard/ViralityMetrics';
import CustomerData from 'components/Forms/Dashboard/CutomerData';
import { useQuery } from '@apollo/client';
import { StoreContext } from 'store/store.context';
import useUtilityFunction from 'hooks/useUtilityFunction';
import GraphRevenue from 'components/Forms/Dashboard/GraphRevenue';
import { GET_OVERVIEW_METRICS, GET_TOTAL_UNIQUE_CLICKS_BY_ID } from 'store/store.graphql';

const Analytics: NextPage = () => {
  const { store, dispatch } = useContext(StoreContext);
  const [revenue, setRevenue] = useState<any>('-');
  const [startFrom, setStartFrom] = useState<any>('-');
  const [toDate, setToDate] = useState<any>('-');
  const [numPurchases, setNumPurchases] = useState<any>('-');
  const [uniqueClicks, setUniqueClicks] = useState<any>('-');
  const [aov, setAov] = useState<any>('-');
  const [trafficValue, setTrafficValue] = useState<any>('-');
  const [cashbackGiven, setCashbackGiven] = useState<any>('-');
  const { formatNumber, storeCurrencySymbol } = useUtilityFunction();

  const handleSearch = ((startDate:any, endDate:any) => {
    setStartFrom(startDate);
    setToDate(endDate);
    uniqueRefetch();
    refetch();
  });

  const {
    data: uniqueData, refetch: uniqueRefetch,
  } = useQuery(GET_TOTAL_UNIQUE_CLICKS_BY_ID, {
    variables: { storeId: store.id, startFrom, toDate },
  });

  useEffect(() => {
    if (uniqueData) {
      const numUniqueVisitors = uniqueData?.getUniqueClicks?.uniqueVisitors || 0;
      const numOfOrder = uniqueData?.getUniqueClicks?.totalOrders;
      if (numUniqueVisitors > 0) {
        setUniqueClicks(numUniqueVisitors);
        const clicktimes = 0.98;
        const calTraffric = (clicktimes * numUniqueVisitors);
        setTrafficValue(`${storeCurrencySymbol(store?.currencyCode ?? 'USD')}${formatNumber(calTraffric)}`);
      } else {
        setTrafficValue('-');
        setUniqueClicks('-');
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
      const rev = data.overviewMetrics[0]?.revenue || '0';
      const cashBack = data.overviewMetrics[0]?.cashBack || 0;
      const feeCharge = data.overviewMetrics[0]?.feeCharges || 0;
      if (rev > 0) {
        setRevenue(`${storeCurrencySymbol(store?.currencyCode ?? 'USD')}${formatNumber(rev)}`);
        if (numPurchases) {
          const getAov = rev / numPurchases;
          setAov(`${storeCurrencySymbol(store?.currencyCode ?? 'USD')}${formatNumber(getAov)}`);
        }
      } else {
        setNumPurchases('-');
        setRevenue('-');
        setAov('-');
      }
      if (cashBack > 0) {
        setCashbackGiven(`${storeCurrencySymbol(store?.currencyCode ?? 'USD')}${formatNumber(Math.ceil(cashBack + feeCharge))}`);
      } else {
        setCashbackGiven('-');
      }
    }
  }, [data, uniqueData, numPurchases]);

  return (
    <Page headingText="Analytics" onLogin={() => { }} onLogout={() => { }} onCreateAccount={() => { }}>
      <Container>
        <Row className="pt-4">
          <Col lg={7} className="gx-5">
            <CoreMetrics
              revenue={revenue}
              numPurchases={numPurchases}
              uniqueClicks={uniqueClicks}
              aov={aov}
              trafficValue={trafficValue}
              cashbackGiven={cashbackGiven}
              handleSearch={handleSearch}
            />
            <GraphRevenue
              startFrom={startFrom}
              toDate={toDate}
              currencyCode={storeCurrencySymbol(store?.currencyCode ?? 'USD')}
            />
          </Col>
          <Col lg={{ span: 4, offset: 1 }} className="p-0">
            <ViralityMetrics
              startDate={startFrom}
              endDate={toDate}
              currencyCode={storeCurrencySymbol(store?.currencyCode ?? 'USD')}
              shop={store.shop}
            />
          </Col>
        </Row>
        <CustomerData
          startDate={startFrom}
          endDate={toDate}
          currencyCode={storeCurrencySymbol(store?.currencyCode ?? 'USD')}
          storeId={store.id}
        />
      </Container>
    </Page>
  );
};
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // console.log('🚀 ~ file: [ins].tsx ~ line 51 ~ getServerSideProps ~ context', context?.req);
  const { cookies: { token } } = context.req;
  // console.log(' ~ token'p, token);
  if (token) {
    return {
      props: { token }, // Will be passed to the page component as props
    };
  }
  return { props: {} };
}
export default Analytics;
