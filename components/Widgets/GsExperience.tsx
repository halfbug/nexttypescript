/* eslint-disable no-undef */
import React from 'react';
import styles from 'styles/Knowledgebase.module.scss';
import SetUpPic from 'assets/images/Gs-Setup1.png';
import Rocket from 'assets/images/rocket.svg';
import {
  Col, Row,
} from 'react-bootstrap';
import WhiteButton from 'components/Buttons/WhiteButton/WhiteButton';

export interface IAppProps {
values: any;
errors: any;
touched: any;
handleChange: any;
handleForm: any;
setFieldValue: any;

}

export function GsExperience(
) {
  return (
    <section className={styles.Kb}>
      <h3 className="ms-0 px-0">Maximize your Groupshop experience</h3>
      <Row className={styles.Kb_getSetUp}>
        <Col lg={3} md={6} sm={12} className="pe-0">
          {/* <SetUpPic /> */}
          <img src={SetUpPic.src} width={120} height={88} alt="GSExperience" />
        </Col>
        <Col lg={9} md={6} sm={12} className="px-0">
          <h4>
            <Rocket className="me-2" />
            Get set up in no time
          </h4>
          Turn on your word-of-mouth sales engine with our Groupshop
          {' '}
          walk-through.
          <br />
          <WhiteButton
            type="submit"
            className={styles.Kb_btn}
          >
            Watch product demo
          </WhiteButton>
        </Col>
      </Row>
    </section>

  );
}
