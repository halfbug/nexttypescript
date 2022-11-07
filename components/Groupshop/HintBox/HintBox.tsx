import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import Cross from 'assets/images/CrossLg.svg';

import styles from 'styles/HintBox.module.scss';

interface HintBoxProps {
  show: boolean;
  handleClose(e: any): any;
  title: string;
  hints: string[];

}
const HintBox = ({
  show, handleClose, title, hints,
}:HintBoxProps) => {
  const closeModal = (e: any) => {
    handleClose(e);
  };
  return (
    <>
      <CSSTransition
        in={show}
        timeout={{
          appear: 500,
          enter: 300,
          exit: 500,
        }}
        classNames={{
          enter: styles.hintBox__transition__enter,
          enterActive: styles.hintBox__transition__enterActive,
          enterDone: styles.hintBox__transition__enterDone,
          exit: styles.hintBox__transition__exit,
          exitActive: styles.hintBox__transition__exitActive,
          exitDone: styles.hintBox__transition__exitDone,
        }}
      >
        <div className={styles.hintBox}>
          <Row>
            <Col lg={12} className={styles.hintBox__closeBtn}>
              <Cross onClick={closeModal} />
            </Col>
            <Col lg={12} className={styles.hintBox__heading}>
              {title}
            </Col>
          </Row>
          <Row>
            {hints.map((hint) => (
              <Col lg={12} className={styles.hintBox__point}>
                👉
                {hint}
              </Col>
            ))}
          </Row>
        </div>
      </CSSTransition>
    </>
  );
};

export default HintBox;
