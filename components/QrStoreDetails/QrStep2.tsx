/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';

// import react bootstrap components
import { Container, Row, Col } from 'react-bootstrap';

// import styles
import styles from 'styles/QrStoreDetails.module.scss';

// import images
import HeadLogo from 'assets/images/QRLogo.svg';
import QR from 'assets/images/qr-screen-1.jpg';
import QRMobile from 'assets/images/qr-screen-mobile-1.jpg';
import Arrow from 'assets/images/Arrow.svg';
import Link from 'next/link';
import GroupshopRoundLogo1 from 'assets/images/groupshop-round-logo1.svg';
import SocialLinks from 'components/Shared/SocialLinks/SocialLinks';

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
  const [customerName, setcustomerName] = useState('');

  useEffect(() => {
    if (activeGroupshops.length) {
      setcustomerName(`${activeGroupshops[0].customer?.firstName} ${activeGroupshops[0].customer?.lastName}`);
    }
  }, [activeGroupshops]);
  console.log('🚀 ~ file: QrStep2.tsx ~ line 30 ~ QrStep2 ~ activeGroupshops', activeGroupshops);
  return (
    <>
      <div className={styles.QRContainer}>
        <Container fluid className="p-0">
          <Row>
            <Col md={7} sm={12} className="p-0">
              <div className={styles.QRContainer__form__wrapper}>
                <div className={styles.QRContainer__Logo}>
                  <HeadLogo />
                </div>
                <div className={[' mx-2', styles.QRContainer__mobileImage].join(' ')}>
                  <img src={QRMobile.src} alt="QR Right Screen" className="img-fluid" />
                  <GroupshopRoundLogo1 className="img-fluid" />
                </div>
                <div
                  className={styles.QRContainer__content__container}
                >
                  <div className={styles.QRContainer__content__heading}>
                    <span>Account</span>
                    {email}
                  </div>
                  <hr className={styles.QRContainer__content__container__hr1} />
                  <h2 className={styles.QRContainer__content__container__title}>
                    Hey
                    {' '}
                    {customerName}
                    , here are all your Groupshops:
                  </h2>
                  {/* <div className={styles.QRContainer__content__container__groupshopTitle}>
                    Groupshops
                  </div> */}
                  <hr className={styles.QRContainer__content__container__hr2} />

                  <div className={styles.activeGroupshops}>
                    {
                      activeGroupshops.length && activeGroupshops.map((gs: any) => (
                        <Link
                          key={gs?.name}
                          href={gs?.groupshop?.url ? gs?.groupshop?.url : ''}
                        >
                          <a target="_blank" className={styles.cardItem}>
                            <div className={styles.cardItem__Wrapper}>
                              <div className={styles.cardImg}>
                                <img src={gs?.shop?.logoImage} className="img-fluid" alt="Brand Logo" />
                              </div>
                              <div className={styles.cardDetail}>
                                <h2>
                                  {gs?.shop?.brandName}
                                  <Arrow />
                                </h2>
                                <div className={styles.BtnGroup}>
                                  <button type="button" className={styles.cashbackBtn}>
                                    $
                                    {gs.refundDetail ? Math.abs(gs?.refundDetail.reduce((previousValue: any, currentValue: any) => (Number(previousValue) + Number(currentValue.amount)), 0)) : 0}
                                    {' '}
                                    cashback
                                  </button>
                                  <button type="button" className={styles.friendBtn}>
                                    ✨
                                    {` ${gs?.groupshop?.members.filter((m: any) => m.role === 'referral').length || 0} friends joined`}
                                  </button>
                                  {
                                  gs?.isExpired && (
                                  <button type="button" className={styles.cashbackBtn}>
                                    Expired
                                  </button>
                                  )
                                }
                                </div>
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
                      <Link
                        href={{
                          pathname: 'https://groupshop.zendesk.com/hc/en-us/sections/4429416770963-FAQ-How-To',
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
                        <p className={styles.email}>
                          Go to
                          {' '}
                          <Link href="https://www.groupshop.com/"><a target="_blank" className="p-0">groupshop.com</a></Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={5} className="p-0">
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
