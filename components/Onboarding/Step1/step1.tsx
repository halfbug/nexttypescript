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
    <ProgressBar progress="25" />
    {/* <div className={styles.WelcomeModal}> */}
    <Container className={styles.welcome}>

      <Row className="my-4">
        <LeftPanel
          heading="About the brand"
          content="Tell us who you are by adding your brand name, logo, and industry."
        />
        <Col className="text-sm-start mt-3" md={8}>
          <BrandInfo />
        </Col>
      </Row>
    </Container>
    {/* </div> */}
  </Dialogue>
);

export default Step1;
