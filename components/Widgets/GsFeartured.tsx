import React from 'react';
import styles from 'styles/Knowledgebase.module.scss';
import {
  Button,
  Col, Row,
} from 'react-bootstrap';

export default function GsFeartured(
) {
  return (
    <section className={styles.Kb}>
      <Row className=" my-3 ">
        <h4 className="my-4">
          Featured videos
          <Button variant="link" className="text-black-50">Browse</Button>
        </h4>
        <Row className="mt-1 d-inline-flex">
          <Col lg={5} className="">
            <iframe
              width="281.64"
              className={styles.Kb_featured_frames}
              height="119"
              title="GS"
              src="https://www.youtube.com/embed/NpEaa2P7qZI"
              allowFullScreen
            />
            <h5 className={styles.Kb_featured_heading}>
              How Y&R increased their AOV by 27% in 3 months
            </h5>
          </Col>
          <Col lg={1} className="mx-1" />
          <Col lg={5} className="">
            <iframe
              width="281.64"
              className={styles.Kb_featured_frames}
              height="119"
              title="GS1"
              src="https://www.youtube.com/embed/NpEaa2P7qZI"
              allowFullScreen
            />
            <h5 className={styles.Kb_featured_heading}>
              Bring your collections to Groupshop in just a few clicks
            </h5>
          </Col>
        </Row>
      </Row>
    </section>

  );
}
