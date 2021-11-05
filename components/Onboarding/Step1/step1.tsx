import BrandInfo from 'components/Forms/BrandInfo';
import Dialogue from 'components/Layout/Dialogue/dialogue';
import React from 'react';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import styles from 'styles/Step1.module.scss';
import LeftPanel from '../LeftPanel/LeftPanel';
import ProgressBar from '../ProgressBar/ProgressBar';

interface IStep0Props {
  show: boolean,
}

const Step1 = ({ show }: IStep0Props) => (
  <Dialogue show={show}>
    {/* <div className={styles.WelcomeModal}> */}
    <Container className={styles.welcome}>
      <ProgressBar progressWidth="20%" />
      <Row className="my-4">
        <LeftPanel
          heading="Define your brand"
          content="Make your brand stand out by adding your brand name, logo, and
          industry."
        />
        <Col className="text-sm-start" md={9}>
          <BrandInfo />
        </Col>
      </Row>
    </Container>
    {/* </div> */}
  </Dialogue>
);

export default Step1;
