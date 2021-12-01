import React from 'react';
import Dialogue from 'components/Layout/Dialogue/dialogue';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import styles from 'styles/Step5.module.scss';
import Button from 'components/Buttons/Button/Button';
import Logo from 'assets/images/Logo.svg';
import ProgressBar from '../ProgressBar/ProgressBar';

interface IStep5Props {
  show: boolean,
}

const Step5 = ({ show }: IStep5Props) => (
  <Dialogue show={show}>
    {/* <div className={styles.WelcomeModal}> */}
    <Container className={styles.letsgo}>
      <ProgressBar progress="100" />
      <Row className="my-4 ">
        <Col md={6} className="border-end pt-lg-5 mt-lg-5">
          <Row><Col><h5>Congrats on creating your first</h5></Col></Row>
          <Row><Col><Logo /></Col></Row>
          <div className="w-75 mb-lg-3">
            <Row className="mt-4"><Col><h6>You’re on the free plan</h6></Col></Row>
            <Row>
              <Col>
                {' '}
                You only pay for the amount of Groupshop pages
                your customers create. The first 100 are on us.

              </Col>

            </Row>
            <Row className="mt-4"><Col><h6>NEXT STEPS</h6></Col></Row>
            <Row>
              <Col>
                <ul>
                  <li>
                    Head to the
                    {' '}
                    <span className="fw-bold">Overview</span>
                    {' '}
                    dashboard to track your campaign’s progress
                  </li>
                  <li>
                    Check your
                    {' '}
                    <span className="fw-bold">Analytics</span>
                    {' '}
                    for advanced first-party data
                  </li>
                  <li>
                    Explore more features on the
                    {' '}
                    <span className="fw-bold">Settings</span>
                    {' '}
                    page
                  </li>
                </ul>
              </Col>
            </Row>
          </div>
          <Row><Col><Button>Lets Go</Button></Col></Row>
        </Col>
        <Col md={6} className={styles.letsgo__left}>
          <Row className={styles.letsgo__box}>
            <Col xs={4} className={styles.letsgo__box_col1}><h2>Free</h2></Col>
            <Col xs={8} className={styles.letsgo__box_col2}>
              <h2>Explore</h2>
              <p>
                First 100 Groupshops

                <p className="text-muted">From us, for everyone.</p>
              </p>
            </Col>
          </Row>
          <Row className={styles.letsgo__box}>
            <Col xs={4} className={styles.letsgo__box_col1}>
              <h2>25¢</h2>
              <p className="text-muted">
                per Groupshops

              </p>
            </Col>
            <Col xs={8} className={styles.letsgo__box_col2}>
              <h2>Launch</h2>
              <p>
                Up to 1,000 Groupshops
                <p className="text-muted">
                  For small, ambitious businesses.
                </p>
              </p>

            </Col>
          </Row>
          <Row className={styles.letsgo__box}>
            <Col xs={4} className={styles.letsgo__box_col1}>
              <h2>20¢</h2>
              <p className="text-muted">
                per Groupshops
              </p>
            </Col>
            <Col xs={8} className={styles.letsgo__box_col2}>
              <h2>Growth</h2>
              <p>
                Up to 2,500 Groupshops
                <p className="text-muted">
                  For high-growth brands.
                </p>
              </p>
            </Col>
          </Row>
          <Row className={styles.letsgo__box}>
            <Col xs={4} className={styles.letsgo__box_col1}>
              <h2>10¢</h2>
              <p className="text-muted">
                per Groupshop
              </p>
            </Col>
            <Col xs={8} className={styles.letsgo__box_col2}>
              <h2> Enterprise </h2>
              <p>
                2,500+ Groupshops
                <p className="text-muted">
                  For leading companies.
                </p>
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
    {/* </div> */}
  </Dialogue>
);

export default Step5;
