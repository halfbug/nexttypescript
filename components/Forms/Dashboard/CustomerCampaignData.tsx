import React, { useState, useEffect, useContext } from 'react';
import {
  Accordion, Button, Col, Container, Dropdown, Row,
} from 'react-bootstrap';
import DownArrow from 'assets/images/DownArrowSmall.svg';
import styles from 'styles/Analytics.module.scss';
import BulbIcon from 'assets/images/bulb.svg';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_MOST_VIRAL_CUSTOMERS, GET_MOST_VIRAL_CUSTOMERS_BY_CAMPAIGN } from 'store/store.graphql';
import { read, utils, writeFileXLSX } from 'xlsx';
import useUtilityFunction from 'hooks/useUtilityFunction';
import ArrowRightLogo from 'assets/images/arrow-right.svg';
import AnalyticCutomerDetail from './AnalyticCustomerDetail';
import AnalyticOrderDetail from './AnalyticOrderDetail';
import MostViralCustomers from './MostViralCustomers';
import OrderLineItems from './OrderLineItems';

interface CustomersCampaignProp{
  startDate: any;
  endDate: any;
  currencyCode: any;
  storeId: any;
  campaignId:any;
  campaignFilter:boolean;
  dataFilter:boolean;
}

export default function CustomerCampaignData({
  startDate, endDate, currencyCode, storeId, campaignId, campaignFilter, dataFilter,
} : CustomersCampaignProp) {
  const [viralCustomersList, setViralCustomers] = useState<any>([]);
  const [viralCustomersExport, setViralCustomersExport] = useState<any>([]);
  const [activeCustomersData, setActiveCustomersData] = useState<any>([]);
  const [customerLineItems, setCustomerLineItems] = useState<any>([]);
  const [showCustomerDetail, setShowCustomerDetail] = useState(false);
  const [showLineitemsBox, setShowLineitemsBox] = useState(false);
  const { formatNumber } = useUtilityFunction();

  const {
    data, refetch,
  } = useQuery(GET_MOST_VIRAL_CUSTOMERS, {
    variables: { storeId, startDate, endDate }, skip: dataFilter,
  });

  const {
    data: camCustomers, refetch: refetchCampaignCustomers,
  } = useQuery(GET_MOST_VIRAL_CUSTOMERS_BY_CAMPAIGN, {
    variables: { campaignId }, skip: campaignFilter,
  });

  useEffect(() => {
    if (camCustomers?.mostCampaignViralCustomers) {
      resultManage(camCustomers?.mostCampaignViralCustomers);
    }
  }, [camCustomers]);
  useEffect(() => {
    if (data?.mostViralCustomers) {
      resultManage(data?.mostViralCustomers);
    }
  }, [data]);
  const resultManage = (viCustomers: any) => {
    setShowCustomerDetail(false);
    setShowLineitemsBox(false);
    const myObjArray: { orderNumber: any; customerName: string;
    revenueGenerated: string; uniqueClicks: any; cashBack: any;
    totalLineItems: any; Members: any; }[] = [];
    setViralCustomers(viCustomers);
    viCustomers.forEach((part: any, index: number) => {
      myObjArray.push({
        orderNumber: part.members[0].name,
        customerName: `${part.members[0].customer.firstName} ${part.members[0].customer.lastName}`,
        revenueGenerated: currencyCode + formatNumber(part.revenue - part.refund),
        cashBack: currencyCode + formatNumber(part.refund),
        uniqueClicks: part.uniqueClicks,
        totalLineItems: part.lineItemsCount,
        Members: part.numMembers,
      });
    });
    setViralCustomersExport(myObjArray);
  };

  const exportFile = () => {
    const ws = utils.json_to_sheet(viralCustomersExport);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Data');
    writeFileXLSX(wb, 'MostViralCustomers.csv');
  };

  return (
    <>
      <div className={[styles.coreMetrics__traffic_box, 'd-sm-none d-lg-block mb-3'].join(' ')}>
        <div className={styles.coreMetrics__traffic_box__heading}>
          <BulbIcon />
          <span className={styles.coreMetrics__traffic_box__heading__txt}>
            How is traffic value calculated?
          </span>
        </div>
        <div className={styles.coreMetrics__traffic_box__detail}>
          Groupshop generates quality traffic from referrals.
          We calculate traffic value using the average CPC in your industry.
        </div>
      </div>

      <div className={styles.customerData}>
        <div className={styles.customerData__header}>
          <h3>Customer Data</h3>
        </div>
        <Row>
          <Col lg={8} className="ge-5">
            <Container className="p-0">
              <MostViralCustomers
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                currencyCode={currencyCode}
                setActiveCustomersData={setActiveCustomersData}
                setShowCustomerDetail={setShowCustomerDetail}
                setShowLineitemsBox={setShowLineitemsBox}
                viralCustomersList={viralCustomersList}
              />
              { viralCustomersList.length > 0 && (
                <div className={styles.customerData__btnRow}>
                  <Button variant="" className={[styles.customerData__btnRow__csv, 'px-0'].join(' ')} onClick={exportFile}>
                    Export all to CSV
                    {' '}
                    {'>'}
                    {/* <ArrowRightLogo /> */}
                  </Button>
                </div>
              )}
            </Container>
          </Col>
          <Col lg={4} className="gs-5">
            {showCustomerDetail && (
            <AnalyticCutomerDetail
              currencyCode={currencyCode}
              customersData={activeCustomersData}
              setShowCustomerDetail={setShowCustomerDetail}
              setShowLineitemsBox={setShowLineitemsBox}
              setCustomerLineItems={setCustomerLineItems}
            />
            )}
            {showLineitemsBox && (
            <OrderLineItems
              setShowCustomerDetail={setShowCustomerDetail}
              setShowLineitemsBox={setShowLineitemsBox}
              currencyCode={currencyCode}
              customerLineItems={customerLineItems}
            />
            )}
            {/* <AnalyticOrderDetail /> */}
          </Col>
        </Row>
      </div>

    </>
  );
}
