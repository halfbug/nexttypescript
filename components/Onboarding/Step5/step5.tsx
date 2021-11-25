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
    <Container className={styles.welcome}>
      <ProgressBar progress="100" />
      <Row className="my-4">
        <Col md={6} className={styles.leftbar}>
          <Row><Col><h5 className="">Congrats on creating your first</h5></Col></Row>
          <Row><Col><Logo /></Col></Row>
          <div className="w-75">
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
          <Row><Col><Button className="text-uppercase">Lets Go</Button></Col></Row>
        </Col>
        <Col md={6} className="align-middle">
          <Row className="border w-75">
            <Col className="align-middle">Free</Col>
            <Col>
              Explore
              <br />
              First 100 Groupshops
              <br />
              From us, for everyone.
              <br />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col className="align-middle">
              25¢
              <br />
              per Groupshops
            </Col>
            <Col>
              Launch
              <br />
              Up to 1,000 Groupshops
              <br />
              For small, ambitious businesses.
              <br />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col className="align-middle">
              20¢
              <br />
              per Groupshops
            </Col>
            <Col>
              Growth
              <br />
              Up to 2,500 Groupshops
              <br />
              For high-growth brands.
              <br />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col className="align-middle">
              10¢
              <br />
              per Groupshop
            </Col>
            <Col>
              Enterprise
              <br />
              2,500+ Groupshops
              <br />
              For leading companies.
              <br />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
    {/* </div> */}
  </Dialogue>
);

export default Step5;
