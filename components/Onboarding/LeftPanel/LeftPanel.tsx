import * as React from 'react';
import { Col } from 'react-bootstrap';
import styles from 'styles/LeftPanel.module.scss';

export interface ILeftPanelProps {
    heading: string,
    content: string
}

export default function LeftPanel({ heading, content }: ILeftPanelProps) {
  return (
    <Col md={3} className={styles.leftbar}>
      <h1>{heading}</h1>
      <p className="m-5">{content}</p>
    </Col>
  );
}
