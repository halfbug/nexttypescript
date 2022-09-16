import React from 'react';

// import styles
import styles from 'styles/QrStoreDetails.module.scss';

// import images
import HeadLogo from 'assets/images/QRLogo.svg';
import QR from 'assets/images/qr-screen-1.jpg';
import QRMobile from 'assets/images/qr-screen-mobile-1.jpg';
import Smile from 'assets/images/smile.svg';
import { Container, Row, Col } from 'react-bootstrap';
// import shared component
import MarqueeSlider from 'components/Shared/MarqueeSlider/MarqueeSlider';
import Link from 'next/link';
import GroupshopRoundLogo1 from 'assets/images/groupshop-round-logo1.svg';
import SocialLinks from 'components/Shared/SocialLinks/SocialLinks';

export default function QrStep3() {
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
                <div className={styles.QRContainer__mobileImage}>
                  <img src={QRMobile.src} alt="QR Right Screen" className="img-fluid" />
                  <GroupshopRoundLogo1 className="img-fluid" />
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
                      {' '}
                      <Link
                        href={{
                          pathname: 'https://www.groupshop.com/drips',
                        }}
                      >
                        <a>Peep our FAQ</a>
                      </Link>
                    </p>
                    <div className={styles.QRContainer__social__media}>
                      <div className={styles.QRContainer__social__icons}>
                        <SocialLinks />
                      </div>
                      <div className={styles.QRContainer__link}>
                        <p>
                          Go to
                          {' '}
                          <Link href="https://www.groupshop.com/"><a target="_blank">groupshop.com</a></Link>
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
