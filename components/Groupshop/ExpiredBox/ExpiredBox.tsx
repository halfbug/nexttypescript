/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import styles from 'styles/Groupshop.module.scss';
import { IProduct, RootProps } from 'types/store';
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
import InfoButton from 'components/Buttons/InfoButton/InfoButton';
import useDeal from 'hooks/useDeal';

interface ExpiredBoxProps extends RootProps {
  mes: string;
  discount?: string;
  shareUrl: any;
  brandname: string;
  products: IProduct[];
  maxPercent?: string | undefined;
}

const ExpiredBox = ({
  mes, discount, shareUrl, brandname, products, maxPercent,
}: ExpiredBoxProps) => {
  const { googleEventCode } = useGtm();

  const isModalForMobile = useMediaQuery({
    query: '(min-width: 476px)',
  });

  const [show, setShow] = useState(false);
  const { dPrice, shortActivateURL } = useDeal();
  console.log('🚀 ~ file: ExpiredBox.tsx ~ line 40 ~ shortActivateURL', shortActivateURL);

  useEffect(() => {
    if (show) { googleEventCode('how-it-works-modal'); }
  }, [show]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <InfoButton handleClick={handleShow} message={mes} />
      <Modal
        show={show}
        onHide={handleClose}
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
          {isModalForMobile && <img src="/images/purple-head.png" alt="headtag" className="img-fluid" />}
          {!isModalForMobile && <img src={PuprpleHeadMobile.src} alt="headtag" className="img-fluid" />}
        </div>
        <Modal.Body className={styles.groupshop_expiredBox_modal__body}>
          <Row>
            <Col lg={12}>
              <div className={styles.groupshop_expiredBox_modal__top}>
                <h2>
                  {`${brandname}`}
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
                  <strong>{`${brandname}`}</strong>
                  {' '}
                  products.
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={12} className={styles.groupshop_expiredBox_modal__productsSection}>
              {products.map((item) => (
                <div className={styles.groupshop_expiredBox_modal__product}>
                  <div className={styles.groupshop_expiredBox_modal__product__image}>
                    <img src={item.featuredImage} alt="product" />
                  </div>
                  <div className={styles.groupshop_expiredBox_modal__product__name}>
                    {item.title}
                  </div>
                  <div className={styles.groupshop_expiredBox_modal__product__amounts}>
                    <strong>
                      $
                      {dPrice(+item.price)}
                    </strong>
                    <span>
                      $
                      {item.price}
                    </span>
                  </div>
                </div>

              ))}
              {/* {isModalForMobile && (
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
              )} */}
            </Col>
          </Row>
          <Row className={styles.groupshop_expiredBox_modal__bottom}>
            {isModalForMobile
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
                  isModalForMobile ? (
                    <ShareButton
                      placement="auto"
                      shareurl={shareUrl}
                      fullshareurl={shareUrl}
                      label="🔗  &nbsp; Invite Now"
                      onClick={() => googleEventCode('earn-cashback-modal')}
                      icon={false}
                      className={styles.groupshop_expiredBox_modal__inviteBtn}
                    />
                  ) : (
                    <NativeShareButton
                      label="🔗 Invite Now"
                      className={styles.groupshop_expiredBox_modal__inviteBtn}
                      shareurl={shortActivateURL}
                      text={`Shop ${brandname} on my Groupshop & get up to ${maxPercent} off`}
                    />
                  )
              }
              </div>
            </Col>
          </Row>
          <Row className="p-3">
            <Col sm={12} className={styles.groupshop_expiredBox_modal__orShare}>
              or Share
            </Col>
            <Col sm={12} className="d-flex justify-content-center mt-3">
              <div className="me-2"><SocialButton network="Email" url={shareUrl} /></div>
              <div className="me-2"><SocialButton network="Instagram" url={shareUrl} /></div>
              <div className="me-2"><SocialButton network="Pinterest" url={shareUrl} /></div>
              <div className="me-2"><SocialButton network="Twitter" url={shareUrl} /></div>
              <div className="me-2"><SocialButton network="Facebook" url={shareUrl} /></div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};
ExpiredBox.defaultProps = {
  discount: '...',
  maxPercent: '',
};

export default ExpiredBox;
