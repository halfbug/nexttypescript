/* eslint-disable no-undef */
import React from 'react';
import styles from 'styles/Groupshop.module.scss';
import { RootProps } from 'types/store';
import {
  Col, Modal, Row,
} from 'react-bootstrap';
import Cross from 'assets/images/CrossLg.svg';
import ArrowDown from 'assets/images/arrow-down.svg';
import InfoBox from 'components/Groupshop/InfoBox/InfoBox';
import useGtm from 'hooks/useGtm';
import { useMediaQuery } from 'react-responsive';
import useDeal from 'hooks/useDeal';

interface AvailableRewardsBoxProps extends RootProps {
  show: boolean;
  reward: any;
  name: string;
  brandname: any;
  handlesetShow: any;
  fullshareurl:string
  shareUrl: string;
  discount:string;
  owner: boolean
  currencySymbol: string;
  handleClose(e: any): any;

}

const AvailableRewardsBox = ({
  show = false, handlesetShow, handleClose, reward, currencySymbol, name, brandname,
  fullshareurl, shareUrl, discount, owner,
}: AvailableRewardsBoxProps) => {
  const closeModal = (e: any) => {
    // setotherProducts(undefined);
    // setSelected(undefined);
    handleClose(e);
  };
  const handleinnerShow = () => {
    handlesetShow();
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
        dialogClassName={styles.groupshop_availableRewardsBox_modal}
        contentClassName={styles.groupshop_availableRewardsBox_modal__content}
      >
        <Modal.Header className={styles.groupshop_availableRewardsBox_modal__closebtnlg}>
          <Row onClick={handleClose}>
            <div><Cross /></div>
          </Row>
        </Modal.Header>
        <Modal.Header className={styles.groupshop_availableRewardsBox_modal__closebtnsm}>
          <Row onClick={handleClose}>
            <div><ArrowDown /></div>
          </Row>
        </Modal.Header>
        <Modal.Body className={styles.groupshop_availableRewardsBox_modal__body}>
          <Row>
            <Col lg={12}>
              <div className={styles.groupshop_availableRewardsBox_modal__top}>
                <h2>
                  {name}
                </h2>
                {owner ? (
                  <span>
                    {'👑 '}
                    GROUPSHOP OWNER
                  </span>
                )
                  : <span>GROUPSHOP MEMBER</span>}
              </div>
            </Col>
            {owner && (
            <Col lg={12}>
              <div className={styles.groupshop_availableRewardsBox_modal__available}>
                <span>
                  {currencySymbol}
                  {reward}
                  {' '}
                  reward available
                </span>
              </div>
            </Col>
            )}
          </Row>
          <Row className="justify-content-center">
            <Col lg={12}>
              <div className={styles.groupshop_availableRewardsBox_modal__info}>
                {isDesktop ? (
                  <>
                    <h2>
                      <InfoBox mes="How it works" handleRewardsModel={handleinnerShow} brandname={brandname} fullshareurl={fullshareurl} shareUrl={shareUrl} />
                    </h2>
                  </>
                ) : (
                  <>
                    <h2>
                      How to Earn?
                    </h2>
                    <p>
                      1. Invite friends to shop & unlock up to
                      {' '}
                      {currencySymbol}
                      {reward}
                      {' '}
                      in cashback.
                    </p>
                    <p>
                      2. Shop from this Groupshop & get
                      {' '}
                      {discount}
                      % off.
                    </p>
                  </>
                ) }
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AvailableRewardsBox;
