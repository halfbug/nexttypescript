import React from 'react';
import Dialogue from 'components/Layout/Dialogue/dialogue';
import {
  Container, Row,
} from 'react-bootstrap';
import styles from 'styles/Step1.module.scss';
import Rewards from 'components/Forms/Rewards';
import LeftPanel from '../LeftPanel/LeftPanel';
import ProgressBar from '../ProgressBar/ProgressBar';

interface IStep3Props {
  show: boolean,
}

const Step3 = ({ show }: IStep3Props) => (
  <Dialogue show={show}>
    {/* <div className={styles.WelcomeModal}> */}
    <Container className={styles.welcome}>
      <ProgressBar progress="75" />
      <Row className="my-4">
        <LeftPanel
          heading="Create a Groupshop"
          content="Now, let’s set up your first Groupshop campaign so you can start making sales."
        />
        <Rewards />
      </Row>
    </Container>
    {/* </div> */}
  </Dialogue>
);

export default Step3;
