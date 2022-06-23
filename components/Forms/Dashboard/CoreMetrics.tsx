import * as React from 'react';
import { Col, Dropdown, Row } from 'react-bootstrap';
import DownArrow from 'assets/images/DownArrowSmall.svg';
import CalendarIcon from 'assets/images/calendar-icon.svg';
import BulbIcon from 'assets/images/bulb.svg';
import styles from 'styles/Analytics.module.scss';
import SummaryBox from 'components/Shared/SummaryBox/SummaryBox';

export default function CoreMetrics() {
  return (
    <div className={styles.coreMetrics}>
      <div className={styles.coreMetrics__header}>
        <h3>Core Metrics</h3>
        <Dropdown className="d-inline ms-2">
          <Dropdown.Toggle
            id="dropdown-autoclose-true"
            variant="outline-primary"
            className={styles.coreMetrics__header__dropdown}
          >
            <CalendarIcon />
            <span className={styles.coreMetrics__header__dropdown__txt}>This week</span>
            <DownArrow />
          </Dropdown.Toggle>

          <Dropdown.Menu className={styles.coreMetrics__header__dropdownMenu}>
            <Dropdown.Item className={styles.coreMetrics__header__dropdownItem}>
              item 1
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <Row>
        <Col lg={4} className={styles.coreMetrics__summary_box}>
          <SummaryBox label="Total Revenue " value="$2,300" iconType="RevenueIcon" arrowIcon />
        </Col>
        <Col lg={4} className={styles.coreMetrics__summary_box}>
          <SummaryBox label="Number of Purchases" value="432" iconType="PurchaseIcon" arrowIcon />
        </Col>
        <Col lg={4} className={styles.coreMetrics__summary_box}>
          <SummaryBox label="Average Order Value" value="$41" iconType="ScaleIcon" arrowIcon />
        </Col>
        <Col lg={4} className={styles.coreMetrics__summary_box}>
          <SummaryBox label="Unique Clicks" value="8,300" iconType="ClickIcon" arrowIcon />
        </Col>
        <Col lg={4} className={styles.coreMetrics__summary_box}>
          <SummaryBox label="Traffic Value" value="$432" iconType="TrafficIcon" arrowIcon />
        </Col>
        <Col lg={4} className={styles.coreMetrics__summary_box}>
          <SummaryBox label="Cashback Given" value="$41" iconType="CashBackIcon" arrowIcon />
        </Col>
      </Row>

      <div className={styles.coreMetrics__traffic_box}>
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
    </div>

  );
}
