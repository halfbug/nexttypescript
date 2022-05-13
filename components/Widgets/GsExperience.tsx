import React from 'react';
import styles from 'styles/Knowledgebase.module.scss';
import SetUpPic from 'assets/images/Gs-Setup1.png';
import Rocket from 'assets/images/rocket.svg';
import {
  Col, Row,
} from 'react-bootstrap';
import WhiteButton from 'components/Buttons/WhiteButton/WhiteButton';

export default function GsExperience(
) {
  return (
    <section className={styles.Kb}>
      <h3 className="ms-0 px-0 mb-4">Maximize your Groupshop experience</h3>
      <Col lg={7} className={styles.Kb_getSetUp}>
        <Row>
          <Col lg={3} className="pe-0 me-0">
            <img src={SetUpPic.src} width={120} height={88} alt="GSExperience" />
          </Col>
          <Col lg={9} className="pe-2">
            <h4>
              <Rocket className="me-0" />
              Get set up in no time
            </h4>
            <div className={styles.Kb_getSetUp_text}>
              Turn on your word-of-mouth sales engine with our Groupshop
              <br />
              walk-through.
              <br />
            </div>
            <WhiteButton
              type="submit"
              className={styles.Kb_btnExp}
            >
              Watch product demo
            </WhiteButton>
          </Col>
        </Row>
      </Col>
    </section>

  );
}
