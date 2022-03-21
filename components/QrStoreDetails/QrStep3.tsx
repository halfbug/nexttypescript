import React, { Fragment } from 'react';
import Image from 'next/image';

// import styles
import styles from 'styles/QrStoreDetails.module.scss';

// import images
import HeadLogo from 'assets/images/QRLogo.svg';
import QR2 from 'assets/images/qr-screen-2.png';
import QRMobile from 'assets/images/qr-screen-mobile-1.png';
import YR from 'assets/images/YR.png';
import Instagram from 'assets/images/instagram.svg';
import Pinterest from 'assets/images/pinterest.svg';
import Twitter from 'assets/images/twitter.svg';
import Facebook from 'assets/images/facebook.svg';
import { Container, Row, Col } from 'react-bootstrap';

interface IStep3Props {
  dealLink: string;
}

export default function QrStep3({ dealLink }: IStep3Props) {
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
                  <Image src={YR} alt="QR Right Screen" />
                </div>
                <div className={styles.QRContainer__mobileImage}>
                  <Image src={QRMobile} alt="QR Right Screen" layout="responsive" />
                </div>
                <div className={styles.QRContainer__content__container}>
                  <div className={styles.QRContainer__content__congrats}>
                    <div className={styles.QRContainer__YR__Logo}>
                      <Image src={YR} alt="QR Right Screen" />
                    </div>
                    <h2>🎉 Congrats, your Groupshop store is live!</h2>
                    <p>
                      <strong>Access exclusive discounts and share the link</strong>
                      {' '}
                      to your store with friends and followers to
                      {' '}
                      <strong>get up to 100% </strong>
                      cashback on your recent order whenever they shop on your
                      Groupshop.
                    </p>
                    <div className={styles.QRContainer__btn__goToStore}>
                      <a target="_blank" href={dealLink} rel="noreferrer">
                        Go to my Groupshop
                      </a>
                    </div>
                  </div>
                  <div className={styles.QRContainer__bottom__content}>
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
                  />
                </div>
              </div>
            </Col>

          </Row>
        </Container>
      </div>

    </>
  );
}
