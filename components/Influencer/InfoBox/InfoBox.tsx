import InfoButton from 'components/Buttons/InfoButton/InfoButton';
import React, {
  useState, useEffect,
} from 'react';
import {
  Modal, Col, Row, Button as ButtonReact,
} from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import Button from 'components/Buttons/Button/Button';
import styles from 'styles/Groupshop.module.scss';
import Cart from 'assets/images/cart.svg';
import Face from 'assets/images/face.svg';
import Envp from 'assets/images/envelop.svg';
import Cross from 'assets/images/CrossLg.svg';
import PuprpleHeadMobile from 'assets/images/purple-head-mobile.jpg';
import ArrowDown from 'assets/images/arrow-down.svg';
import useGtm from 'hooks/useGtm';
import { Send } from 'react-bootstrap-icons';
import ShareButton from 'components/Buttons/ShareButton/ShareButton';

interface mesProps {
  mes: string;
  brandname: any;
  shareUrl?: string;
}
const InfoBox = ({ mes, brandname, shareUrl }: mesProps) => {
  const [show, setShow] = useState(false);

  const isModalForMobile = useMediaQuery({
    query: '(max-width: 475px)',
  });

  const { googleEventCode } = useGtm();
  useEffect(() => {
    if (show) { googleEventCode('how-it-works-modal'); }
  }, [show]);
  const isForMobile = useMediaQuery({
    query: '(min-width: 476px)',
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <InfoButton handleClick={handleShow} message={mes} />
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centeredv
        dialogClassName={styles.groupshop__info_modal}
        contentClassName={styles.groupshop__info_modal__content}
      >
        <Modal.Header className={styles.groupshop__info_modal__closebtnlg}>
          <Row onClick={handleClose}>
            <div><Cross /></div>
          </Row>
        </Modal.Header>
        <Modal.Header className={styles.groupshop__info_modal__closebtnsm}>
          <Row onClick={handleClose}><ArrowDown /></Row>
        </Modal.Header>
        <div className="styles.groupshop_infoBox_imgBox">
          {!isModalForMobile && <img src="/images/purple-head.png" alt="headtag" className="img-fluid" />}
          {isModalForMobile && <img src={PuprpleHeadMobile.src} alt="headtag" className="img-fluid" />}
        </div>
        <Modal.Body className="py-2 px-3">
          <div className={styles.groupshop_infoBox}>
            <h2>
              Shopping together is always
              <br />
              more fun 🎉.
            </h2>
          </div>
          <div className={styles.groupshop_infoBox}>
            <p>
              Welcome to Groupshop ‒ where you and your
              friends shop InfluencerName’s favorite products
              and get
              {' '}
              <strong>exclusive discounts.</strong>
            </p>
            <div className={styles.groupshop_infoBox_tostart}>
              <h3>
                To start earning
              </h3>
            </div>
            <div className="my-2 d-flex justify-content-center">
              <Col xs={2} className="d-flex justify-content-end">
                <Cart />
              </Col>
              <Col xs={9}>
                <p className={styles.groupshop_infoBox__pointers}>

                  <strong> Shop</strong>
                  {' '}
                  exclusive
                  {' '}
                  <strong>discounts</strong>
                  {' '}
                  from
                  {' '}
                  {brandname}
                  {' '}
                  on this Groupshop.
                </p>
              </Col>
            </div>
            <div className="my-2 d-flex justify-content-center">
              <Col xs={2} className="d-flex justify-content-end">
                {/* <img src={Face.src} alt="icon" /> */}
                <Envp />
              </Col>
              <Col xs={9}>
                <p className={styles.groupshop_infoBox__pointers}>
                  <strong>Share</strong>
                  {' '}
                  this Groupshop with friends to give them access to discounts too.
                </p>
              </Col>
            </div>
          </div>
          <div className="d-flex justify-content-center my-4">
            <Button
              className={styles.groupshop_infoBox_shoppingBtn}
              onClick={handleClose}
            >
              Start Shopping
            </Button>
          </div>
        </Modal.Body>

      </Modal>
    </>
  );
};

InfoBox.defaultProps = {
  shareUrl: '',
};

export default InfoBox;
