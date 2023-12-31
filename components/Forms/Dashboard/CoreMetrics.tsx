import React, {
  useState, useEffect, useContext, Component,
} from 'react';
import { Col, Dropdown, Row } from 'react-bootstrap';
import Router from 'next/router';
import styles from 'styles/Analytics.module.scss';
import SummaryBox from 'components/Shared/SummaryBox/SummaryBox';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import useUtilityFunction from 'hooks/useUtilityFunction';

interface MetricsProp{
  revenue: string;
  numPurchases: string;
  uniqueClicks: string;
  aov: string;
  shopName: any;
  page: string;
  trafficValue: string;
  cashbackGiven: string;
  handleSearch(startDate:any, endDate:any): any;
}

export default function CoreMetrics({
  revenue, numPurchases, uniqueClicks, page, aov, trafficValue, cashbackGiven, shopName,
  handleSearch,
} : MetricsProp) {
  const [defaultDate, setDefaultDate] = useState<any>('');
  const pathName = 'partner-analytics';
  const callbackApply = (event: any, picker: any) => {
    const startDate = picker.startDate.format('YYYY-MM-DD');
    const endDate = picker.endDate.format('YYYY-MM-DD');
    handleSearch(startDate, endDate);
    setDefaultDate(`${picker.startDate.format('YYYY/MM/DD')
    } - ${
      picker.endDate.format('YYYY/MM/DD')}`);
    picker.element.val(
      `${picker.startDate.format('YYYY/MM/DD')
      } - ${
        picker.endDate.format('YYYY/MM/DD')}`,
    );
  };
  const { DateRanges } = useUtilityFunction();
  const callbackCancel = (event: any, picker: any) => {
    handleSearch('-', '-');
    setDefaultDate('-');
    picker.element.val('');
  };

  const handleChange = (event: any) => {
    if (event.target.value === '') {
      handleSearch('-', '-');
      setDefaultDate('-');
    }
  };

  const handleFilter = (event: any) => {
    if (event.target.value === '1') {
      Router.push(`/${shopName}/analytics`);
    } else {
      Router.push(`/${shopName}/partner-analytics`);
    }
  };

  const ranges = DateRanges();
  return (
    <div className={styles.coreMetrics}>
      <div className={styles.coreMetrics__header}>
        <h3>Core Metrics</h3>
        <div className="d-inline mx-2">
          <DateRangePicker
            onApply={callbackApply}
            onCancel={callbackCancel}
            initialSettings={{
              maxDate: new Date(),
              ranges,
              autoUpdateInput: false,
              locale: {
                cancelLabel: 'Clear',
              },
            }}
          >
            <input type="text" className="form-control" onChange={(e) => handleChange(e)} defaultValue={defaultDate} placeholder="Select Date Range" />
          </DateRangePicker>
        </div>
        {page !== 'analytics-id' && (
        <div className="d-inline mx-2">
          <select
            className="form-select"
            aria-label="Default select example"
            name="search-analytics"
            value={page === 'partner' ? '2' : '1'}
            onChange={(e) => handleFilter(e)}
          >
            <option value="1">Post-Purchase Analytics</option>
            <option value="2">Partner Analytics</option>
          </select>
        </div>
        )}
      </div>
      <Row>
        <Col lg={4} className={styles.coreMetrics__summary_box}>
          <SummaryBox label="Total Revenue " value={revenue} iconType="RevenueIcon" arrowIcon />
        </Col>
        <Col lg={4} className={styles.coreMetrics__summary_box}>
          <SummaryBox label="Number of Purchases" value={numPurchases} iconType="PurchaseIcon" arrowIcon />
        </Col>
        <Col lg={4} className={styles.coreMetrics__summary_box}>
          <SummaryBox label="Average Order Value" value={aov} iconType="ScaleIcon" arrowIcon />
        </Col>
        <Col lg={4} className={styles.coreMetrics__summary_box}>
          <SummaryBox label="Unique Clicks" value={uniqueClicks} iconType="ClickIcon" arrowIcon />
        </Col>
        <Col lg={4} className={styles.coreMetrics__summary_box}>
          <SummaryBox label="Traffic Value" value={trafficValue} iconType="TrafficIcon" arrowIcon />
        </Col>
        <Col lg={4} className={styles.coreMetrics__summary_box}>
          <SummaryBox label="Cashback Given" value={cashbackGiven} iconType="CashBackIcon" arrowIcon />
        </Col>
      </Row>

      {/* <div className={[styles.coreMetrics__traffic_box, ''].join(' ')}>
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
      </div> */}
    </div>

  );
}
