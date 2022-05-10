import React, { Fragment } from 'react';
import Image from 'next/image';

// import styles
import styles from 'styles/QrStoreDetails.module.scss';

// import images
import HeadLogo from 'assets/images/QRLogo.svg';
import QR2 from 'assets/images/qr-screen-2.png';
import QRMobile from 'assets/images/qr-screen-mobile-1.png';
import YR from 'assets/images/YR.png';
import Instagram from 'assets/images/instagram-with-border.svg';
import Pinterest from 'assets/images/pinterest-with-border.svg';
import Twitter from 'assets/images/twitter-with-border.svg';
import Facebook from 'assets/images/facebook-with-border.svg';
import { Container, Row, Col } from 'react-bootstrap';
import Cone from 'assets/images/small-cone.svg';
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
            <Col md={6}>
              <div className={styles.QRContainer__form__wrapper}>
                <div className={styles.QRContainer__Logo}>
                  <HeadLogo />
                </div>
                <div className={styles.QRContainer__YR__mobileLogo}>
                  <img src={brandLogo} style={{ width: 100 }} alt="Brand Logo" />
                </div>
                <div className={styles.QRContainer__mobileImage}>
                  <img src={brandLogo} style={{ width: 100 }} alt="Brand Logo" />
                </div>
                <div className={styles.QRContainer__content__container}>
                  <div className={styles.QRContainer__content__congrats}>
                    <div className={styles.QRContainer__YR__Logo}>
                      <img src={brandLogo} style={{ width: 100 }} alt="Brand Logo" />
                    </div>
                    <h2>
                      {' '}
                      <Cone height="25" width="25" />
                      Congrats, your Groupshop store is live!

                    </h2>
                    <p className="mt-3 mb-2">
                      <strong>Access exclusive discounts and share the link</strong>
                      {' '}
                      to your store with friends and followers to
                      {' '}
                      <strong>get up to 100%  cashback </strong>
                      on your recent order whenever they shop on your
                      Groupshop.
                    </p>
                    <div className={[' mb-3', styles.QRContainer__btn__goToStore].join(' ')}>
                      <a target="_blank" href={dealLink} rel="noreferrer">
                        Go to my Groupshop
                      </a>
                    </div>
                  </div>
                  <div className={[' mt-5 pt-5', styles.QRContainer__bottom__content].join(' ')}>
                    <hr />
                    <p>
                      Have Questions?
                      {' '}
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
                          {' '}
                          <a href="/">groupshop.com</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={6} className="p-0">
              <div className={styles.QRContainer__contentImage}>
                <div className={styles.QRContainer__desktopImage}>
                  <Image
                    src={QR2}
                    alt="QR Right Screen"
                    width="100%"
                    height="100%"
                    layout="responsive"
                    className={styles.QRContainer__fit__imageQR3}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <MarqueeSlider />
      </div>
    </>
  );
}
