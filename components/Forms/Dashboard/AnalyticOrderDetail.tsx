import * as React from 'react';
import { Accordion } from 'react-bootstrap';
import InfoIcon from 'assets/images/info-icon-medium.svg';
import ArrowIcon from 'assets/images/arrow-right.svg';
import styles from 'styles/Analytics.module.scss';

export default function AnalyticOrderDetail() {
  return (
    <div className={styles.customerData__orderDetail}>
      <div className={styles.customerData__orderDetail__orderRow}>
        <div className={styles.customerData__orderDetail__orderRow__number}>Order 1620</div>
        <div className={styles.customerData__orderDetail__orderRow__date}>03/10/21</div>
      </div>
      <div className={styles.customerData__orderDetail__totalprice}>$136.35</div>
      <div className={styles.customerData__orderDetail__border} />

      <div className={styles.customerData__orderDetail__customerRow}>
        <div className={styles.customerData__orderDetail__customerRow__name}>Ilian Davis</div>
        <div className={styles.customerData__orderDetail__customerRow__row}>
          <div className={styles.customerData__orderDetail__customerRow__row__count}>9</div>
          WOM Score
          <ArrowIcon />
        </div>
      </div>
      <a href="/" className={styles.customerData__orderDetail__viewProducts}>
        View Products Purchased
        <ArrowIcon />
      </a>
      <div className={styles.customerData__orderDetail__border} />

      <div className={styles.customerData__orderDetail__tagrow}>
        <div className={styles.customerData__orderDetail__tagrow__genereated}>
          $428 generated
        </div>
        <div className={styles.customerData__orderDetail__tagrow__clicks}>
          👆 148 unique clicks
        </div>
        <div className={styles.customerData__orderDetail__tagrow__purchases}>
          🛒  3 purchases
        </div>
        <div className={styles.customerData__orderDetail__tagrow__customer}>
          ✨ 2 new customers
        </div>
        <div className={styles.customerData__orderDetail__tagrow__cashback}>
          💸 $112 cashback
        </div>
        <a href="/" className={styles.customerData__orderDetail__tagrow__viewgroupshop}>
          View Groupshop
          <ArrowIcon />
        </a>
      </div>
      <div className={styles.customerData__orderDetail__border} />

      <div className={styles.customerData__orderDetail__table_head}>
        🔗 Orders from this Groupshop
      </div>

      <Accordion className={styles.customerData__orderDetail__acc}>
        <Accordion.Item eventKey="0" className="border-0 mb-2">
          <Accordion.Header className={styles.customerData__orderDetail__acc__row}>
            <div className={styles.customerData__orderDetail__acc__row__name}>W83HFSD</div>
            <div className={styles.customerData__orderDetail__acc__row__name}>
              03/10/21
            </div>
          </Accordion.Header>
          <Accordion.Body className={styles.customerData__orderDetail__acc_body}>
            It’s a personalized shopping page we create
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1" className="border-0 mb-2">
          <Accordion.Header className={styles.customerData__orderDetail__acc__row}>
            <div className={styles.customerData__orderDetail__acc__row__name}>W83HFSD</div>
            <div className={styles.customerData__orderDetail__acc__row__name}>
              03/10/21
            </div>
          </Accordion.Header>
          <Accordion.Body className={styles.customerData__orderDetail__acc_body}>
            It’s a personalized shopping page we create
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2" className="border-0 mb-2">
          <Accordion.Header className={styles.customerData__orderDetail__acc__row}>
            <div className={styles.customerData__orderDetail__acc__row__name}>W83HFSD</div>
            <div className={styles.customerData__orderDetail__acc__row__name}>
              03/10/21
            </div>
          </Accordion.Header>
          <Accordion.Body className={styles.customerData__orderDetail__acc_body}>
            It’s a personalized shopping page we create
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div className={styles.customerData__orderDetail__border} />

      <div className={styles.customerData__orderDetail__footer}>
        🎉 You’ve generated 3x the original order value by using Groupshop
      </div>
    </div>
  );
}
