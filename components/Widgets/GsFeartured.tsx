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
        <Col lg={5} className="">
          <iframe
            style={{ border: '1px solid black', borderRadius: '23px!important' }}
            width="260"
            height="135"
            title="GS"
            src="https://www.youtube.com/embed/NpEaa2P7qZI"
            allowFullScreen
          />
          <h5 className={styles.Kb_featured_heading}>
            How Y&R increased their AOV by 27% in 3 months
          </h5>
        </Col>
        <Col lg={1} className="mx-2" />
        <Col lg={5} className="">
          <iframe
            style={{ border: '1px solid black', borderRadius: '23px!important' }}
            width="260"
            height="135"
            title="GS1"
            src="https://www.youtube.com/embed/NpEaa2P7qZI"
            allowFullScreen
          />
          <h5 className={styles.Kb_featured_heading}>
            Bring your collections to Groupshop in just a few clicks
          </h5>
        </Col>
      </Row>
    </section>

  );
}
