import React from 'react';
import styles from 'styles/Modal.module.scss';
import { RootProps } from 'types/store';
import {
  Button,
  Col, Modal, Row,
} from 'react-bootstrap';
import GroupshopIcon from 'assets/images/gsIconWhite.svg';
import QR from 'assets/images/QR.svg';
import useGtm from 'hooks/useGtm';
import { useMediaQuery } from 'react-responsive';
import useDeal from 'hooks/useDeal';

interface DropsRewardBoxProps extends RootProps {
  show: boolean;
  handleClose(e: any): any;

}

const DropsRewardBox = ({
  show = false, handleClose,
}: DropsRewardBoxProps) => {
  const closeModal = (e: any) => {
    // setotherProducts(undefined);
    // setSelected(undefined);
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
        // className={styles.Scan_modal}
        size="lg"
        centered
        dialogClassName={styles.Scan_modal}
        contentClassName={styles.Scan_modal__content}
      >
        <Modal.Header className={[styles.Scan_modal__closebtnlg, 'border-0 bg-transparent'].join(' ')} />
        <Modal.Header className={styles.Scan_modal__closebtnsm} />
        <Modal.Body className={[styles.Scan_modal__body, ''].join(' ')}>
          <Row className="text-center">
            <div className={[styles.Scan_modal__top, 'my-3'].join(' ')}>
              <div className={styles.Scan_modal__top__icon}>
                <GroupshopIcon fill="#ffffff" width="255" />
              </div>
            </div>
          </Row>
          <Row className="text-center">
            <h1 className="text-white font-bold mb-3 text-nowrap" style={{ fontSize: '64px ' }}>
              We’re mobile first.
            </h1>
          </Row>
          <Row className={styles.Scan_modal__body_boxWidth}>
            <div className={styles.Scan_modal__transparentBox}>
              <div className={[styles.Scan_modal__transparentBox__text, 'mb-2'].join(' ')}>
                Scan the QR code to shop on mobile. No app download needed.
                <QR className="my-2" />
                <br />
                Or enter your number below and we’ll text you the link to this drop.
              </div>
            </div>

            <Row className="text-center">
              <div className={styles.Scan_modal__transparentBox__btnSection}>
                <Button className={styles.Scan_modal__transparentBox_greybtn} variant="" onClick={handleClose}>
                  FORM GOES HERE
                </Button>
              </div>
            </Row>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DropsRewardBox;
