/* eslint-disable no-undef */
import React from 'react';
import styles from 'styles/Groupshop.module.scss';
import { RootProps } from 'types/store';
import {
  Col, Modal, Row,
} from 'react-bootstrap';
import Cross from 'assets/images/CrossLg.svg';
import ArrowDown from 'assets/images/arrow-down.svg';
import PuprpleHeadMobile from 'assets/images/purple-head-mobile.jpg';
import SampleImage from 'assets/images/item-mobile.png';
import useGtm from 'hooks/useGtm';
import ShareButton from 'components/Buttons/ShareButton/ShareButton';
import { useMediaQuery } from 'react-responsive';
import NativeShareButton from 'components/Buttons/NativeShareButton/NativeShareButton';
import SocialButton from 'components/Buttons/SocialButton/SocialButton';

interface ExpiredBoxProps extends RootProps {
  show: boolean;
  discount?: string;
  handleClose(e: any): any;
  shareurl: any;
  // addToCart(e: any): any;
}

const ExpiredBox = ({
  show = false, handleClose, discount, shareurl,
}: ExpiredBoxProps) => {
  const closeModal = (e: any) => {
    // setotherProducts(undefined);
    // setSelected(undefined);
    handleClose(e);
  };
  const { googleEventCode } = useGtm();
  const isDesktop = useMediaQuery({
    query: '(min-width: 476px)',
  });

  return (
    <>
      <Modal
        show={show}
        onHide={closeModal}
        size="lg"
        centered
        dialogClassName={styles.groupshop_expiredBox_modal}
        contentClassName={styles.groupshop_expiredBox_modal__content}
      >
        {/* <Modal.Header className={styles.groupshop_expiredBox_modal_header}>
          <Row onClick={handleClose}><ArrowDown /></Row>
        </Modal.Header> */}
        <Modal.Header className={styles.groupshop_expiredBox_modal__closebtnlg}>
          <Row onClick={handleClose}>
            <div><Cross /></div>
          </Row>
        </Modal.Header>
        <Modal.Header className={styles.groupshop_expiredBox_modal__closebtnsm}>
          <Row onClick={handleClose}>
            <div><ArrowDown /></div>
          </Row>
        </Modal.Header>
        <div className="styles.groupshop_infoBox_imgBox">
          {isDesktop && <img src="/images/purple-head.png" alt="headtag" className="img-fluid" />}
          {!isDesktop && <img src={PuprpleHeadMobile.src} alt="headtag" className="img-fluid" />}
        </div>
        <Modal.Body className={styles.groupshop_expiredBox_modal__body}>
          <Row>
            <Col lg={12}>
              <div className={styles.groupshop_expiredBox_modal__top}>
                <h2>
                  LE SABLE
                </h2>
                <p>
                  Get
                  {' '}
                  <strong>
                    {`${discount}%`}
                    {' '}
                    off
                  </strong>
                  {' '}
                  these and other
                  {' '}
                  <strong>Insert Name Here</strong>
                  {' '}
                  products.
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={12} className={styles.groupshop_expiredBox_modal__productsSection}>
              <div className={styles.groupshop_expiredBox_modal__product}>
                <div className={styles.groupshop_expiredBox_modal__product__image}>
                  <img src={SampleImage.src} alt="product" />
                </div>
                <div className={styles.groupshop_expiredBox_modal__product__name}>
                  Oasis Pants
                </div>
                <div className={styles.groupshop_expiredBox_modal__product__amounts}>
                  <strong>
                    $89
                  </strong>
                  <span>
                    $139
                  </span>
                </div>
              </div>
              {isDesktop && (
              <div className={styles.groupshop_expiredBox_modal__product}>
                <div className={styles.groupshop_expiredBox_modal__product__image}>
                  <img src={SampleImage.src} alt="product" />
                </div>
                <div className={styles.groupshop_expiredBox_modal__product__name}>
                  Hibiscus Gown
                </div>
                <div className={styles.groupshop_expiredBox_modal__product__amounts}>
                  <strong>
                    $89
                  </strong>
                  <span>
                    $139
                  </span>
                </div>
              </div>
              )}
              {isDesktop && (
              <div className={styles.groupshop_expiredBox_modal__product}>
                <div className={styles.groupshop_expiredBox_modal__product__image}>
                  <img src={SampleImage.src} alt="product" />
                </div>
                <div className={styles.groupshop_expiredBox_modal__product__name}>
                  Azalea Kimono
                </div>
                <div className={styles.groupshop_expiredBox_modal__product__amounts}>
                  <strong>
                    $89
                  </strong>
                  <span>
                    $139
                  </span>
                </div>
              </div>
              )}
            </Col>
          </Row>
          <Row className={styles.groupshop_expiredBox_modal__bottom}>
            {isDesktop
            && (
            <Col lg={12}>
              <div className={styles.groupshop_expiredBox_modal__info1}>
                <p>
                  Groupshop is all about rewarding you and your
                  friends with real cashback and discounts every time you shop together!
                </p>
              </div>
            </Col>
            )}
            <Col lg={12}>
              <div className={styles.groupshop_expiredBox_modal__info2}>
                <p>
                  <strong>Invite 1 friend</strong>
                  {' '}
                  to this Groupshop, and start shopping with them to
                  {' '}
                  <strong>
                    {`${discount}%`}
                    {' '}
                    off plus additional cashback
                  </strong>
                  {' '}
                  on these and other products you love.
                </p>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={12}>
              <div className={styles.groupshop_expiredBox_modal__btnSection}>
                {
                  isDesktop ? (
                    <ShareButton
                      placement="auto"
                      shareurl={shareurl}
                      label="Invite Now"
                      onClick={() => googleEventCode('earn-cashback-modal')}
                      icon={false}
                      className={styles.groupshop_expiredBox_modal__inviteBtn}
                    />
                  ) : (
                    <NativeShareButton
                      label="Invite Now"
                      className={styles.groupshop_expiredBox_modal__inviteBtn}
                      shareurl={shareurl}
                    />
                  )
              }
              </div>
            </Col>
          </Row>
          <Row className="p-3">
            <Col sm={12} className="d-flex justify-content-center">
              or Share
            </Col>
            <Col sm={12} className="d-flex justify-content-center mt-3">
              <div className="me-2"><SocialButton network="Email" url={shareurl} /></div>
              <div className="me-2"><SocialButton network="Instagram" url={shareurl} /></div>
              <div className="me-2"><SocialButton network="Pinterest" url={shareurl} /></div>
              <div className="me-2"><SocialButton network="Twitter" url={shareurl} /></div>
              <div className="me-2"><SocialButton network="Facebook" url={shareurl} /></div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};
ExpiredBox.defaultProps = {
  discount: '20%',
};

export default ExpiredBox;
