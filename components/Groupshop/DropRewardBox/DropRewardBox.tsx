import React from 'react';
import styles from 'styles/Modal.module.scss';
import { RootProps } from 'types/store';
import {
  Button,
  Col, Modal, Row,
} from 'react-bootstrap';
import Cross from 'assets/images/CrossLg.svg';
import GroupshopIcon from 'assets/images/Logo-small.svg';
import ArrowDown from 'assets/images/arrow-down.svg';
import useGtm from 'hooks/useGtm';
import { useMediaQuery } from 'react-responsive';
import useDeal from 'hooks/useDeal';
import useAppContext from 'hooks/useAppContext';
import useDrops from 'hooks/useDrops';

interface DropsRewardBoxProps extends RootProps {
  show: boolean;
  handleClose(e: any): any;
}

const DropsRewardBox = ({
  show = false, handleClose,
}: DropsRewardBoxProps) => {
  const { gsctx } = useAppContext();
  const {
    milestones,
  } = gsctx;
  const { currentDropReward, nextDropReward } = useDrops();
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
        dialogClassName={styles.dropsRewardBox_modal}
        contentClassName={styles.dropsRewardBox_modal__content}
      >
        <Modal.Header className={styles.dropsRewardBox_modal__closebtnlg}>
          {/* <Row onClick={handleClose}>
            <div><Cross /></div>
          </Row> */}
        </Modal.Header>
        <Modal.Header className={styles.dropsRewardBox_modal__closebtnsm}>
          <Row onClick={handleClose}>
            <div><ArrowDown /></div>
          </Row>
        </Modal.Header>
        <Modal.Body className={styles.dropsRewardBox_modal__body}>
          <Row className="mx-0">
            <Col lg={12} className="px-0">
              <div className={styles.dropsRewardBox_modal__top}>
                <div className={styles.dropsRewardBox_modal__top__icon}>
                  <GroupshopIcon />
                </div>
                <h2>
                  So you want
                  {' '}
                  {nextDropReward}
                  % off?
                </h2>
              </div>
              <div className={styles.dropsRewardBox_modal__greyBox}>
                <div className={styles.dropsRewardBox_modal__greyBox__text}>
                  Your
                  {' '}
                  {milestones.length === 1 ? 'first' : 'next'}
                  {' '}
                  purchase is
                  {' '}
                  <b>
                    {currentDropReward}
                    % off.
                  </b>
                </div>
              </div>
              <div className={styles.dropsRewardBox_modal__greyBox}>
                <div className={styles.dropsRewardBox_modal__greyBox__heading}>
                  After you shop, you unlock
                  {' '}
                  {nextDropReward}
                  % off.
                </div>
                <div className={styles.dropsRewardBox_modal__greyBox__text}>
                  Keep shopping or invite friends to shop your link.
                  {' '}
                  When a friend shops, you’ll receive
                  {' '}
                  {(nextDropReward && currentDropReward) && (+nextDropReward - +currentDropReward)}
                  % cashback on your first purchase.
                </div>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={12}>
              <div className={styles.dropsRewardBox_modal__btnSection}>
                <Button variant="dark" onClick={handleClose}>
                  Drop in and start shopping
                </Button>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DropsRewardBox;
