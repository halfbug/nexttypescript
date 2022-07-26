import React, { useState } from 'react';
import Dialogue from 'components/Layout/Dialogue2/dialogue';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap';
import styles from 'styles/InfluencerCashout.module.scss';
import QR from 'assets/images/qr-screen-1.jpg';
import HeadLogo from 'assets/images/QRLogo.svg';
import GSLogo from 'assets/images/groupshop-round-logo.svg';
import ToolTip from 'components/Buttons/ToolTip/ToolTip';
import { Link } from 'react-bootstrap-icons';
import Instagram from 'assets/images/instagram-with-border.svg';
import Pinterest from 'assets/images/pinterest-with-border.svg';
import Twitter from 'assets/images/twitter-with-border.svg';
import Facebook from 'assets/images/facebook-with-border.svg';

const RegularRewardsStep1 = () => {
  const [params, setParams] = useState('');

  return (
    <div className={styles.regularRewards}>
      <Container fluid>
        <Row>
          <Col lg={6} className={styles.regularRewards__form}>
            <div className={styles.regularRewards__Logo}>
              <HeadLogo />
            </div>
            <div className={styles.regularRewards__form__logo}>
              <GSLogo />
            </div>
            <div className={styles.regularRewards__form__heading}>
              Ready to check
              your Groupshop rewards?
            </div>
            <div className={styles.regularRewards__desktopImage1}>
              <img src={QR.src} alt="QRImage" className="img-fluid" />
            </div>
            <div className={styles.regularRewards__form__container}>
              <Form noValidate>
                <Form.Group className="mb-4">
                  <div className={styles.regularRewards__text__how}>
                    <Form.Label>Email</Form.Label>
                    <a>
                      {' '}
                      <ToolTip
                        className={styles.dashboard_campaign__pop}
                        label="How?"
                        popContent="Enter the email address used for your order."
                      />
                    </a>

                  </div>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                  />
                  <Form.Control.Feedback type="invalid">
                    Errors here
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-4">
                  <div className={styles.regularRewards__text__how}>
                    <Form.Label>Order Number</Form.Label>
                    <a>
                      {' '}
                      <ToolTip
                        className={styles.dashboard_campaign__pop}
                        label="How?"
                        popContent="You can find your order number on the order confirmation email from the brand you used Groupshop with as well as the order summary slip included in your package."
                      />
                    </a>

                  </div>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                  />
                  <Form.Control.Feedback type="invalid">
                    Errors here
                  </Form.Control.Feedback>
                </Form.Group>
                <div className={styles.regularRewards__btnGroupShop}>
                  <Button type="submit">View my rewards</Button>
                </div>
              </Form>
            </div>
            <div className={styles.regularRewards__bottom__content}>
              <hr />
              <p>
                Are you a Groupshop brand partner?
                {' '}
                <a href="/">Login here instead</a>
              </p>
              <div className={styles.regularRewards__social__media}>
                <div className={styles.regularRewards__social__icons}>
                  <Instagram />
                  <Pinterest />
                  <Twitter />
                  <Facebook />
                </div>
                <div className={styles.regularRewards__link}>
                  <p>
                    Go to
                    {' '}
                    <a href="https://www.groupshop.com/">groupshop.com</a>
                  </p>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={6} className="p-0">
            <div className={styles.regularRewards__desktopImage}>
              <img src={QR.src} alt="QRImage" className="img-fluid" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegularRewardsStep1;
