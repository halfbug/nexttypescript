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
      <Col lg={7}>
        <Row className={styles.Kb_getSetUp}>
          <Col lg={3} className="pe-0">
            <img src={SetUpPic.src} width={120} height={88} alt="GSExperience" />
          </Col>
          <Col lg={9} className="px-1">
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
