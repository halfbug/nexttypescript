import * as React from 'react';
import {
  Accordion, Button, Col, Container, Dropdown, Row,
} from 'react-bootstrap';
import DownArrow from 'assets/images/DownArrowSmall.svg';
import styles from 'styles/Analytics.module.scss';
import AnalyticCutomerDetail from './AnalyticCustomerDetail';
import AnalyticOrderDetail from './AnalyticOrderDetail';
import MostViralCustomers from './MostViralCustomers';

export default function CustomerData() {
  return (
    <>
      <div className={styles.customerData}>
        <div className={styles.customerData__overlay}>
          <div className={styles.customerData__overlayText}>Coming Soon</div>
        </div>
        <div className={styles.customerData__header}>
          <h3>Customer Data</h3>
        </div>
        <Row>
          <Col lg={7} className="gx-5">
            <MostViralCustomers />
          </Col>
          <Col lg={5} className="gx-5">
            <AnalyticCutomerDetail />
            {/* <AnalyticOrderDetail /> */}
          </Col>
        </Row>
        <Row>
          <Col lg={7} className="gx-5">
            <Container className="p-0">
              <div className={styles.customerData__dropdown_header}>
                <h4>All Customer & Order Data</h4>
                <Dropdown className="d-inline ms-2">
                  <Dropdown.Toggle
                    id="dropdown-autoclose-true"
                    variant="outline-primary"
                    className={styles.customerData__dropdown_header__dropdown}
                  >
                    <span className={styles.customerData__dropdown_header__dropdown__txt}>
                      Most Recent
                    </span>
                    <DownArrow />
                  </Dropdown.Toggle>

                  <Dropdown.Menu className={styles.customerData__dropdown_header__dropdownMenu}>
                    <Dropdown.Item className={styles.customerData__dropdown_header__dropdownItem}>
                      item 1
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className={styles.customerData__table_head}>
                <div className={styles.customerData__table_head__txt}>Order #</div>
                <div className={styles.customerData__table_head__txt}>Customer Name</div>
                <div className={styles.customerData__table_head__txt}>WOM Score</div>
                <div className={styles.customerData__table_head__txt}>Revenue Generated</div>
                <div />
              </div>

              <Accordion className={styles.customerData__acc1}>
                <Accordion.Item eventKey="0" className="border-0 mb-2">
                  <Accordion.Header className={styles.customerData__acc1__row}>
                    <div className={styles.customerData__acc1__row__name}>1620</div>
                    <div className={styles.customerData__acc1__row__name}>
                      Jessica Lee
                    </div>
                    <div className={styles.customerData__acc1__row__count}>
                      7
                    </div>
                    <div className={styles.customerData__acc1__row__genereated}>
                      $428 generated
                    </div>
                  </Accordion.Header>
                  <Accordion.Body className={styles.customerData__acc1_body}>
                    It’s a personalized shopping page we create
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1" className="border-0 mb-2">
                  <Accordion.Header className={styles.customerData__acc1__row}>
                    <div className={styles.customerData__acc1__row__name}>1620</div>
                    <div className={styles.customerData__acc1__row__name}>
                      Jessica Lee
                    </div>
                    <div className={styles.customerData__acc1__row__count}>
                      7
                    </div>
                    <div className={styles.customerData__acc1__row__genereated}>
                      $428 generated
                    </div>
                  </Accordion.Header>
                  <Accordion.Body className={styles.customerData__acc1_body}>
                    It’s a personalized shopping page we create
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2" className="border-0 mb-2">
                  <Accordion.Header className={styles.customerData__acc1__row}>
                    <div className={styles.customerData__acc1__row__name}>1620</div>
                    <div className={styles.customerData__acc1__row__name}>
                      Jessica Lee
                    </div>
                    <div className={styles.customerData__acc1__row__count}>
                      7
                    </div>
                    <div className={styles.customerData__acc1__row__genereated}>
                      $428 generated
                    </div>
                  </Accordion.Header>
                  <Accordion.Body className={styles.customerData__acc1_body}>
                    It’s a personalized shopping page we create
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3" className="border-0 mb-2">
                  <Accordion.Header className={styles.customerData__acc1__row}>
                    <div className={styles.customerData__acc1__row__name}>1620</div>
                    <div className={styles.customerData__acc1__row__name}>
                      Jessica Lee
                    </div>
                    <div className={styles.customerData__acc1__row__count}>
                      7
                    </div>
                    <div className={styles.customerData__acc1__row__genereated}>
                      $428 generated
                    </div>
                  </Accordion.Header>
                  <Accordion.Body className={styles.customerData__acc1_body}>
                    It’s a personalized shopping page we create
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4" className="border-0 mb-2">
                  <Accordion.Header className={styles.customerData__acc1__row}>
                    <div className={styles.customerData__acc1__row__name}>1620</div>
                    <div className={styles.customerData__acc1__row__name}>
                      Jessica Lee
                    </div>
                    <div className={styles.customerData__acc1__row__count}>
                      7
                    </div>
                    <div className={styles.customerData__acc1__row__genereated}>
                      $428 generated
                    </div>
                  </Accordion.Header>
                  <Accordion.Body className={styles.customerData__acc1_body}>
                    It’s a personalized shopping page we create
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5" className="border-0 mb-2">
                  <Accordion.Header className={styles.customerData__acc1__row}>
                    <div className={styles.customerData__acc1__row__name}>1620</div>
                    <div className={styles.customerData__acc1__row__name}>
                      Jessica Lee
                    </div>
                    <div className={styles.customerData__acc1__row__count}>
                      7
                    </div>
                    <div className={styles.customerData__acc1__row__genereated}>
                      $428 generated
                    </div>
                  </Accordion.Header>
                  <Accordion.Body className={styles.customerData__acc1_body}>
                    It’s a personalized shopping page we create
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="6" className="border-0 mb-2">
                  <Accordion.Header className={styles.customerData__acc1__row}>
                    <div className={styles.customerData__acc1__row__name}>1620</div>
                    <div className={styles.customerData__acc1__row__name}>
                      Jessica Lee
                    </div>
                    <div className={styles.customerData__acc1__row__count}>
                      7
                    </div>
                    <div className={styles.customerData__acc1__row__genereated}>
                      $428 generated
                    </div>
                  </Accordion.Header>
                  <Accordion.Body className={styles.customerData__acc1_body}>
                    It’s a personalized shopping page we create
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="7" className="border-0 mb-2">
                  <Accordion.Header className={styles.customerData__acc1__row}>
                    <div className={styles.customerData__acc1__row__name}>1620</div>
                    <div className={styles.customerData__acc1__row__name}>
                      Jessica Lee
                    </div>
                    <div className={styles.customerData__acc1__row__count}>
                      7
                    </div>
                    <div className={styles.customerData__acc1__row__genereated}>
                      $428 generated
                    </div>
                  </Accordion.Header>
                  <Accordion.Body className={styles.customerData__acc1_body}>
                    It’s a personalized shopping page we create
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              <div className={styles.customerData__btnRow}>
                <a href="/" className={styles.customerData__btnRow__csv}>
                  Export all to CSV
                  {' >'}
                </a>
                <Button className={styles.customerData__btnRow__btn}>Load more</Button>
              </div>
            </Container>
          </Col>
          <Col lg={5} className="gx-5">
            <AnalyticOrderDetail />
          </Col>
        </Row>
      </div>

    </>
  );
}
