import React, { useState, useEffect, useContext } from 'react';
import type { NextPage } from 'next';
import Page from 'components/Layout/Page/Page';
import { Col, Container, Row } from 'react-bootstrap';
import CoreMetrics from 'components/Forms/Dashboard/CoreMetrics';
import ViralityMetrics from 'components/Forms/Dashboard/ViralityMetrics';
import CustomerData from 'components/Forms/Dashboard/CutomerData';
import useUtilityFunction from 'hooks/useUtilityFunction';
import Router, { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { StoreContext } from 'store/store.context';
import {
  GET_CAMPAIGN_METRICS, GET_TOTAL_UNIQUE_CLICKS_BY_CAMPAIGN,
  GET_OVERVIEW_METRICS_BY_CAMPAIGN_FILTER, GET_TOTAL_UNIQUE_CLICKS_BY_CAMPAIGN_FILTER,
} from 'store/store.graphql';

const CampaignAnalytics: NextPage = () => {
  const { store, dispatch } = useContext(StoreContext);
  const [dataFilter, setDataFilter] = useState<boolean>(true);
  const [campaignFilter, setCampaignFilter] = useState<boolean>(false);
  const [startFrom, setStartFrom] = useState<any>('-');
  const [toDate, setToDate] = useState<any>('-');
  const [revenue, setRevenue] = useState<any>('-');
  const [numPurchases, setNumPurchases] = useState<any>('-');
  const [numFilterPurchases, setNumFilterPurchases] = useState<any>('-');
  const [uniqueClicks, setUniqueClicks] = useState<any>('-');
  const [aov, setAov] = useState<any>('-');
  const [trafficValue, setTrafficValue] = useState<any>('-');
  const [cashbackGiven, setCashbackGiven] = useState<any>('-');
  const { formatNumber, storeCurrencySymbol } = useUtilityFunction();
  const { query: { analyticsid } } = useRouter();

  const handleSearch = ((startDate:any, endDate:any) => {
    console.log(startDate);
    console.log(endDate);
    if (startDate === '-') {
      // window.location.reload();
      setDataFilter(true);
      setCampaignFilter(false);
      uniqueRefetch();
      refetch();
    } else {
      setStartFrom(startDate);
      setToDate(endDate);
      setDataFilter(false);
      setCampaignFilter(true);
      uniqueFiterRefetch();
      frefetch();
    }
  });

  const {
    data: uniqueData, refetch: uniqueRefetch,
  } = useQuery(GET_TOTAL_UNIQUE_CLICKS_BY_CAMPAIGN, {
    variables: { storeId: store.id, campaignId: analyticsid }, skip: campaignFilter,
  });

  useEffect(() => {
    if (uniqueData) {
      console.log('uniqueData');
      const numUniqueVisitors = uniqueData?.getCampaignUniqueClicks?.uniqueVisitors;
      const numOfOrder = uniqueData?.getCampaignUniqueClicks?.totalOrders;
      if (numUniqueVisitors > 0) {
        setUniqueClicks(numUniqueVisitors);
      } else {
        setUniqueClicks('-');
      }
      if (numOfOrder > 0) {
        setNumPurchases(numOfOrder);
      } else {
        setNumPurchases('-');
      }
    }
  }, [uniqueData, analyticsid]);

  const {
    data, refetch,
  } = useQuery(GET_CAMPAIGN_METRICS, {
    variables: { storeId: store.id, campaignId: analyticsid }, skip: campaignFilter,
  });

  useEffect(() => {
    if (data && uniqueData) {
      const rev = data.campaignMetric[0]?.revenue || '0';
      const cashBack = data.campaignMetric[0]?.cashBack || 0;
      if (rev > 0) {
        setRevenue(`${storeCurrencySymbol(store?.currencyCode ?? 'USD')}${formatNumber(rev)}`);
        if (numPurchases) {
          const getAov = rev / numPurchases;
          setAov(`${storeCurrencySymbol(store?.currencyCode ?? 'USD')}${formatNumber(getAov)}`);
        }
        const calTraffric = rev / uniqueClicks;
        setTrafficValue(`${storeCurrencySymbol(store?.currencyCode ?? 'USD')}${formatNumber(calTraffric)}`);
      } else {
        setTrafficValue('-');
        setNumPurchases('-');
        setRevenue('-');
        setAov('-');
      }
      if (cashBack > 0) {
        setCashbackGiven(`${storeCurrencySymbol(store?.currencyCode ?? 'USD')}${formatNumber(cashBack)}`);
      } else {
        setCashbackGiven('-');
      }
    }
  }, [data, uniqueData, numPurchases]);

  const {
    data: uniqueFiterData, refetch: uniqueFiterRefetch,
  } = useQuery(GET_TOTAL_UNIQUE_CLICKS_BY_CAMPAIGN_FILTER, {
    variables: { storeId: store.id, startFrom, toDate }, skip: dataFilter,
  });
  useEffect(() => {
    console.log('dataFilter');
    if (uniqueFiterData) {
      const numUniqueVisitors = uniqueFiterData?.getUniqueCampaignClicks?.uniqueVisitors;
      const numOfOrder = uniqueFiterData?.getUniqueCampaignClicks?.totalOrders;
      if (numUniqueVisitors > 0) {
        setUniqueClicks(numUniqueVisitors);
      } else {
        setUniqueClicks('-');
      }
      if (numOfOrder > 0) {
        setNumFilterPurchases(numOfOrder);
      } else {
        setNumFilterPurchases('-');
      }
    }
  }, [uniqueFiterData]);

  const {
    data: fdata, refetch: frefetch,
  } = useQuery(GET_OVERVIEW_METRICS_BY_CAMPAIGN_FILTER, {
    variables: { storeId: store.id, startFrom, toDate }, skip: dataFilter,
  });

  useEffect(() => {
    if (fdata && uniqueFiterData) {
      console.log(JSON.stringify(fdata));
      const rev = fdata.overviewCampaignMetric[0]?.revenue || '0';
      const cashBack = fdata.overviewCampaignMetric[0]?.cashBack || 0;
      if (rev > 0) {
        setRevenue(`${storeCurrencySymbol(store?.currencyCode ?? 'USD')}${formatNumber(rev)}`);
        if (numFilterPurchases) {
          const getAov = rev / numFilterPurchases;
          setAov(`${storeCurrencySymbol(store?.currencyCode ?? 'USD')}${formatNumber(getAov)}`);
        }
        const calTraffric = rev / uniqueClicks;
        setTrafficValue(`${storeCurrencySymbol(store?.currencyCode ?? 'USD')}${formatNumber(calTraffric)}`);
      } else {
        setTrafficValue('-');
        setNumFilterPurchases('-');
        setRevenue('-');
        setAov('-');
      }
      if (cashBack > 0) {
        setCashbackGiven(`${storeCurrencySymbol(store?.currencyCode ?? 'USD')}${formatNumber(cashBack)}`);
      } else {
        setCashbackGiven('-');
      }
    }
  }, [fdata, uniqueFiterData, numFilterPurchases]);
  const numresult = (dataFilter === false) ? numFilterPurchases : numPurchases;
  return (
    <Page headingText="Campaign Analytics" onLogin={() => { }} onLogout={() => { }} onCreateAccount={() => { }}>
      <Container>
        <Row className="pt-4">
          <Col lg={7} className="gx-5">
            <CoreMetrics
              revenue={revenue}
              numPurchases={numresult}
              uniqueClicks={uniqueClicks}
              aov={aov}
              trafficValue={trafficValue}
              cashbackGiven={cashbackGiven}
              handleSearch={handleSearch}
            />
          </Col>
          <Col lg={{ span: 4, offset: 1 }} className="p-0">
            <ViralityMetrics />
          </Col>
        </Row>
        <CustomerData />
      </Container>
    </Page>
  );
};

export default CampaignAnalytics;
