/* eslint-disable max-len */
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
import styles1 from 'styles/InfoBox.module.scss';
import Cart from 'assets/images/cart.svg';
import CartCone from 'assets/images/infocele.svg';
import Envp from 'assets/images/envelop.svg';
import Cross from 'assets/images/CrossLg.svg';
import PuprpleHeadMobile from 'assets/images/purple-head-mobile.jpg';
import PuprpleHeadMobile2 from 'assets/images/purple-head-mobile2.jpg';
import ArrowDown from 'assets/images/arrow-down.svg';
import useGtm from 'hooks/useGtm';
import useDeal from 'hooks/useDeal';

interface mesProps {
  mes: string;
  brandname: any;
  shareUrl?: string;
  name?: string;
  showRewards?: boolean;
  setShowRewards?: any;
}
const InfoBox = ({
  mes, brandname, shareUrl, name, showRewards, setShowRewards,
}: mesProps) => {
  const [show, setShow] = useState(false);

  const isModalForMobile = useMediaQuery({
    query: '(max-width: 475px)',
  });
  useEffect(() => {
    if (showRewards) { setShow(true); }
  }, [showRewards]);

  const { googleEventCode } = useGtm();
  useEffect(() => {
    if (show) { googleEventCode('how-it-works-modal'); }
  }, [show]);
  const isForMobile = useMediaQuery({
    query: '(min-width: 476px)',
  });

  const handleClose = () => {
    setShow(false);
    setShowRewards(false);
  };
  const { isDrops } = useDeal();

  const handleShow = () => setShow(true);
  return (
    <>
      {!showRewards && <InfoButton handleClick={handleShow} message={mes} />}
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
          <Row onClick={handleClose}>
            <div><ArrowDown /></div>
          </Row>
        </Modal.Header>
        <div className="styles.groupshop_infoBox_imgBox">
          {/* {isDrops && !isModalForMobile && <img src="/images/purple-head.png" alt="headtag" className="img-fluid" />}
          {!isDrops && !isModalForMobile && <img src="/images/purple-head2.png" alt="headtag" className="img-fluid" />} */}
          {isDrops && !isModalForMobile && <img src={PuprpleHeadMobile.src} alt="headtag" className="img-fluid" />}
          {!isDrops && !isModalForMobile && <img src={PuprpleHeadMobile2.src} alt="headtag" className="img-fluid" />}
          {isDrops && isModalForMobile && <img src={PuprpleHeadMobile.src} alt="headtag" className="img-fluid" />}
          {!isDrops && isModalForMobile && <img src={PuprpleHeadMobile2.src} alt="headtag" className="img-fluid" />}
        </div>
        <Modal.Body className="py-2 px-3">
          <div className={styles.groupshop_infoBox}>
            <h2>
              Shopping together is always
              <br />
              more fun.
              {' '}
              <CartCone />
            </h2>
          </div>
          <div className={styles.groupshop_infoBox}>
            <p>
              Welcome to
              {' '}
              {isDrops ? 'Groupshop' : 'Microstore'}
              ‒ where you and your
              friends shop
              {' '}
              {name}
              ’s favorite products
              and get
              {' '}
              <strong>exclusive discounts.</strong>
            </p>
            <div className={styles.groupshop_infoBox_tostart}>
              <h3 className={[styles1.InfoBox__getStarted].join(' ')}>
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
                  on this
                  {' '}
                  {isDrops ? 'Groupshop' : 'Microstore'}
                  .
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
                  this
                  {' '}
                  {isDrops ? 'Groupshop' : 'Microstore'}
                  {' '}
                  with friends to give them access to discounts too.
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
  name: 'Influencer',
  showRewards: false,
  setShowRewards: () => {},
};
export default InfoBox;
