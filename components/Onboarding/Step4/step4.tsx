import React from 'react';
import Dialogue from 'components/Layout/Dialogue/dialogue';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import styles from 'styles/Step4.module.scss';
import Settings from 'components/Forms/Settings';
import LeftPanel from '../LeftPanel/LeftPanel1';
import ProgressBar from '../ProgressBar/ProgressBar';

interface IStep4Props {
  show: boolean,
}

const Step4 = ({ show }: IStep4Props) => (
  <Dialogue show={show}>
    {/* <div className={styles.WelcomeModal}> */}
    <Container className={styles.ob_settings}>
      <ProgressBar progress="85" />
      <Row className="my-4 d-flex align-items-center">
        <LeftPanel
          heading="Make it look right"
          content="Control how your customers will see your Groupshop page as they shop from it. You want your customer experience to feel on-brand. Oh, and you’re almost done!"
        />
        <Col className="text-sm-start mt-3 border-start" lg={7}>
          <Settings isDB={false} />
        </Col>
      </Row>
    </Container>
    {/* </div> */}
  </Dialogue>
);

export default Step4;
