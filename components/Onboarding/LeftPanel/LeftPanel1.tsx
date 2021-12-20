import * as React from 'react';
import { Col } from 'react-bootstrap';
import styles from 'styles/LeftPanel.module.scss';

export interface ILeftPanelProps {
    heading: string,
    content: string
}

export default function LeftPanel({ heading, content }: ILeftPanelProps) {
  return (
    <Col md={4} className={styles.leftbar1}>
      <h1>{heading}</h1>
      <p>{content}</p>
    </Col>
  );
}
