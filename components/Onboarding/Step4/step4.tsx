import React from 'react';
import Dialogue from 'components/Layout/Dialogue/dialogue';
import {
  Container, Row,
} from 'react-bootstrap';
import styles from 'styles/Step4.module.scss';
import Settings from 'components/Forms/Settings';
import LeftPanel from '../LeftPanel/LeftPanel';
import ProgressBar from '../ProgressBar/ProgressBar';

interface IStep4Props {
  show: boolean,
}

const Step4 = ({ show }: IStep4Props) => (
  <Dialogue show={show}>
    {/* <div className={styles.WelcomeModal}> */}
    <Container className={styles.welcome}>
      <ProgressBar progress="85" />
      <Row className="my-4">
        <LeftPanel
          heading="Make it look on brand"
          content="Control how your customers will see your Groupshop page as they shop from it. You’re almost done!"
        />
        <Settings />
      </Row>
    </Container>
    {/* </div> */}
  </Dialogue>
);

export default Step4;
