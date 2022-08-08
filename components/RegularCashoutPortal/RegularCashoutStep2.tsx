import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import styles from 'styles/RegularCashout.module.scss';
import QR from 'assets/images/qr-screen-1.jpg';
import HeadLogo from 'assets/images/QRLogo.svg';
import LeftArrow from 'assets/images/left-arrow.svg';
import Instagram from 'assets/images/instagram-with-border.svg';
import Pinterest from 'assets/images/pinterest-with-border.svg';
import Twitter from 'assets/images/twitter-with-border.svg';
import Facebook from 'assets/images/facebook-with-border.svg';

const RegularCashoutStep2 = () => {
  const [params, setParams] = useState('');

  return (
    <div className={styles.regularCashoutstep2}>
      <Container fluid>
        <Row>
          <Col lg={6} className={styles.regularCashoutstep2__form}>
            <div className={styles.regularCashoutstep2__form__Logo}>
              <HeadLogo />
            </div>
            <div className={styles.regularCashoutstep2__form__headRow}>
              <LeftArrow />
              Back to dashboard
            </div>
            <div className={styles.regularCashoutstep2__form__content}>
              <div className={styles.regularCashoutstep2__form__content__heading}>
                🎉 You cashed-out $53.00
              </div>
              <div className={styles.regularCashoutstep2__form__content__descrip}>
                Please allow up to 72 hours while our team verifies your transaction.
                Check your email for confirmation, we’ll let you know when your cash is on it’s way!
              </div>
              <div className={styles.regularCashoutstep2__form__content__box}>
                <div className="d-flex">
                  <div className={styles.regularCashoutstep2__form__content__box__txt}>
                    <span>Transaction ID:</span>
                    013420
                  </div>
                  <div className={styles.regularCashoutstep2__form__content__box__txt}>
                    <span>Date:</span>
                    02/22/22
                  </div>
                </div>
                <div className="d-flex">
                  <div className={styles.regularCashoutstep2__form__content__box__txt}>
                    <span>Method:</span>
                    Venmo
                  </div>
                  <div className={styles.regularCashoutstep2__form__content__box__txt}>
                    <span>Account:</span>
                    @thisismaddy
                  </div>
                </div>
                <div className={styles.regularCashoutstep2__form__content__box__txt}>
                  <span>Amount:</span>
                  $53.00
                </div>
              </div>
              <div className={styles.regularCashoutstep2__form__content__problemTxt}>
                <div>Problem with your transaction?</div>
                Email help@groupshop.co and include your Transaction ID.
              </div>

              <hr />

              <div className={styles.regularCashoutstep2__form__content__bottom}>
                <p>
                  Have Questions?
                  {' '}
                  <a href="/">Peep our FAQ</a>
                </p>
                <div className={styles.regularCashoutstep2__form__content__social__media}>
                  <div className={styles.regularCashoutstep2__form__content__social__icons}>
                    <Instagram />
                    <Pinterest />
                    <Twitter />
                    <Facebook />
                  </div>
                  <div className={styles.regularCashoutstep2__form__content__link}>
                    <p>
                      Go to
                      {' '}
                      <a href="https://www.groupshop.com/">groupshop.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={6} className="p-0">
            <div className={styles.regularCashoutstep2__desktopImage}>
              <img src={QR.src} alt="QRImage" className="img-fluid" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegularCashoutStep2;
