/* eslint-disable no-undef */
import React from 'react';
import styles from 'styles/Groupshop.module.scss';
import { RootProps } from 'types/store';
import {
  Button,
  Col, Modal, Row,
} from 'react-bootstrap';
import { useQRCode } from 'next-qrcode';
import Cross from 'assets/images/CrossLg.svg';

interface QRBoxProps extends RootProps {
    show: boolean;
    handleClose(e: any): any;
    fullshareurl: string;
    // addToCart(e: any): any;
}

const QRBox = ({
  show = false, handleClose, fullshareurl,
}: QRBoxProps) => {
  const closeModal = (e: any) => {
    // setotherProducts(undefined);
    // setSelected(undefined);
    handleClose(e);
  };
  const { Canvas } = useQRCode();
  return (
    <>
      <Modal
        show={show}
        onHide={closeModal}
        size="sm"
        centered
        dialogClassName={styles.groupshop_qrBox__modal}
        // backdrop="static"
        contentClassName={styles.groupshop_qrBox_modalContent}
      >
        <Modal.Header className={styles.groupshop_qrBox__closebtn}>
          <Row onClick={handleClose}>
            <div><Cross /></div>
          </Row>
        </Modal.Header>
        <Modal.Body className="px-0 pt-0 mx-auto bg-white">
          <Row>
            <Col xs={12} sm={12} md={12} className={styles.groupshop_qrBox__off}>
              Share 15% off
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={12}>
              <div className={styles.groupshop_qrBox__canvas}>
                <Canvas
                  text={`${fullshareurl}/qrscan&mobile`}
                  options={{
                    type: 'image/jpeg',
                    quality: 0.3,
                    level: 'L',
                    margin: 3,
                    scale: 4,
                    width: 105,
                    color: {
                      dark: '#000000',
                      light: '#FFFFFF',
                    },
                  }}
                />
                <p>
                  Scan to share
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={12}>
              <Button
                className={styles.groupshop_qrBox__btnShare}
                onClick={() => {}}
              >
                Other sharing options
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

// ProductDetail.defaultProps = {
//   user: {},
// };

export default QRBox;
