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
        <Row className="my-4 ">
          <Col md={6} className="border-end pt-lg-5 mt-lg-5">
            <Row>
              <Col md={3}>
                {' '}
                <BrandlogoBlack className="mt-3" />
              </Col>
              <Col className="m-4" md={7}>
                <h5 className="mt-3">
                  <ConeEmoji />
                  {' '}
                  Congrats on creating your first
                </h5>
                <Logo className="mt-2 m-3" />
              </Col>
            </Row>
            <div className="w-75 mb-lg-3">
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
          </Col>
          <Col md={6} className={styles.letsgo__left}>
            <Row className={styles.box_row}>
              <Col className={styles.side_box}>
                <h2>Explore</h2>
                <Button className={styles.free}>Free</Button>
                <p>First 100 Groupshops</p>
              </Col>
              <Col className={styles.side_box}>
                <h2>Launch</h2>
                <Button className={styles.btn}>25¢ per Groupshop</Button>
                <p>
                  Up to 1,000 Groupshops
                  {' '}
                  <br />
                  {' '}
                  per month
                </p>
              </Col>
            </Row>
            <Row className={styles.box_row}>
              <Col className={styles.side_box}>
                <h2>Growth</h2>
                <Button className={styles.btn}>20¢ per Groupshop</Button>
                <p>
                  Up to 2,500 Groupshops
                  {' '}
                  <br />
                  {' '}
                  per month

                </p>
              </Col>
              <Col className={styles.side_box}>
                <h2>Unicorn</h2>
                <Button className={styles.btn}>10¢ per Groupshop</Button>
                <p>
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
