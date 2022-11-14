import React, { useState, useEffect, useContext } from 'react';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import styles from 'styles/QrStoreDetails.module.scss';
import HeadLogo from 'assets/images/QRLogo.svg';
import LeftArrow from 'assets/images/back-arrow-icon.svg';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import SocialLinks from 'components/Shared/SocialLinks/SocialLinks';
import { StoreContext } from 'store/store.context';
import useStore from 'hooks/useStore';
import useCode from 'hooks/useCode';
import QrWelcomeScreen from './QrWelcomeScreen';
import QrAuthScreen from './QrAuthScreen';
import QrErrorScreen from './QrErrorScreen';
import QrRight from './QrRight';

interface IValues {
  brandName: string;
  banner: string;
  logoImage: string;
  storeLink: string;
}

export default function QrCodeCommon() {
  const loadStore = useStore();
  const { shop } = useCode();
  const { store, dispatch } = useContext(StoreContext);

  const [ShowWelcome, setShowWelcome] = useState(true);
  const [ShowAuth, setShowAuth] = useState(false);
  const [ShowError, setShowError] = useState(false);
  const [state, setstate] = useState({
    brandName: '',
    logoImage: '',
    banner: '',
    storeLink: '',
  });

  const [activeGroupshops, setactiveGroupshops] = useState([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (store.brandName) {
      const newState: IValues = {
        brandName: store?.brandName!,
        banner: store?.settings?.general?.imageUrl!,
        logoImage: store?.logoImage!,
        storeLink: store?.shop!,
      };
      setstate({ ...newState });
    }
  }, [store]);

  return (
    <div className={styles.QRContainer__content__container}>
      <div className={styles.QRContainer}>
        <Container fluid>
          <Row>
            <Col md={7} sm={12} className="p-0">
              { ShowAuth
                && (
                  <div>
                    <Link
                      href={{
                        pathname: '/qr-code/[shop]',
                        query: { shop },
                      }}
                    >
                      <a
                        href=""
                        onClick={() => {
                          setShowWelcome(true);
                          setShowAuth(false);
                        }}
                      >
                        {/* <LeftArrow size={12}/> */}
                        <FaArrowLeft className="m-3" size={18} />
                      </a>
                    </Link>
                  </div>
                )}
              <div className={[styles.QRContainer__Logo, 'ms-4 ps-2 mt-5'].join(' ')}>
                { ShowAuth ? <HeadLogo /> : state.logoImage !== '' && (
                <Link
                  href={{
                    pathname: `https://${state.storeLink}`,
                  }}
                >
                  <a target="_blank">
                    <img width="200" style={{ cursor: 'pointer' }} src={state.logoImage} alt="brand_logo" />
                  </a>
                </Link>
                ) }
              </div>
              <div className={styles.QRContainer__form__wrapper}>

                <div style={{ backgroundImage: `url(${state.banner})` }} className={styles.QRContainer__mobileImage}>
                  {/* <img src={state.banner} alt="" className="img-fluid" /> */}
                  <QrRight />
                </div>
                { ShowWelcome && (
                  <QrWelcomeScreen
                    setShowWelcome={setShowWelcome}
                    setShowAuth={setShowAuth}
                    setShowError={setShowError}
                    setactiveGroupshops={setactiveGroupshops}
                    setEmail={setEmail}
                    brandName={state.brandName}
                  />
                )}
                { ShowAuth && (
                  <QrAuthScreen
                    activeGroupshops={activeGroupshops}
                    email={email}
                    brandName={state.brandName}
                  />
                )}
                { ShowError && (
                <QrErrorScreen
                  brandName={state.brandName}
                  setShowWelcome={setShowWelcome}
                  setShowError={setShowError}
                  shop={shop}
                  storeLink={state.storeLink}
                />
                )}
                <div className={styles.QRContainer__bottom__content}>
                  <hr />
                  <div className={[styles.QRContainer__social__media, 'mb-2 row '].join(' ')}>
                    <div className={[styles.QRContainer__social__icons, 'mt-2 col-6 d-flex justify-content-start'].join(' ')}>
                      <SocialLinks />
                    </div>
                    <div className={[styles.QRContainer__link, ' col-6 d-flex justify-content-end'].join(' ')}>
                      <div className="d-flex align-items-end mt-2">
                        <p className={[styles.question, ''].join(' ')}>
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
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className={[styles.QRContainer__social__media, ''].join('')}>
                    <div className={styles.QRContainer__social__icons}>
                      <p>
                        Powered by
                        {' '}
                        <HeadLogo />
                      </p>
                    </div>
                    <div className={styles.QRContainer__link}>
                      <p>
                        Learn more at
                        {' '}
                        <Link href="https://www.groupshop.com/"><a target="_blank" className="p-0">groupshop.com</a></Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={5} sm={12} className="p-0">
              <div
                className={styles.QRContainer__desktopImage}
                style={{ backgroundImage: `url(${state.banner})` }}
              >
                {/* <img src={state.banner} alt="QRImage" className="img-fluid" /> */}
                <QrRight />
              </div>
              {/* This Banner should be in background */}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
