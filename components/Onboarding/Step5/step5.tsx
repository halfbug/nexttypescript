import React, { useState, useEffect } from 'react';
import Dialogue from 'components/Layout/Dialogue/dialogue';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import styles from 'styles/Step5.module.scss';
import Button from 'components/Buttons/Button/Button';
import { useMutation } from '@apollo/client';
import { UPDATE_STORE } from 'store/store.graphql';
import { IStore } from 'types/store';
import Logo from 'assets/images/Logo.svg';
import ConeEmoji from 'assets/images/Cone.svg';
import Conlogo from 'assets/images/screen 5.svg';
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
  console.log('@@@FinalStore', store);
  const [updateSt, { data, loading, error }] = useMutation<IStore>(UPDATE_STORE);
  // const { shop, id } = store;
  const shopName: string[] | undefined = store?.shop?.split('.', 1);
  // const shopNalo: string | undefined = shopName?[0];

  const handleClick = async () => {
    setShow(!show);
    console.log('...handleClick', store);
    await updateSt({
      variables: {
        updateStoreInput: {
          id: store.id,
          installationStep: null,
        },
      },
    });
    dispatch({ type: 'CLOSE_DIALOUGE', payload: { show, installationStep: null } });
    // dispatch({ type: 'CLOSE_DIALOUGE', payload: { show } });
    console.log('....handleClick', store);
    Router.push(`/${shopName}/overview`);
  };
  return (
    <Dialogue show={show}>
      {/* <div className={styles.WelcomeModal}> */}
      <Container className={styles.letsgo}>
        <ProgressBar progress="100" />
        <Row className="my-4 d-flex align-items-center">

          <Col lg={6} className="border-end  mt-lg-5 mr-0 d-flex align-items-center">
            <Row>
              <Conlogo />
              <div className="mb-lg-3">
                <Row className="mt-4"><Col><h6 className="fw-bold fs-4">You’re on the free plan</h6></Col></Row>
                <Row>
                  <Col>
                    {' '}
                    You only pay for the amount of Groupshop pages
                    your customers create. The first 100 are on us.

                  </Col>

                </Row>
                <Row className="mt-4"><Col><h6 className="fw-bold fs-4">Next Steps</h6></Col></Row>
                <Row>
                  <Col>
                    <ul>
                      <li className="fs-6">
                        Head to the
                        {' '}
                        <span className="fw-bold fs-5">Overview</span>
                        {' '}
                        dashboard to track your campaign’s progress
                      </li>
                      <li className="fs-6">
                        Check your
                        {' '}
                        <span className="fw-bold fs-5">Analytics</span>
                        {' '}
                        for advanced first-party data
                      </li>
                      <li className="fs-6">
                        Explore more features on the
                        {' '}
                        <span className="fw-bold fs-5">Settings</span>
                        {' '}
                        page
                      </li>
                    </ul>
                  </Col>
                </Row>
              </div>
              <Row><Col><Button onClick={handleClick}>Lets Go</Button></Col></Row>
            </Row>

            {/* <Row>
              <Row>
                <Col lg={3}>
                  {' '}
                  <BrandlogoBlack className="me-5" />
                </Col>
                <Col className=" d-inline m-4" lg={6}>
                  <ConeEmoji />
                  <h5 className=" mt-3 mx-3 fw-bold text-nowarp">
                    Congrats on creating
                  </h5>
                  <Logo className=" mx-3" />
                </Col>
              </Row>
              <div className="mb-lg-3">
                <Row className="mt-4">
                <Col><h6 className="fw-bold fs-4">You’re on the free plan</h6></Col></Row>
                <Row>
                  <Col>
                    {' '}
                    You only pay for the amount of Groupshop pages
                    your customers create. The first 100 are on us.

                  </Col>

                </Row>
                <Row className="mt-4"><Col><h6 className="fw-bold fs-4">Next Steps</h6></Col></Row>
                <Row>
                  <Col>
                    <ul>
                      <li className="fs-6">
                        Head to the
                        {' '}
                        <span className="fw-bold fs-5">Overview</span>
                        {' '}
                        dashboard to track your campaign’s progress
                      </li>
                      <li className="fs-6">
                        Check your
                        {' '}
                        <span className="fw-bold fs-5">Analytics</span>
                        {' '}
                        for advanced first-party data
                      </li>
                      <li className="fs-6">
                        Explore more features on the
                        {' '}
                        <span className="fw-bold fs-5">Settings</span>
                        {' '}
                        page
                      </li>
                    </ul>
                  </Col>
                </Row>
              </div>
              <Row><Col><Button onClick={handleClick}>Lets Go</Button></Col></Row>
            </Row> */}

          </Col>

          <Col lg={6} className={styles.letsgo__left}>
            <Row className={styles.box_row}>
              <Col className={styles.box_1}>
                <h2 className="fw-bold mb-0 py-0">Explore</h2>
                <div className="d-flex justify-content-center">
                  <div className={styles.free}>Free</div>
                </div>
                <p className="mb-4 mt-0 py-0">First 100 Groupshops</p>
              </Col>
              <Col className={styles.box_4}>
                <h2 className="fw-bold mb-0 py-0">Launch</h2>
                <div className="d-flex justify-content-center">
                  <div className={styles.btn}>25¢ per Groupshop</div>
                </div>
                <p className="mb-4 mt-0 py-0">
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
                <h2 className="fw-bold mb-0 py-0">Growth</h2>
                <div className="d-flex justify-content-center">
                  <div className={styles.btn}>20¢ per Groupshop</div>
                </div>
                <p className="mb-4 mt-0 py-0">
                  Up to 2,500 Groupshops
                  {' '}
                  <br />
                  {' '}
                  per month

                </p>
              </Col>
              <Col className={styles.box_2}>
                <h2 className="fw-bold mb-0 py-0">Unicorn</h2>
                <div className="d-flex justify-content-center">
                  <div className={styles.btn}>10¢ per Groupshop</div>
                </div>
                <p className="mb-4 mt-0 py-0">
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
