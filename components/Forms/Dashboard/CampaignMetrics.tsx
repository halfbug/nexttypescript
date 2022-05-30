/* eslint-disable jsx-quotes */
import * as React from 'react';
import styles from 'styles/Overview.module.scss';
import SummaryBox from 'components/Shared/SummaryBox/SummaryBox';
import DownArrow from 'assets/images/DownArrowSmall.svg';
import CalendarIcon from 'assets/images/calendar-icon.svg';

// import images
import ProductLogo from 'assets/images/viral-product-icon.svg';
import {
  Accordion, Col, Dropdown, Row,
} from 'react-bootstrap';

export default function CampaignMetrics() {
  return (
    <div className={styles.metrics}>
      <div className={styles.metrics__header}>
        <h3>Campaign Metrics</h3>
        <Dropdown className="d-inline mx-2">
          <Dropdown.Toggle
            id="dropdown-autoclose-true"
            variant="outline-primary"
            className={styles.metrics__header__dropdown}
          >
            <CalendarIcon />
            <span className={styles.metrics__header__dropdown__txt}>This week</span>
            <DownArrow />
          </Dropdown.Toggle>

          <Dropdown.Menu className={styles.metrics__header__dropdownMenu}>
            <Dropdown.Item className={styles.metrics__header__dropdownItem}>
              item 1
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className={styles.metrics__description}>
        ✨ Your Groupshop is still new, you’ll see data appear when you get your first sales.
        Speed up the process by increasing your campaign strength!
      </div>
      <div className={styles.metrics__box}>
        <Row>
          <Col lg={4} className={styles.metrics__box__summary_box}>
            <SummaryBox label="Total Revenue " value="$2,300" iconType="RevenueIcon" arrowIcon={false} />
          </Col>
          <Col lg={4} className={styles.metrics__box__summary_box}>
            <SummaryBox label="Number of Purchases" value="432" iconType="PurchaseIcon" arrowIcon={false} />
          </Col>
          <Col lg={4} className={styles.metrics__box__summary_box}>
            <SummaryBox label="Average Order Value" value="$41" iconType="ScaleIcon" arrowIcon={false} />
          </Col>
        </Row>
        <Row>
          <Col lg={4} className={styles.metrics__box__summary_box}>
            <SummaryBox label="Unique Clicks" value="8,300" iconType="ClickIcon" arrowIcon={false} />
          </Col>
          <Col lg={4} className={styles.metrics__box__summary_box}>
            <SummaryBox label="Traffic Value" value="$432" iconType="TrafficIcon" arrowIcon={false} />
          </Col>
          <Col lg={4} className={styles.metrics__box__summary_box}>
            <SummaryBox label="Cashback Given" value="$41" iconType="CashBackIcon" arrowIcon={false} />
          </Col>
        </Row>

        <Row>
          <Col lg={4} className={styles.metrics__box__summary_box}>
            <SummaryBox label="Total Revenue " value="-" iconType="RevenueIcon" arrowIcon={false} />
          </Col>
          <Col lg={4} className={styles.metrics__box__summary_box}>
            <SummaryBox label="Number of Purchases" value="-" iconType="PurchaseIcon" arrowIcon={false} />
          </Col>
          <Col lg={4} className={styles.metrics__box__summary_box}>
            <SummaryBox label="Average Order Value" value="-" iconType="ScaleIcon" arrowIcon={false} />
          </Col>
        </Row>
        <Row>
          <Col lg={4} className={styles.metrics__box__summary_box}>
            <SummaryBox label="Unique Clicks" value="8,300" iconType="ClickIcon" arrowIcon={false} />
          </Col>
          <Col lg={4} className={styles.metrics__box__summary_box}>
            <SummaryBox label="Traffic Value" value="-" iconType="TrafficIcon" arrowIcon={false} />
          </Col>
          <Col lg={4} className={styles.metrics__box__summary_box}>
            <SummaryBox label="Cashback Given" value="-" iconType="CashBackIcon" arrowIcon={false} />
          </Col>
        </Row>

        <Row className="mt-4">
          <Col lg={6} className="mt-1">
            <div className={[styles.metrics__box__customers, 'h-100'].join(' ')}>
              <div className={styles.metrics__box__customers__header}>
                Most Viral Customers
              </div>
              <Accordion className={styles.metrics__box__customers__acc}>
                <Accordion.Item eventKey="0" className="border-0 border-bottom">
                  <Accordion.Header className={styles.metrics__box__customers__ques}>
                    <div className={styles.metrics__box__customers__ques__name}>
                      Ilian Davis
                    </div>
                    <div className={styles.metrics__box__customers__node__value}>
                      $428 generated
                    </div>
                  </Accordion.Header>
                  <Accordion.Body className={styles.metrics__box__customers__acc_body}>
                    It’s a personalized shopping page we create
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1" className="border-0 border-bottom">
                  <Accordion.Header className={styles.metrics__box__customers__ques}>
                    <div className={styles.metrics__box__customers__ques__name}>
                      Anna Karter
                    </div>
                    <div className={styles.metrics__box__customers__node__value}>
                      $213 generated
                    </div>
                  </Accordion.Header>
                  <Accordion.Body className={styles.metrics__box__customers__acc_body}>
                    It’s a personalized shopping page we create
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </Col>
          <Col lg={6} className="mt-1">
            <div className={[styles.metrics__box__products, 'h-100 p-4'].join(' ')}>
              <div className={styles.metrics__box__products__header}>
                <div>Most Viral Product</div>
                <div className='text-end'>
                  <ArrowIcon />
                </div>
              </div>
              <div className={styles.metrics__box__products__detail}>
                <div className={styles.metrics__box__products__detail__image}>
                  <ProductLogo />
                </div>
                <div className={styles.metrics__box__products__detail_ptext}>
                  <div className={styles.metrics__box__products__detail__title}>
                    Insert Waves Here
                  </div>
                  <div className={styles.metrics__box__products__detail__value1}>
                    $395 generated
                  </div>
                  <div className={styles.metrics__box__products__detail__value2}>
                    🛒 39 Buys
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col lg={6} className="mt-1">
            <div className={[styles.metrics__box__customers, 'h-100'].join(' ')}>
              <div className={styles.metrics__box__customers__header}>
                Most Viral Customers
              </div>
              <div className={styles.metrics__emptytxt}>
                <div className='mb-1'>👀 It looks empty in here!</div>
                Let us help you promote Groupshop and get more sales.
                <div className={styles.metrics__emptytxt__light}>Set up marketing tools</div>
              </div>
            </div>
          </Col>
          <Col lg={6} className="mt-1">
            <div className={[styles.metrics__box__products, 'h-100 p-4'].join(' ')}>
              <div className={styles.metrics__box__products__header}>
                <div>Most Viral Product</div>
              </div>
              <div className={styles.metrics__emptytxt}>
                <div className='mb-1'>🛒 No products to show yet.</div>
                Add more to increase your chances of getting a sale.
                <div className={styles.metrics__emptytxt__light}>Edit campaign settings</div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>

  );
}

const ArrowIcon = () => (
  <svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M1.75005 8.8751C1.53671 8.8751 1.32338 8.78934 1.16088 8.61872C0.835046 8.2766 0.835046 7.7236 1.16088 7.38147L3.91505 4.4896L1.26505 1.60822C0.945879 1.25997 0.955046 0.706096 1.28588 0.370971C1.61755 0.0358458 2.14505 0.0454708 2.46421 0.391971L5.68255 3.89197C5.99838 4.23585 5.99421 4.78097 5.67255 5.11872L2.33921 8.61872C2.17671 8.78934 1.96338 8.8751 1.75005 8.8751Z" fill="#CFB9E4" />
  </svg>
);
