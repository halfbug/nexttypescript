import * as React from 'react';
import { Accordion, Container } from 'react-bootstrap';
import InfoIcon from 'assets/images/info-icon-medium.svg';
import styles from 'styles/Analytics.module.scss';

export default function MostViralCustomers() {
  return (
    <Container className={styles.customerData__viralCustomer}>
      <div className={styles.customerData__viralCustomer__heading}>
        Most Viral Customers
        <InfoIcon />
      </div>
      <div className={styles.customerData__viralCustomer__description}>
        These metrics help you identify your most promising brand influencers and affiliates.
      </div>

      <div className={styles.customerData__viralCustomer__heading1}>
        WOM Score
        <InfoIcon />
      </div>

      <Accordion className={styles.customerData__acc}>
        <Accordion.Item eventKey="0" className="border-0 mb-2">
          <Accordion.Header className={styles.customerData__acc__row}>
            <div className={styles.customerData__acc__row__count}>9</div>
            <div className={styles.customerData__acc__row__name}>
              Ilian Davis
            </div>
            <div className={styles.customerData__acc__row__genereated}>
              $428 generated
            </div>
            <div className={styles.customerData__acc__row__clicks}>
              👆 148 unique clicks
            </div>
          </Accordion.Header>
          <Accordion.Body className={styles.customerData__acc_body}>
            It’s a personalized shopping page we create
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1" className="border-0 mb-2">
          <Accordion.Header className={styles.customerData__acc__row}>
            <div className={styles.customerData__acc__row__count}>9</div>
            <div className={styles.customerData__acc__row__name}>
              Melissa Camps
            </div>
            <div className={styles.customerData__acc__row__genereated}>
              $428 generated
            </div>
            <div className={styles.customerData__acc__row__clicks}>
              👆 148 unique clicks
            </div>
          </Accordion.Header>
          <Accordion.Body className={styles.customerData__acc_body}>
            It’s a personalized shopping page we create
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2" className="border-0 mb-2">
          <Accordion.Header className={styles.customerData__acc__row}>
            <div className={styles.customerData__acc__row__count}>9</div>
            <div className={styles.customerData__acc__row__name}>
              Jose Guiterrez
            </div>
            <div className={styles.customerData__acc__row__genereated}>
              $428 generated
            </div>
            <div className={styles.customerData__acc__row__clicks}>
              👆 148 unique clicks
            </div>
          </Accordion.Header>
          <Accordion.Body className={styles.customerData__acc_body}>
            It’s a personalized shopping page we create
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3" className="border-0 mb-2">
          <Accordion.Header className={styles.customerData__acc__row}>
            <div className={styles.customerData__acc__row__count}>9</div>
            <div className={styles.customerData__acc__row__name}>
              Dean Abels
            </div>
            <div className={styles.customerData__acc__row__genereated}>
              $428 generated
            </div>
            <div className={styles.customerData__acc__row__clicks}>
              👆 148 unique clicks
            </div>
          </Accordion.Header>
          <Accordion.Body className={styles.customerData__acc_body}>
            It’s a personalized shopping page we create
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4" className="border-0 mb-2">
          <Accordion.Header className={styles.customerData__acc__row}>
            <div className={styles.customerData__acc__row__count}>9</div>
            <div className={styles.customerData__acc__row__name}>
              Jessica Lee
            </div>
            <div className={styles.customerData__acc__row__genereated}>
              $428 generated
            </div>
            <div className={styles.customerData__acc__row__clicks}>
              👆 148 unique clicks
            </div>
          </Accordion.Header>
          <Accordion.Body className={styles.customerData__acc_body}>
            It’s a personalized shopping page we create
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}
