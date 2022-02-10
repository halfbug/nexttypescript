import React from 'react';
import Dialogue from 'components/Layout/Dialogue/dialogue';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import styles from 'styles/Step3.module.scss';
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
      <Row className="my-4 d-flex align-items-center">
        <LeftPanel
          heading="Set your rewards"
          content="Set the discounts and cashback your customers will earn through Groupshop.
                  Our engine dynamically adjusts your
                  rewards percentages for you so that you’re always winning, and so are your customers."
        />
        <Col className="text-sm-start mt-3 border-start" lg={7}>
          <Rewards />
        </Col>
      </Row>
    </Container>
    {/* </div> */}
  </Dialogue>
);

export default Step3;
