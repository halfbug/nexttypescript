/* eslint-disable jsx-quotes */
import React, { useState, useEffect, useContext } from 'react';
import styles from 'styles/Retail.module.scss';
import {
  Row, Col, Button,
} from 'react-bootstrap';
import SummaryBox from 'components/Shared/SummaryBox/SummaryBox';
import { read, utils, writeFileXLSX } from 'xlsx';
import { GET_ALL_RECENT_SIGNUP } from 'store/store.graphql';
import { useQuery } from '@apollo/client';
import useDimensions from 'hooks/useDimentions';
import usePagination from 'hooks/usePagination';
import ExportCustomerData from './ExportCustomerData';

interface AnalyticsOverviewProps {
  storeId:any;
}

const AnalyticsOverview = ({ storeId } : AnalyticsOverviewProps) => {
  const [signuplList, setSignupList] = useState<any>([]);
  const [signuplListExport, setSignuplListExport] = useState<any>([]);
  const [ref, dimensions] = useDimensions();
  const {
    loading, data, refetch,
  } = useQuery(GET_ALL_RECENT_SIGNUP, {
    variables: { storeId },
  });

  useEffect(() => {
    if (data) {
      setSignupList(data.getRecentSignup);
      const userExport: { channel: any; customerName: string;
        phoneNumber: string; }[] = [];
      data.getRecentSignup.forEach((part: any, index: number) => {
        userExport.push({
          channel: part.channel.name,
          customerName: `${part.customerDetail.firstName} ${part.customerDetail.lastName}`,
          phoneNumber: part.customerDetail.phone,
        });
      });
      setSignuplListExport(userExport);
    }
  }, [data]);

  const exportFile = () => {
    const ws = utils.json_to_sheet(signuplListExport);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Data');
    writeFileXLSX(wb, 'ChannelCustomers.csv');
  };

  const {
    screens, breakPoint, pageSize,
    totalPages, renderItems, currentPage, setCurrentPage, getPageNumbers,
  } = usePagination({
    dimensions,
    maxrows: 4,
    screens: {
      xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12,
    },
    items: signuplList,
    siblingCount: 4,
  });

  const SummaryBoxes = () => (
    <>
      <Row>
        <Col lg={4} className={styles.coreMetrics__summary_box}>
          <SummaryBox label="Unique  Customers" value={138} iconType="KeyIcon" arrowIcon={false} />
        </Col>
        <Col lg={4} className={styles.coreMetrics__summary_box}>
          <SummaryBox label="Number of Purchases" value={432} iconType="PurchaseIcon" arrowIcon={false} />
        </Col>
        <Col lg={4} className={styles.coreMetrics__summary_box}>
          <SummaryBox label="Revenue" value="$41" iconType="CashBackIcon" arrowIcon={false} />
        </Col>
      </Row>
    </>
  );
  const Signups = () => (
    <>
      <Row ref={ref}>
        <Col lg={12}>
          <h3 className={styles.retail__signups__heading}>Recent Signups</h3>
          <Row className={styles.retail__signups__listHeader}>
            <Col className="text-muted fs-6 ">Channel</Col>
            <Col className="text-muted fs-6 ">Name</Col>
            <Col className="text-muted fs-6 ">Phone Number</Col>
          </Row>

          {renderItems !== undefined && renderItems.map((users:any) => (
            <Row className={styles.retail__signups__listRow}>
              <Col className={styles.retail__signups__channel}>
                {users.channel.name}
              </Col>
              <Col className={styles.retail__signups__name}>
                {users.customerDetail.firstName}
                {' '}
                {users.customerDetail.lastName}
              </Col>
              <Col className={styles.retail__signups__number}>
                {users.customerDetail.phone !== '' && (
                <>
                  ✅
                </>
                )}
              </Col>
            </Row>
          ))}
          { renderItems !== undefined && renderItems.length > 4 && (
            <Button onClick={exportFile} className={styles.retail__signups__more}>
              +
              {renderItems?.length - 4}
              {' '}
              more to export
            </Button>
          )}
        </Col>
      </Row>
    </>
  );
  return (
    <>
      <div className={styles.retail}>
        <Row>
          {/* <Col lg={12}>
            <h2>Analytics Overview</h2>
          </Col>
          <Col lg={8} className="my-4">
            <SummaryBoxes />
          </Col> */}
          <Col lg={8}>
            <Signups />
          </Col>
          {/* <Col lg={8}>
            <ExportCustomerData />
          </Col> */}
        </Row>
      </div>
    </>
  );
};

export default AnalyticsOverview;
