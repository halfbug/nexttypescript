import React from 'react';
import styles from 'styles/Modal.module.scss';
import { IStore, RootProps } from 'types/store';
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
import Link from 'next/link';

interface WhatsInsideBoxProps extends RootProps {
  show: boolean;
  handleClose(e: any): any;
  store: IStore;
  Channel: any;
  owner: any;
  setshowps: any;
}

const WhatsInsideBox = ({
  show = false, handleClose, store, Channel, owner, setshowps,
}: WhatsInsideBoxProps) => {
  console.log('🚀 ~ file: WhatsInsideBox.tsx ~ line 28 ~ owner', owner);
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
          {/* <Row onClick={handleClose}>
            <div><Cross /></div>
          </Row> */}
        </Modal.Header>
        <Modal.Header className={styles.whatsInsideBox_modal__closebtnsm}>
          {/* <Row onClick={handleClose}>
            <div><ArrowDown /></div>
          </Row> */}
        </Modal.Header>
        <Modal.Body className={styles.whatsInsideBox_modal__body}>
          <Row>
            <Col lg={12} className="px-0">
              <div className={styles.whatsInsideBox_modal__top}>
                <div className={styles.whatsInsideBox_modal__top__icon}>
                  {/* <LeEsableIcon /> */}
                  <Link
                    href={{
                      pathname: `https://${store?.shop}`,
                    }}
                  >
                    <a target="_blank">
                      <img width="130" src={store.logoImage} alt="brand_logo" className="img-fluid" />
                    </a>
                  </Link>
                </div>
                <h2>
                  Welcome to your Groupshop
                  {' '}
                  {owner?.firstName ?? ''}
                  {' '}
                  {owner?.lastName ?? ''}
                  !
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
                🎁
                {' '}
                {Channel.rewards.baseline}
                {' '}
                off for you and friends to shop
              </div>
            </Col>
            <Col lg={12} className="px-2">
              <div className={styles.whatsInsideBox_modal__tile}>
                🤑 earn
                {' '}
                {Channel.rewards.commission}
                {' '}
                cash of every order when friends shop from your store
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
                <Button variant="dark" onClick={() => setshowps(true)}>
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
