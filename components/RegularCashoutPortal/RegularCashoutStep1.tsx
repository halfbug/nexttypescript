import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import styles from 'styles/RegularCashout.module.scss';
import QR from 'assets/images/qr-screen-1.jpg';
import HeadLogo from 'assets/images/QRLogo.svg';
import LeftArrow from 'assets/images/left-arrow.svg';
import Instagram from 'assets/images/instagram-with-border.svg';
import Pinterest from 'assets/images/pinterest-with-border.svg';
import Twitter from 'assets/images/twitter-with-border.svg';
import Facebook from 'assets/images/facebook-with-border.svg';
import PayPalIcon from 'assets/images/paypal.svg';
import VenmoIcon from 'assets/images/venmo.svg';
import ZelleIcon from 'assets/images/zelle.svg';
import CashAppIcon from 'assets/images/cash-app.svg';

const RegularCashoutStep1 = () => {
  const [params, setParams] = useState('');

  return (
    <div className={styles.regularCashout}>
      <Container fluid>
        <Row>
          <Col lg={6} className={styles.regularCashout__form}>
            <div className={styles.regularCashout__form__Logo}>
              <HeadLogo />
            </div>
            <div className={styles.regularCashout__form__headRow}>
              <LeftArrow />
              Go Back
            </div>
            <div className={styles.regularCashout__form__content}>
              <div className={styles.regularCashout__form__content__heading}>
                Cash-out
              </div>
              <div className={styles.regularCashout__form__content__descrip}>
                Connect to one of the following payment methods to receive your rewards.
              </div>
              <div className={styles.regularCashout__form__content__amount}>
                <span>Amount: $</span>
                53.00
              </div>
              <div className={styles.regularCashout__form__content__cashoutMethod}>
                Select cash-out method 👇
              </div>
              <Row className="mt-4">
                <Col sm={6}>
                  <div className={[styles.regularCashout__form__content__paypalIcon, styles.regularCashout__form__content__btnDisabled].join(' ')}>
                    <PayPalIcon />
                  </div>
                </Col>
                <Col sm={6}>
                  <div className={styles.regularCashout__form__content__venmoIcon}>
                    <VenmoIcon />
                  </div>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col sm={6}>
                  <div className={[styles.regularCashout__form__content__zelleIcon, styles.regularCashout__form__content__btnDisabled].join(' ')}>
                    <ZelleIcon />
                  </div>
                </Col>
                <Col sm={6}>
                  <div className={[styles.regularCashout__form__content__cashAppIcon, styles.regularCashout__form__content__btnDisabled].join(' ')}>
                    <CashAppIcon />
                  </div>
                </Col>
              </Row>
              <div className={styles.regularCashout__form__content__howInput}>
                <div>
                  <InputGroup>
                    <FormControl
                      placeholder="@ Enter Venmo handle"
                      aria-label="Cash Out Method Email"
                      aria-describedby="basic-addon2"
                      className={styles.regularCashout__form__content__howInput__input}
                    />
                    <Button id="button-addon2" className={styles.regularCashout__form__content__howInput__howBtn}>
                      How?
                    </Button>
                  </InputGroup>
                </div>
                <Button className={styles.regularCashout__form__content__howInput__saveBtn}>
                  Save
                </Button>
              </div>

              <div className="mb-3">
                <Button
                  id="btn-cashout-diabled"
                  className={[styles.regularCashout__form__content__cashoutBtn, styles.regularCashout__form__content__cashoutBtn__disabled].join(' ')}
                >
                  Cash-out with Venmo
                </Button>
              </div>
              <div className="mb-3">
                <Button id="btn-cashout" className={styles.regularCashout__form__content__cashoutBtn}>
                  Cash-out with Venmo
                </Button>
              </div>
              <div className="mb-3">
                <Button
                  id="btn-cashout-diabled"
                  className={[styles.regularCashout__form__content__cashoutBtn, styles.regularCashout__form__content__cashoutBtn__processing].join(' ')}
                >
                  Processing....hold tight!
                </Button>
              </div>

              <div className={styles.regularCashout__form__content__unable}>
                <span>
                  Unable to use any of these methods?
                </span>
                <br />
                We’re working on providing new cash-out options soon! In the meantime,
                please reach out to our support team and we’ll do our best to help.
              </div>
              <hr />

              <div className={styles.regularCashout__form__content__bottom}>
                <p>
                  Have Questions?
                  {' '}
                  <a href="/">Peep our FAQ</a>
                </p>
                <div className={styles.regularCashout__form__content__social__media}>
                  <div className={styles.regularCashout__form__content__social__icons}>
                    <Instagram />
                    <Pinterest />
                    <Twitter />
                    <Facebook />
                  </div>
                  <div className={styles.regularCashout__form__content__link}>
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
            <div className={styles.regularCashout__desktopImage}>
              <img src={QR.src} alt="QRImage" className="img-fluid" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegularCashoutStep1;
