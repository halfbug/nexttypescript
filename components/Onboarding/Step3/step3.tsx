import React from 'react';
import Dialogue from 'components/Layout/Dialogue/dialogue';
import {
  Container, Row,
} from 'react-bootstrap';
import styles from 'styles/Step1.module.scss';
import Rewards from 'components/Forms/Rewards';
import LeftPanel from '../LeftPanel/LeftPanel1';
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
          heading="Set your rewards"
          content="Set the discounts and cashback your customers will earn through Groupshop.
                  Our engine dynamically adjusts your
                  rewards percentages for you so that you’re always winning, and so are your customers.."
        />
        <Rewards />
      </Row>
    </Container>
    {/* </div> */}
  </Dialogue>
);

export default Step3;
