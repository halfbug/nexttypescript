import React from 'react';
import Dialogue from 'components/Layout/Dialogue/dialogue';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import styles from 'styles/Step1.module.scss';
import OBCampaign from 'components/Forms/OBCampaign';
import LeftPanel from '../LeftPanel/LeftPanel';
import ProgressBar from '../ProgressBar/ProgressBar';

interface IStep0Props {
  show: boolean,
}

const Step2 = ({ show }: IStep0Props) => (
  <Dialogue show={show}>
    {/* <div className={styles.WelcomeModal}> */}
    <Container className={styles.welcome}>
      <ProgressBar progress="50" />
      <Row className="my-4 d-flex align-items-center">
        <LeftPanel
          heading="Create a Groupshop"
          content="Now, let’s set up your first Groupshop campaign so you can start making
          sales."
        />
        <Col className="text-sm-start mt-3 border-start" lg={7}>
          <OBCampaign />
        </Col>
      </Row>
    </Container>
    {/* </div> */}
  </Dialogue>
);

export default Step2;
