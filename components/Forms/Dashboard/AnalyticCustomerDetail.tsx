import * as React from 'react';
import { Accordion } from 'react-bootstrap';
import InfoIcon from 'assets/images/info-icon-medium.svg';
import styles from 'styles/Analytics.module.scss';

export default function AnalyticCutomerDetail() {
  return (
    <div className={styles.customerData__cutomerDetail}>
      <div className={styles.customerData__cutomerDetail__name}>Ilian Davis</div>
      <div className={styles.customerData__cutomerDetail__score}>
        <div className={styles.customerData__cutomerDetail__score__count}>9</div>
        WOM Score
        <InfoIcon />
      </div>
      <div className={styles.customerData__cutomerDetail__border} />
      <div className={styles.customerData__cutomerDetail__row}>
        <div className={styles.customerData__cutomerDetail__row__genereated}>
          $428 generated
        </div>
        <div className={styles.customerData__cutomerDetail__row__clicks}>
          👆 148 unique clicks
        </div>
      </div>

      <div className={styles.customerData__cutomerDetail__table_head}>
        <div className={styles.customerData__cutomerDetail__table_head__txt}>
          Past Groupshops
        </div>
        <div className={styles.customerData__cutomerDetail__table_head__txt}>Date</div>
        <div />
      </div>

      <Accordion className={styles.customerData__cutomerDetail__acc}>
        <Accordion.Item eventKey="0" className="border-0 mb-2">
          <Accordion.Header className={styles.customerData__cutomerDetail__acc__row}>
            <div className={styles.customerData__cutomerDetail__acc__row__name}>W83HFSD</div>
            <div className={styles.customerData__cutomerDetail__acc__row__name}>
              03/10/21
            </div>
          </Accordion.Header>
          <Accordion.Body className={styles.customerData__cutomerDetail__acc_body}>
            It’s a personalized shopping page we create
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1" className="border-0 mb-2">
          <Accordion.Header className={styles.customerData__cutomerDetail__acc__row}>
            <div className={styles.customerData__cutomerDetail__acc__row__name}>W83HFSD</div>
            <div className={styles.customerData__cutomerDetail__acc__row__name}>
              03/10/21
            </div>
          </Accordion.Header>
          <Accordion.Body className={styles.customerData__cutomerDetail__acc_body}>
            It’s a personalized shopping page we create
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
