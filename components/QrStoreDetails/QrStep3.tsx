import React, { Fragment } from 'react';
import Image from 'next/image';

// import styles
import styles from 'styles/QrStoreDetails.module.scss';

// import images
import HeadLogo from 'assets/images/QRLogo.svg';
import QR from 'assets/images/qr-screen-1.jpg';
import QRMobile from 'assets/images/qr-screen-mobile-1.jpg';
import YR from 'assets/images/YR.png';
import Instagram from 'assets/images/instagram-with-border.svg';
import Pinterest from 'assets/images/pinterest-with-border.svg';
import Twitter from 'assets/images/twitter-with-border.svg';
import Facebook from 'assets/images/facebook-with-border.svg';
import Smile from 'assets/images/smile.svg';
import { Container, Row, Col } from 'react-bootstrap';
// import shared component
import MarqueeSlider from 'components/Shared/MarqueeSlider/MarqueeSlider';

interface IStep3Props {
  dealLink: string;
  brandLogo: string;
}

export default function QrStep3({ dealLink, brandLogo }: IStep3Props) {
  return (
    <>
      <div className={styles.QRContainer}>
        <Container fluid>
          <Row>
            <Col md={6} sm={12} className="p-0">
              <div className={styles.QRContainer__form__wrapper}>
                <div className={styles.QRContainer__Logo}>
                  <HeadLogo />
                </div>
                {/* <div className={styles.QRContainer__YR__mobileLogo}>
                  <img src={brandLogo} style={{ width: 100 }} alt="Brand Logo" />
                </div> */}
                <div className={styles.QRContainer__mobileImage}>
                  <img src={QRMobile.src} alt="QR Right Screen" className="img-fluid" />
                </div>
                <div className={styles.QRContainer__content__container}>
                  <div className={styles.QRContainer__content__congratswrapper3}>
                    <div className={styles.QRContainer__content__congrats}>
                      <div className={styles.QRContainer__YR__Logo}>
                        <Smile />
                        <Smile />
                        <Smile />
                      </div>
                      <h2>
                        We couldn’t locate a Groupshop with this email!
                      </h2>
                      <p className="mt-3 mb-2">
                        <strong>Haven’t shopped on a Groupshop brand yet? </strong>
                        <br />
                        Check-out all the brands you’re eligible to
                        earn 100% cashback on your order with &nbsp;
                        <strong className={`${styles['QRContainer__content'
                          + '__congrats__cursorpointer']}`}
                        >
                          here.
                        </strong>
                      </p>
                    </div>
                  </div>
                  <div className={['', styles.QRContainer__bottom__content].join(' ')}>
                    <hr />
                    <p className={styles.question}>
                      Have Questions?
                      <a href="/">Peep our FAQ</a>
                    </p>
                    <div className={styles.QRContainer__social__media}>
                      <div className={styles.QRContainer__social__icons}>
                        <Instagram />
                        <Pinterest />
                        <Twitter />
                        <Facebook />
                      </div>
                      <div className={styles.QRContainer__link}>
                        <p>
                          Go to
                          <a href="/">groupshop.com</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={6} sm={12} className="p-0">
              <div className={styles.QRContainer__desktopImage}>
                <img src={QR.src} alt="QRImage" className="img-fluid" />
              </div>
            </Col>
          </Row>
        </Container>
        <MarqueeSlider />
      </div>
    </>
  );
}
