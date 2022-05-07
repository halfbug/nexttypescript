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
      <Row className="styles.Kb_GSguide">
        <h4 className="my-2 mb-3">
          How-to guides
          <Button variant="link" className="text-black-50">Browse</Button>
        </h4>
        <Row className="d-inline-flex">
          <Col lg={5} className={['me-3 ms-2', styles.Kb_guide].join(' ')}>
            <h5 className={styles.Kb_guide_heading}>
              Boost your sales with the power of
              {' '}
              <br />
              WOM marketing
            </h5>
            <br />
            <Row className="mt-0 mb-2">
              <Col className="d-flex justify-content-center">
                <img src={G1.src} width={105} height={70} className="ps-1" alt="GSG1" />
                <div className={styles.Kb_guideDetail}>
                  Learn how Groupshop
                  {' '}
                  <br />
                  <span>turns everyday shoppers</span>
                  {' '}
                  <br />
                  into brand influencers.
                  <br />
                  <Button variant="link" className="ms-0 p-0 text-black-50">Read more</Button>
                </div>
              </Col>
            </Row>
          </Col>
          <Col lg={5} className={['me-3', styles.Kb_guide].join(' ')}>
            <h5 className={styles.Kb_guide_heading}>
              5 ways to market Groupshop to
              {' '}
              <br />
              your customers
            </h5>
            <br />
            <Row className="mt-0 mb-2">
              <Col className="d-flex justify-content-center">
                <img src={G2.src} width={105} height={70} className="ps-1" alt="GSG2" />
                <div className={styles.Kb_guideDetail}>
                  Get your products in
                  {' '}
                  <br />
                  <span className="text-nowrap">front of more prospects</span>
                  {' '}
                  <br />
                  with these tips.
                  <br />
                  <Button variant="link" className="ms-0 p-0 text-black-50">Get started</Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Row>
    </section>

  );
}
