import React from 'react';
import styles from 'styles/Modal.module.scss';
import { RootProps } from 'types/store';
import {
  Button,
  Col, Modal, Row,
} from 'react-bootstrap';
import Cross from 'assets/images/CrossLg.svg';
import GroupshopIcon from 'assets/images/gsIconWhite.svg';
import ArrowDown from 'assets/images/arrow-down.svg';
import useGtm from 'hooks/useGtm';
import { useMediaQuery } from 'react-responsive';
import useDeal from 'hooks/useDeal';
import { useQRCode } from 'next-qrcode';
import QR from 'assets/images/QR.svg';

interface DropsRewardBoxProps extends RootProps {
  show: boolean;
  formId: string;
  shopName:string | string[];
  shareurl: string;
  handleClose(e: any): any;

}

const DropsScanBox = ({
  show = false, shareurl, handleClose, formId, shopName,
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
  const { Canvas } = useQRCode();
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
        backdropClassName="opacity-25"
        dialogClassName={styles.Scan_modal}
        contentClassName={styles.Scan_modal__content}
      >
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
          <Row className={[styles.Scan_modal__body_boxWidth, 'scroll-bar'].join(' ')}>
            <div className={styles.Scan_modal__transparentBox}>
              <div className={[styles.Scan_modal__transparentBox__text, ''].join(' ')}>
                <div className="mb-2">
                  <span>Scan the QR code to shop on mobile. No app download needed.</span>
                </div>
                <Canvas
                  text={`${shareurl}`}
                  options={{
                    type: 'image/jpeg',
                    quality: 0.3,
                    level: 'L',
                    margin: 3,
                    scale: 4,
                    width: 130,
                    color: {
                      dark: '#000000',
                      light: '#FFFFFF',
                    },
                  }}
                />
                <br />
                Or enter your number below and we’ll text you the link to this drop.
              </div>
              {formId !== '' && shopName !== '' && (
              <Row className="text-center">
                <iframe title="klaviyo-form" height="290" width="100%" src={(typeof window !== 'undefined') ? `${window.location.origin}/${shopName}/klaviyo-form/${formId}` : `/${shopName}/klaviyo-form/${formId}`} />
              </Row>
              )}
            </div>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DropsScanBox;
