import React, { useState, useEffect } from 'react';
import Dialogue from 'components/Layout/Dialogue/dialogue';
import {
  Container, Row, Col, Spinner,
} from 'react-bootstrap';
import styles from 'styles/Step5.module.scss';
import Button from 'components/Buttons/Button/Button';
import { useMutation } from '@apollo/client';
import { BILLING_SUBSCRIPTION, UPDATE_STORE } from 'store/store.graphql';
import { IStore } from 'types/store';
import Logo from 'assets/images/Logo.svg';
import { StoreContext } from 'store/store.context';
import Router from 'next/router';
import BrandlogoBlack from 'assets/images/brandmark1.svg';
import ProgressBar from '../ProgressBar/ProgressBar';

interface IStep5Props {
  show: boolean,
}

const Step5 = () => {
  const [show, setShow] = useState(true);
  const { store, dispatch } = React.useContext(StoreContext);
  // console.log('@@@FinalStore', store);
  const [updateSt, { data, loading, error }] = useMutation<IStore>(UPDATE_STORE);
  const [getSubscription,
    { data: sdata, loading: sloading, error: serror }] = useMutation<IStore>(BILLING_SUBSCRIPTION);
  // console.log('🚀 ~ file: step5.tsx ~ line 28 ~ Step5 ~ sdata', sdata);
  // // const { shop, id } = store;
  // const shopName: string[] | undefined = store?.shop?.split('.', 1);
  // // const shopNalo: string | undefined = shopName?[0];

  const [loader, setloader] = useState<boolean>(false);

  const handleClick = async () => {
    console.log('...handleClick', store);

    setloader(true);

    await getSubscription({
      variables: {
        shop: store.shop,
        accessToken: store.accessToken,

      },
    });
    // setShow(!show);
    await updateSt({
      variables: {
        updateStoreInput: {
          id: store.id,
          installationStep: null,
        },
      },
    });

    // dispatch({ type: 'CLOSE_DIALOUGE', payload: { show } });
    console.log('....handleClick', store);
    // dispatch({ type: 'CLOSE_DIALOUGE', payload: { show, installationStep: null } });
    // Router.push(`/${shopName}/overview`);
  };
  useEffect(() => {
    if (sdata) {
      const { billingSubscription: { redirectUrl } } = sdata;
      // dispatch({ type: 'CLOSE_DIALOUGE', payload: { show, installationStep: null } });
      console.log({ redirectUrl });
      Router.push(redirectUrl);
    }
  }, [sdata]);

  return (
    <Dialogue show={show}>
      {/* <div className={styles.WelcomeModal}> */}
      <Container className={styles.letsgo}>
        <ProgressBar progress="100" />
        <Row className="my-4 d-flex align-items-center">

          <Col lg={6} className="d-flex align-items-center border-end mt-lg-5 mr-0 ">
            <Row>
              <div className={styles.letsgo__box_logo}>
                {' '}
                <BrandlogoBlack />
                <Logo />
                {' '}
              </div>
              <div className="mb-lg-3">
                <Row className="mt-4"><Col><div className={styles.letsgo__box_heading}>You’re on the free plan</div></Col></Row>
                <Row>
                  <Col className={styles.letsgo__box_detil}>
                    You only pay for the amount of Groupshop pages
                    your customers create. The first 100 are on us.
                  </Col>

                </Row>
                <Row className="mt-4"><Col><div className={styles.letsgo__box_heading}>Next Steps</div></Col></Row>
                <Row>
                  <Col>
                    <ul>
                      <li className={styles.letsgo__box_detil}>
                        Head to the
                        {' '}
                        <span className="fw-bolder">Overview</span>
                        {' '}
                        dashboard to track your campaign’s progress
                      </li>
                      <li className={styles.letsgo__box_detil}>
                        Check your
                        {' '}
                        <span className="fw-bolder">Analytics</span>
                        {' '}
                        for advanced first-party data
                      </li>
                      <li className={styles.letsgo__box_detil}>
                        Explore more features on the
                        {' '}
                        <span className="fw-bolder">Settings</span>
                        {' '}
                        page
                      </li>
                    </ul>
                  </Col>
                </Row>
              </div>
              <Row>
                <Col>
                  {loader ? <Spinner animation="border" variant="primary" />
                    : (
                      <Button onClick={handleClick} className={styles.letsgo_btn_letgo}>
                        Let's Go
                      </Button>
                    )}
                </Col>

              </Row>
            </Row>

          </Col>
          <Col lg={6} className={['mt-5', styles.letsgo__left].join(' ')}>
            <Row className={styles.box_row}>
              <Col className={styles.box_1}>
                <div className={styles.box_row_boxheading}>Explore</div>
                <div className="d-flex justify-content-center">
                  <div className={styles.free}>Free</div>
                </div>
                <p className="my-1">First 30 Days</p>
              </Col>
              <Col className={styles.box_4}>
                <div className={styles.box_row_boxheading}>Launch</div>
                <div className="d-flex justify-content-center">
                  <div className={styles.btn}>25¢ per Groupshop</div>
                </div>
                <p className="mt-1">
                  Up to 1,000 Groupshops
                  {' '}
                  <br />
                  {' '}
                  per month
                </p>
              </Col>
            </Row>
            <Row className={styles.box_row}>
              <Col className={styles.box_3}>
                <div className={styles.box_row_boxheading}>Growth</div>
                <div className="d-flex justify-content-center">
                  <div className={styles.btn}>20¢ per Groupshop</div>
                </div>
                <p className="mt-1">
                  Up to 2,500 Groupshops
                  {' '}
                  <br />
                  {' '}
                  per month

                </p>
              </Col>
              <Col className={styles.box_2}>
                <div className={styles.box_row_boxheading}>Unicorn</div>
                <div className="d-flex justify-content-center">
                  <div className={styles.btn}>10¢ per Groupshop</div>
                </div>
                <p className="mt-1">
                  2,500+ Groupshops
                  {' '}
                  <br />
                  {' '}
                  per month

                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Dialogue>
  );
};

export default Step5;
