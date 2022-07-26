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
import RightArrow from 'assets/images/rightArrow.svg';
import HausImg from 'assets/images/haus.svg';
import RightArrowBlack from 'assets/images/rightArrowBlack.svg';
import GSLogo from 'assets/images/groupshop-round-logo.svg';
import ToolTip from 'components/Buttons/ToolTip/ToolTip';
import { Link } from 'react-bootstrap-icons';
import Instagram from 'assets/images/instagram-with-border.svg';
import Pinterest from 'assets/images/pinterest-with-border.svg';
import Twitter from 'assets/images/twitter-with-border.svg';
import Facebook from 'assets/images/facebook-with-border.svg';

const RegularRewardsStep2 = () => {
  const [params, setParams] = useState('');

  return (
    <div className={styles.regularRewardsStep2}>
      <Container fluid>
        <Row>
          <Col lg={6} className={styles.regularRewardsStep2__form}>
            <div className={styles.regularRewardsStep2__form__Logo}>
              <HeadLogo />
            </div>
            <div className={styles.regularRewardsStep2__form__content}>
              <div className={styles.regularRewardsStep2__form__content__headRow}>
                <div className={styles.regularRewardsStep2__form__content__heading}>
                  Rewards Portal
                </div>
                <a target="_blank" className={styles.regularRewardsStep2__form__content__link}>
                  View Transaction History
                </a>
              </div>
              <hr />

              <div className={styles.regularRewardsStep2__form__content__acc}>
                <span>Account</span>
                <span className={styles.regularRewardsStep2__form__content__acc__email}>
                  maddy@groupshop.co
                </span>
              </div>

              <div className={styles.regularRewardsStep2__form__content__summaryTxt}>
                Hey Akwafina, here’s your rewards summary
              </div>
              <div className={styles.regularRewardsStep2__form__content__boxArea}>
                <div className={styles.regularRewardsStep2__form__content__boxArea__box1}>
                  <div className={styles.regularRewardsStep2__form__content__boxArea__box1__bTxt}>
                    $16
                  </div>
                  <div className={styles.regularRewardsStep2__form__content__boxArea__box1__txt}>
                    Rewards Balance
                  </div>
                </div>
                <div className={styles.regularRewardsStep2__form__content__boxArea__box2}>
                  <div className={styles.regularRewardsStep2__form__content__boxArea__box2__bTxt}>
                    🎉 Ready to claim your rewards?
                    <br />
                    It’s fast and secure!
                  </div>
                  <div className={styles.regularRewardsStep2__form__content__boxArea__box2__bottom}>
                    Cashout
                    <RightArrow />
                  </div>
                </div>
              </div>

              <div className={styles.regularRewardsStep2__form__content__grpTxt}>
                Your Groupshops
              </div>
              <hr />
              <div className={styles.regularRewardsStep2__form__content__grpRow}>
                <HausImg />
                <div className={styles.regularRewardsStep2__form__content__infoRow}>
                  <div className={styles.regularRewardsStep2__form__content__infoRow__top}>
                    <div className={styles.regularRewardsStep2__form__content__infoRow__top__rTxt}>
                      Haus Labs
                      <RightArrowBlack />
                    </div>
                    <div className={styles.regularRewardsStep2__form__content__infoRow__top__lTxt}>
                      <span>Order #</span>
                      1AD432
                    </div>
                  </div>
                  <div className={styles.regularRewardsStep2__form__content__infoRow__bot}>
                    <div className={styles.regularRewardsStep2__form__content__tag1}>
                      $428 generated
                    </div>
                    <div className={styles.regularRewardsStep2__form__content__tag2}>
                      👆 148 unique clicks
                    </div>
                    <div className={styles.regularRewardsStep2__form__content__tag3}>
                      ✨ 12 shoppers
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.regularRewardsStep2__form__content__seprator} />
              <div className={styles.regularRewardsStep2__form__content__grpRow}>
                <HausImg />
                <div className={styles.regularRewardsStep2__form__content__infoRow}>
                  <div className={styles.regularRewardsStep2__form__content__infoRow__top}>
                    <div className={styles.regularRewardsStep2__form__content__infoRow__top__rTxt}>
                      Haus Labs
                      <RightArrowBlack />
                    </div>
                    <div className={styles.regularRewardsStep2__form__content__infoRow__top__lTxt}>
                      <span>Order #</span>
                      1AD432
                    </div>
                  </div>
                  <div className={styles.regularRewardsStep2__form__content__infoRow__bot}>
                    <div className={styles.regularRewardsStep2__form__content__tag1}>
                      $428 generated
                    </div>
                    <div className={styles.regularRewardsStep2__form__content__tag2}>
                      👆 148 unique clicks
                    </div>
                    <div className={styles.regularRewardsStep2__form__content__tag3}>
                      ✨ 12 shoppers
                    </div>
                  </div>
                </div>
              </div>
              <hr className="mt-5" />

              <div className={styles.regularRewardsStep2__form__content__bottom}>
                <p>
                  Have Questions?
                  {' '}
                  <a href="/">Peep our FAQ</a>
                </p>
                <div className={styles.regularRewardsStep2__form__content__social__media}>
                  <div className={styles.regularRewardsStep2__form__content__social__icons}>
                    <Instagram />
                    <Pinterest />
                    <Twitter />
                    <Facebook />
                  </div>
                  <div className={styles.regularRewardsStep2__form__content__link}>
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
            <div className={styles.regularRewardsStep2__desktopImage}>
              <img src={QR.src} alt="QRImage" className="img-fluid" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegularRewardsStep2;
