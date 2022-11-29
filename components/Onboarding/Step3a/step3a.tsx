import React from 'react';
import Dialogue from 'components/Layout/Dialogue/dialogue';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import styles from 'styles/Step3.module.scss';
import LeftPanel from '../LeftPanel/LeftPanel1';
import ProgressBar from '../ProgressBar/ProgressBar';
import DiscoveryOnBoarding from './DiscoveryOnBoarding';

interface IStep3Props {
  show: boolean,
}

const Step3a = ({ show }: IStep3Props) => (
  <Dialogue show={show}>
    <Container className={styles.welcome}>
      <ProgressBar progress="67" />
      <Row className="my-4 d-flex align-items-center">
        <LeftPanel
          heading="Brand Discovery"
          content="Enable Discovery Tools to acquire new customers. We’ll refer your products on the Groupshop pages of other brands to potential customers that might fall in love with your brand!"
        />
        <Col className="text-sm-start mt-3 border-start" lg={7}>
          <DiscoveryOnBoarding />
        </Col>
      </Row>
    </Container>
  </Dialogue>
);

export default Step3a;
