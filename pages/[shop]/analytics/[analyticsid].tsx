import React, { useState, useEffect, useContext } from 'react';
import type { GetServerSidePropsContext, NextPage } from 'next';
import Page from 'components/Layout/Page/Page';
import { Col, Container, Row } from 'react-bootstrap';
import CoreMetrics from 'components/Forms/Dashboard/CoreMetrics';
import ViralityMetrics from 'components/Forms/Dashboard/ViralityMetrics';
import CustomerCampaignData from 'components/Forms/Dashboard/CustomerCampaignData';
import useUtilityFunction from 'hooks/useUtilityFunction';
import GraphCampaignRevenue from 'components/Forms/Dashboard/GraphCampaignRevenue';
import Router, { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { StoreContext } from 'store/store.context';
import {
  GET_CAMPAIGN_METRICS, GET_TOTAL_UNIQUE_CLICKS_BY_CAMPAIGN,
  GET_OVERVIEW_METRICS_BY_CAMPAIGN_FILTER, GET_TOTAL_UNIQUE_CLICKS_BY_CAMPAIGN_FILTER,
  GET_MOST_VIRAL_PRODUCTS_BY_CAMPAIGN, GET_MOST_VIRAL_PRODUCTS,
  GET_OVERVIEW_METRICS, GET_TOTAL_UNIQUE_CLICKS_BY_ID,
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
  const [defaultUniqueClicks, setDefaultUniqueClicks] = useState<any>('-');
  const [aov, setAov] = useState<any>('-');
  const [trafficValue, setTrafficValue] = useState<any>('-');
  const [cashbackGiven, setCashbackGiven] = useState<any>('-');
  const [mostViralProducts, setMostViralProducts] = useState<any>([]);
  const { formatNumber, storeCurrencySymbol } = useUtilityFunction();
  const { query: { analyticsid } } = useRouter();
  const clicktimes = 0.98;
  const shopName: string[] | undefined = store?.shop?.split('.', 1);

  const handleSearch = ((startDate:any, endDate:any) => {
    if (startDate === '-') {
      setDataFilter(true);
      setCampaignFilter(false);
      uniqueRefetch();
      refetch();
      uniqueCamRefetch();
    } else {
      setStartFrom(startDate);
      setToDate(endDate);
      setDataFilter(false);
      setCampaignFilter(true);
      uniqueFiterRefetch();
      frefetch();
      viralProductRefresh();
    }
  });

  // get Most Viral Products by campaign
  const {
    data: uniqueCamData, refetch: uniqueCamRefetch,
  } = useQuery(GET_MOST_VIRAL_PRODUCTS_BY_CAMPAIGN, {
    variables: { storeId: store.id, campaignId: analyticsid }, skip: campaignFilter,
  });

  useEffect(() => {
    if (uniqueCamData) {
      setMostViralProducts(uniqueCamData?.mostCampaignViralProducts);
    }
  }, [uniqueCamData]);

  // get Unique Clicks & Traffic Value by campaign
  const {
    data: uniqueData, refetch: uniqueRefetch,
  } = useQuery(GET_TOTAL_UNIQUE_CLICKS_BY_CAMPAIGN, {
    variables: { storeId: store.id, campaignId: analyticsid }, skip: campaignFilter,
  });

  useEffect(() => {
    if (uniqueData) {
      console.log('uniqueData');
      const numUniqueVisitor = uniqueData?.getCampaignUniqueClicks?.uniqueVisitors || 0;
      const numOfOrders = uniqueData?.getCampaignUniqueClicks?.totalOrders;
      if (numUniqueVisitor > 0) {
        setUniqueClicks(numUniqueVisitor);
        setDefaultUniqueClicks(numUniqueVisitor);
        const calTraffric = (clicktimes * numUniqueVisitor);
        setTrafficValue(`${storeCurrencySymbol(store?.currencyCode ?? 'USD')}${formatNumber(calTraffric)}`);
      } else {
        setDefaultUniqueClicks('-');
        setTrafficValue('-');
      }
      if (numOfOrders > 0) {
        setNumPurchases(numOfOrders);
      } else {
        setNumPurchases('-');
      }
    }
  }, [uniqueData, analyticsid]);

  // get Total Revenue, Number of Purchases, Average Order Value & Cashback Given by campaign
  const {
    data, refetch,
  } = useQuery(GET_CAMPAIGN_METRICS, {
    variables: { storeId: store.id, campaignId: analyticsid }, skip: campaignFilter,
  });

  useEffect(() => {
    if (data && uniqueData) {
      const rev = data.campaignMetric[0]?.revenue || '0';
      const cashBack = data.campaignMetric[0]?.cashBack || 0;
      const feeCharge = data.campaignMetric[0]?.feeCharges || 0;
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
  }, [data, uniqueData, numPurchases, defaultUniqueClicks]);

  // get Most Viral Products by datepicker filter
  const {
    data: viralProductData, refetch: viralProductRefresh,
  } = useQuery(GET_MOST_VIRAL_PRODUCTS, {
    variables: { shop: store.shop, startDate: startFrom, endDate: toDate }, skip: dataFilter,
  });

  useEffect(() => {
    if (viralProductData) {
      setMostViralProducts(viralProductData?.mostViralProducts);
    }
  }, [viralProductData]);

  // get Unique Clicks & Traffic Value by datepicker filter
  const {
    data: uniqueFiterData, refetch: uniqueFiterRefetch,
  } = useQuery(GET_TOTAL_UNIQUE_CLICKS_BY_ID, {
    variables: { storeId: store.id, startFrom, toDate }, skip: dataFilter,
  });
  useEffect(() => {
    console.log('dataFilter');
    if (uniqueFiterData) {
      const numUniqueVisitors = uniqueFiterData?.getUniqueClicks?.uniqueVisitors || 0;
      const numOfOrder = uniqueFiterData?.getUniqueClicks?.totalOrders;
      if (numUniqueVisitors > 0) {
        setUniqueClicks(numUniqueVisitors);
        const calTraffric = (clicktimes * numUniqueVisitors);
        setTrafficValue(`${storeCurrencySymbol(store?.currencyCode ?? 'USD')}${formatNumber(calTraffric)}`);
      } else {
        setTrafficValue('-');
        setUniqueClicks('-');
      }
      if (numOfOrder > 0) {
        setNumFilterPurchases(numOfOrder);
      } else {
        setNumFilterPurchases('-');
      }
    }
  }, [uniqueFiterData]);

  // get Total Revenue, Number of Purchases, Average Order Value
  // & Cashback Given by datepicker filter
  const {
    data: fdata, refetch: frefetch,
  } = useQuery(GET_OVERVIEW_METRICS, {
    variables: { storeId: store.id, startFrom, toDate }, skip: dataFilter,
  });

  useEffect(() => {
    if (fdata && uniqueFiterData) {
      console.log('overviewMetric ', fdata.overviewMetrics);
      const rev = (fdata.overviewMetrics) ? fdata.overviewMetrics[0]?.revenue : '0';
      const cashBack = (fdata.overviewMetrics) ? fdata.overviewMetrics[0]?.cashBack : 0;
      const feeCharge = (fdata.overviewMetrics) ? fdata.overviewMetrics[0]?.feeCharges : 0;
      if (rev > 0) {
        setRevenue(`${storeCurrencySymbol(store?.currencyCode ?? 'USD')}${formatNumber(rev)}`);
        if (numFilterPurchases) {
          const getAov = rev / numFilterPurchases;
          setAov(`${storeCurrencySymbol(store?.currencyCode ?? 'USD')}${formatNumber(getAov)}`);
        }
      } else {
        setNumFilterPurchases('-');
        setRevenue('-');
        setAov('-');
      }
      if (cashBack > 0) {
        setCashbackGiven(`${storeCurrencySymbol(store?.currencyCode ?? 'USD')}${formatNumber(Math.ceil(cashBack + feeCharge))}`);
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
              shopName={shopName}
              page="analytics-id"
            />
            {analyticsid && startFrom && toDate && (
            <GraphCampaignRevenue
              startFrom={startFrom}
              toDate={toDate}
              campaignId={analyticsid}
              campaignFilter={campaignFilter}
              dataFilter={dataFilter}
              currencyCode={storeCurrencySymbol(store?.currencyCode ?? 'USD')}
              storeId={store.id}
            />
            )}
          </Col>
          <Col lg={5} className="gx-4">
            <ViralityMetrics
              mostViralProducts={mostViralProducts}
              currencyCode={storeCurrencySymbol(store?.currencyCode ?? 'USD')}
            />
          </Col>
        </Row>
        {analyticsid && startFrom && toDate && store.id && (
          <CustomerCampaignData
            startDate={startFrom}
            endDate={toDate}
            currencyCode={storeCurrencySymbol(store?.currencyCode ?? 'USD')}
            storeId={store.id}
            campaignId={analyticsid}
            campaignFilter={campaignFilter}
            dataFilter={dataFilter}
          />
        )}
      </Container>
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
export default CampaignAnalytics;
