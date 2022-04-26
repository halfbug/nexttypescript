import React from 'react';
import styles from 'styles/Knowledgebase.module.scss';
import G1 from 'assets/images/guide1.png';
import G2 from 'assets/images/guide2.png';
import {
  Button,
  Col, Row,
} from 'react-bootstrap';

export default function GsGuide(
) {
  return (
    <section className={styles.Kb}>
      <Row className="me-2 pe-2">
        <h4 className=" ">
          How-to guide
          <Button variant="link" className="styles.Kb_browse">Browse</Button>
        </h4>
        <Col lg={6}>
          <div className={styles.Kb_guide}>
            <h5 className={styles.Kb_guide_heading}>
              Boost your sales with the power of
              WOM marketing
            </h5>
            <br />
            <Row className="mt-0 mb-2">
              <Col className="d-flex justify-content-center">
                <img src={G1.src} width={105} height={70} alt="GSG1" />
                <div className="col-6 ms-3">
                  Learn how Groupshop
                  {' '}
                  turns everyday shoppers
                  {' '}
                  into brand influencers.
                  <br />
                  <Button variant="link" className="">Read more</Button>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col lg={6}>
          <div className={styles.Kb_guide}>
            <h5 className={styles.Kb_guide_heading}>
              5 ways to market Groupshop to
              your customers
            </h5>
            <br />
            <Row className="mt-0 mb-2">
              <Col className="d-flex justify-content-center">
                <img src={G2.src} width={105} height={70} alt="GSG2" />
                <div className="col-6 ms-3">
                  Get your products in front of more prospects with these tips.
                  <br />
                  <Button variant="link">Get started</Button>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </section>

  );
}
