import React from 'react';
import styles from 'styles/Modal.module.scss';
import { RootProps } from 'types/store';
import {
  Button,
  Col, Modal, Row,
} from 'react-bootstrap';
import Cross from 'assets/images/CrossLg.svg';
import GroupshopIcon from 'assets/images/groupshop-icon.svg';
import ArrowDown from 'assets/images/arrow-down.svg';
import useGtm from 'hooks/useGtm';
import { useMediaQuery } from 'react-responsive';
import useDeal from 'hooks/useDeal';
import useAppContext from 'hooks/useAppContext';

interface GetNotifyProps extends RootProps {
  show: boolean;
  handleClose(e: any): any;

}

const GetNotify = ({
  show = false, handleClose,
}: GetNotifyProps) => {
  const { gsctx } = useAppContext();
  const { store } = gsctx;
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
        size="lg"
        centered
        dialogClassName={styles.dropsNotifyBox_modal}
        contentClassName={styles.dropsNotifyBox_modal__content}
      >
        <Modal.Header className={styles.dropsNotifyBox_modal__closebtnlg}>
          {/* <Row onClick={handleClose}>
            <div><Cross /></div>
          </Row> */}
        </Modal.Header>
        <Modal.Header className={styles.dropsNotifyBox_modal__closebtnsm}>
          {/* <Row onClick={handleClose}>
            <div><ArrowDown /></div>
          </Row> */}
        </Modal.Header>
        <Modal.Body className={styles.dropsNotifyBox_modal__body}>
          <Row className="mx-0">
            <Col lg={12} className="px-0">
              <div className={styles.dropsNotifyBox_modal__top}>
                <div className={styles.dropsNotifyBox_modal__top__icon}>
                  <GroupshopIcon />
                </div>
                <h2 className="mx-3">
                  Get notified of future drops
                </h2>
              </div>
              <div className={styles.dropsNotifyBox_modal__greyBox}>
                <div className={styles.dropsNotifyBox_modal__greyBox__text}>
                  New products drop every week.
                </div>
              </div>
              <div className={styles.dropsNotifyBox_modal__greyBox}>
                <div className={styles.dropsNotifyBox_modal__greyBox__text}>
                  Up to
                  {' '}
                  {store?.drops?.rewards?.maximum}
                  % off premium brands.
                </div>
              </div>
              <div className={styles.dropsNotifyBox_modal__greyBox}>
                <div className={styles.dropsNotifyBox_modal__greyBox__text}>
                  Unlock cashback when friends shop with you.
                </div>
              </div>
              <div>
                <Row className="justify-content-center">
                  <Col lg={12}>
                    <iframe title="klaviyo-form" height="290" width="100%" src={(typeof window !== 'undefined') ? `${window.location.origin}/klaviyo-form/UcJNt5` : '/klaviyo-form/UcJNt5'} />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default GetNotify;
