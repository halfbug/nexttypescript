import React from 'react';
import styles from 'styles/Modal.module.scss';
import { RootProps } from 'types/store';
import {
  Button,
  Col, Form, Modal, Row,
} from 'react-bootstrap';
import Cross from 'assets/images/CrossLg.svg';
import LeEsableIcon from 'assets/images/lesable.svg';
import ArrowDown from 'assets/images/arrow-down.svg';
import useGtm from 'hooks/useGtm';
import { useMediaQuery } from 'react-responsive';
import useDeal from 'hooks/useDeal';

interface WhatsInsideBoxProps extends RootProps {
  show: boolean;
  handleClose(e: any): any;

}

const WhatsInsideBox = ({
  show = false, handleClose,
}: WhatsInsideBoxProps) => {
  const closeModal = (e: any) => {
    handleClose(e);
  };
  const { googleEventCode } = useGtm();
  const isDesktop = useMediaQuery({
    query: '(min-width: 476px)',
  });

  const {
    isExpired,
  } = useDeal();

  return (
    <>
      <Modal
        show={show}
        onHide={closeModal}
        size="lg"
        centered
        dialogClassName={styles.whatsInsideBox_modal}
        contentClassName={styles.whatsInsideBox_modal__content}
      >
        <Modal.Header className={styles.whatsInsideBox_modal__closebtnlg}>
          <Row onClick={handleClose}>
            <div><Cross /></div>
          </Row>
        </Modal.Header>
        <Modal.Header className={styles.whatsInsideBox_modal__closebtnsm}>
          <Row onClick={handleClose}>
            <div><ArrowDown /></div>
          </Row>
        </Modal.Header>
        <Modal.Body className={styles.whatsInsideBox_modal__body}>
          <Row>
            <Col lg={12} className="px-0">
              <div className={styles.whatsInsideBox_modal__top}>
                <div className={styles.whatsInsideBox_modal__top__icon}>
                  <LeEsableIcon />
                </div>
                <h2>
                  Welcome to your Groupshop Jane!
                </h2>
                <div className={styles.whatsInsideBox_modal__top__inside}>
                  <span className={styles.whatsInsideBox_modal__top__inside__border} />
                  <span className={styles.whatsInsideBox_modal__top__inside__text}>
                    What's Inside
                  </span>
                  <span className={styles.whatsInsideBox_modal__top__inside__border} />
                </div>
              </div>
            </Col>
          </Row>
          <Row className="px-2">
            <Col lg={12} className="px-1">
              <div className={styles.whatsInsideBox_modal__tile}>
                😍 a unique store to personalize with your favorite products
              </div>
            </Col>
            <Col lg={12} className="px-3">
              <div className={styles.whatsInsideBox_modal__tile}>
                🎁 20% off for you and friends to shop
              </div>
            </Col>
            <Col lg={12} className="px-2">
              <div className={styles.whatsInsideBox_modal__tile}>
                🤑 earn 15% cash of every order when friends shop from your store
              </div>
            </Col>
            <Col lg={12} className="px-0">
              <div className={styles.whatsInsideBox_modal__note}>
                Customize your Groupshop now and explore your exclusive discounts when you’re done.
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={12}>
              <div className={styles.whatsInsideBox_modal__btnSection}>
                <Button variant="dark" onClick={handleClose}>
                  Add Your Favorite Products
                </Button>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default WhatsInsideBox;
