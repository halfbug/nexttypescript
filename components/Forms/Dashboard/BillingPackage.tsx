import * as React from 'react';
import styles from 'styles/Billing.module.scss';
import {
  Row, Col,
} from 'react-bootstrap';
import * as yup from 'yup';
import useUtilityFunction from 'hooks/useUtilityFunction';
import { StoreContext } from 'store/store.context';

export default function BillingPackage() {
  const { store } = React.useContext(StoreContext);
  const { findIndexInArray } = useUtilityFunction();

  return (
    <Row className={styles.billing}>
      <Col>
        <Row>
          <Col lg={12} className={['my-2', styles.letsgo].join(' ')}>
            <h3>Plans</h3>
            <Row className={styles.box_row}>
              <Col className={store.plan === 'EXPLORE' ? styles.box_1__active : styles.box_1}>
                <div className={styles.box_row_boxheading}>Explore</div>
                <div className="d-flex justify-content-center">
                  <div className={styles.free}>Free</div>
                </div>
                <p className="mt-1">First 100 Groupshops</p>
              </Col>
              <Col className={store.plan === 'LAUNCH' ? styles.box_4__active : styles.box_4}>
                <div className={styles.box_row_boxheading}>Launch</div>
                <div className="d-flex justify-content-center">
                  <div className={styles.btn}>25¢ per Groupshop</div>
                </div>
                <p className="mt-1">
                  Up to 1,000 Groupshops
                  {' '}
                  <br />
                  {' '}
                  per month
                </p>
              </Col>
              <Col className={store.plan === 'GROWTH' ? styles.box_3__active : styles.box_3}>
                <div className={styles.box_row_boxheading}>Growth</div>
                <div className="d-flex justify-content-center">
                  <div className={styles.btn}>20¢ per Groupshop</div>
                </div>
                <p className="mt-1">
                  Up to 2,500 Groupshops
                  {' '}
                  <br />
                  {' '}
                  per month

                </p>
              </Col>
              <Col className={store.plan === 'ENTERPRISE' ? styles.box_2__active : styles.box_2}>
                <div className={styles.box_row_boxheading}>Enterprise</div>
                <div className="d-flex justify-content-center">
                  <div className={styles.btn}>10¢ per Groupshop</div>
                </div>
                <p className="mt-1">
                  2,500+ Groupshops
                  {' '}
                  <br />
                  {' '}
                  per month

                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
