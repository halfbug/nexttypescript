import React from 'react';

// import react bootstrap components
import { Container, Row, Col } from 'react-bootstrap';

// import styles
import styles from 'styles/QrStoreDetails.module.scss';

// import images
import HeadLogo from 'assets/images/QRLogo.svg';
import QR from 'assets/images/qr-screen-1.jpg';
import QRMobile from 'assets/images/qr-screen-mobile-1.jpg';
import Instagram from 'assets/images/instagram-with-border.svg';
import Pinterest from 'assets/images/pinterest-with-border.svg';
import Twitter from 'assets/images/twitter-with-border.svg';
import Facebook from 'assets/images/facebook-with-border.svg';
import Arrow from 'assets/images/Arrow.svg';
import Link from 'next/link';

// import shared component

interface IStep2Props {
  activeGroupshops: any;
  email: string;
}
export default function QrStep2(
  {
    activeGroupshops, email,
  }: IStep2Props,
) {
  console.log('🚀 ~ file: QrStep2.tsx ~ line 30 ~ QrStep2 ~ activeGroupshops', activeGroupshops);
  return (
    <>
      <div className={styles.QRContainer}>
        <Container fluid className="p-0">
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
                  <div className={styles.QRContainer__content__heading}>
                    <span>Account</span>
                    {email}
                  </div>
                  <hr className={styles.QRContainer__content__container__hr1} />
                  <h2 className={styles.QRContainer__content__container__title}>
                    Hey Akwafina, here are all your Groupshops:
                  </h2>
                  <div className={styles.QRContainer__content__container__groupshopTitle}>
                    Active Groupshops
                  </div>
                  <hr className={styles.QRContainer__content__container__hr2} />

                  <div className={styles.activeGroupshops}>
                    {
                      activeGroupshops.length && activeGroupshops.map((gs: any) => (
                        <Link
                          href={gs?.groupshops[0]?.url ? gs?.groupshops[0]?.url : ''}
                        >
                          <a target="_blank" className={styles.cardItem}>
                            <div className={styles.cardImg}>
                              <img src={gs?.shop?.logoImage} style={{ width: 100 }} alt="Brand Logo" />
                            </div>
                            <div className={styles.cardDetail}>
                              <h2>
                                {gs?.shop?.brandName}
                                <Arrow />
                              </h2>
                              <div className={styles.BtnGroup}>
                                <button type="button" className={styles.cashbackBtn}>$38 cashback</button>
                                <button type="button" className={styles.friendBtn}>
                                  ✨
                                  {` ${gs?.groupshops[0]?.members.filter((m: any) => m.role === 'referral').length || 0} friends joined`}
                                </button>
                              </div>
                            </div>
                            <div className={styles.order}>
                              <p>
                                <span>Order #</span>
                                <span>{gs.name.replace('#', '')}</span>
                              </p>
                            </div>
                          </a>
                        </Link>
                      ))
                    }
                  </div>
                  <div className={styles.QRContainer__bottom__content}>
                    <hr className={styles.QRContainer__bottom__content_hr3} />
                    <p className={styles.question}>
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
                        <p className={styles.email}>
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
              <div className={styles.QRContainer__desktopImage}>
                <img src={QR.src} alt="QRImage" className="img-fluid" />
              </div>
            </Col>
          </Row>
        </Container>
        {/* <MarqueeSlider /> */}
      </div>
    </>
  );
}
