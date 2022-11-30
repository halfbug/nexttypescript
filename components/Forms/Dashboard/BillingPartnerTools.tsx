/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-quotes */
import * as React from 'react';
import styles from 'styles/Billing.module.scss';
import { Row, Col } from 'react-bootstrap';
import WhiteButton from 'components/Buttons/WhiteButton/WhiteButton';
import useBilling from 'hooks/useBilling';
import { StoreContext } from 'store/store.context';
import Link from 'next/link';
import usePartner from 'hooks/usePartner';

export default function BillingPartnerTools() {
  const { partnerInfo } = usePartner();
  console.log('🚀 ~ file: BillingPartnerTools.tsx ~ line 15 ~ BillingPartnerTools ~ partnerInfo', partnerInfo);
  const { store, dispatch } = React.useContext(StoreContext);
  const shopName: string[] | undefined = store?.shop?.split('.', 1);
  return (
    <Row className={styles.billing__partnerTools}>
      <Col lg={12}>
        <div className={styles.billing__partnerTools__header}>
          <h3>Partner Tools</h3>
        </div>
        <Row>
          <Col lg={6} className={styles.billing__partnerTools__activeBox}>
            <div className={styles.billing__partnerTools__activeBox__leftBox}>
              <div className={styles.billing__partnerTools__activeBox__amount}>
                $
                {partnerInfo?.currentTierCharges}
                /mo
              </div>
              <div className={styles.billing__partnerTools__activeBox__partner}>
                up to
                {' '}
                {partnerInfo?.currentTierLimit}
                {' '}
                active partners
              </div>
              <p className={styles.billing__partnerTools__activeBox__free}>
                First 3 partners are free.
              </p>
            </div>
            <div className={styles.billing__partnerTools__activeBox__rightBox}>
              <div className={styles.billing__partnerTools__activeBox__activePartner}>
                You currently have
                {' '}
                <span>
                  {partnerInfo?.count}
                  {' '}
                  active
                </span>
                {' '}
                partners.
              </div>
              <div>
                <Link href={`/${shopName}/partnertools`}>
                  <WhiteButton>
                    Manage Partners
                  </WhiteButton>
                </Link>
              </div>
            </div>
          </Col>
          <Col lg={4} className={styles.billing__partnerTools__tierBox}>
            <h4>
              Next Tier
            </h4>
            <div className={styles.billing__partnerTools__tierBox__amount}>
              $
              {partnerInfo?.tierCharges}
              /mo
            </div>
            <div className={styles.billing__partnerTools__tierBox__upto}>
              Up to
              {' '}
              {partnerInfo?.tierLimit}
              {' '}
              partners
            </div>
          </Col>
          <Col lg={2} />
        </Row>
      </Col>
    </Row>

  );
}
