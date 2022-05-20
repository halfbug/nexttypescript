import InfoButton from 'components/Buttons/InfoButton/InfoButton';
import React, {
  useState, useEffect,
} from 'react';
import {
  Modal, Col, Row, Container, Button as ButtonReact,
} from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import Button from 'components/Buttons/Button/Button';
import styles from 'styles/Groupshop.module.scss';
import Cart from 'assets/images/cart.svg';
import Face from 'assets/images/face.svg';
import Envp from 'assets/images/envelop.svg';
import Cross from 'assets/images/CrossLg.svg';
import PuprpleHeadMobile from 'assets/images/purple-head-mobile.png';
import useDeal from 'hooks/useDeal';
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
        size="lg"
        width={681}
        aria-labelledby="contained-modal-title-vcenter"
        centeredv
        dialogClassName={styles.groupshop__info_modal}
        contentClassName={styles.groupshop__info_modal__content}
      >
        <Modal.Header className={styles.groupshop__info_modal__closebtnlg}>
          <Row onClick={handleClose}><Cross /></Row>
        </Modal.Header>
        <Modal.Header className={styles.groupshop__info_modal__closebtnsm}>
          <Row onClick={handleClose}><ArrowDown /></Row>
        </Modal.Header>
        <Modal.Body className="p-0">
          <Row className="styles.groupshop_infoBox_imgBox">
            {!isModalForMobile && <img src="/images/purple-head.png" alt="headtag" />}
            {isModalForMobile && <img src={PuprpleHeadMobile.src} alt="headtag" />}
          </Row>
          <Row>
            <div className={styles.groupshop_infoBox}>
              <h2>
                Shopping together has never
                <br />
                been so rewarding.
              </h2>
            </div>
          </Row>
          <section className={styles.groupshop_infoBox}>
            <Row className="d-flex justify-content-center">
              <p>
                Welcome to Groupshop ‒ a personalized store where you
                and your friends shop together and
                {' '}
                <strong>earn real cashback and discounts.</strong>
              </p>
            </Row>
            <Row className={styles.groupshop_infoBox_tostart}>
              <h3>
                To start earning
              </h3>
            </Row>
            <Row className="my-2 d-flex justify-content-center">
              <Col xs={2} className="d-flex justify-content-end">
                <Cart />
              </Col>
              <Col xs={9}>
                <p className={styles.groupshop_infoBox__pointers}>
                  <strong> Shop</strong>
                  {' '}
                  <i> limited-time </i>
                  offers from
                  {' '}
                  {brandname}
                  {' '}
                  and complete your order.
                </p>
              </Col>
            </Row>
            <Row className="my-2 d-flex justify-content-center">
              <Col xs={2} className="d-flex justify-content-end">
                {/* <img src={Face.src} alt="icon" /> */}
                <Envp />
              </Col>
              <Col xs={9}>
                <p className={styles.groupshop_infoBox__pointers}>
                  Share this Groupshop link with friends to give them access to
                  {' '}
                  <strong> exclusive discounts.</strong>
                </p>
              </Col>
            </Row>
            <Row className="my-2 d-flex justify-content-center">
              <Col xs={2} className="d-flex justify-content-end">
                <Face />
              </Col>
              <Col xs={9}>
                <p className={styles.groupshop_infoBox__pointers}>
                  <strong> Earn</strong>
                  {' '}
                  cashback* every time they shop, and keep unlocking additional rewards.
                </p>
              </Col>
            </Row>
            <Row>
              <h4 className="align-content-center text-center fw-bold ">
                {' '}
                The more friends shop, the more
                <br />
                rewards for everyone!

              </h4>
            </Row>
            <Row className="d-flex justify-content-center my-4">
              <Button
                className={styles.groupshop_infoBox_shoppingBtn}
                onClick={handleClose}
              >
                Start Shopping
              </Button>
              {isForMobile === false ? (
                <ButtonReact
                  id="mobileBtn"
                  variant="outline-primary"
                  // className={['m-1 rounded-pill', styles.groupshop__earn].join(' ')}
                  className={styles.groupshop_infoBox_shareBtn}
                  onClick={() => navigator?.share({
                    title: 'Groupshop',
                    text: `Send special discounts to your friends by sharing this ${shareUrl ?? ''})}`,
                  })}
                >
                  <Send size={18} />
                </ButtonReact>
              ) : (
                <ShareButton
                  // placement="bottom"
                  shareurl={shareUrl ?? ''}
                  // label="Invite"
                  // className={styles.groupshop__top_invite}
                  icon={<Send size={18} />}
                  className={styles.groupshop_infoBox_shareBtn}
                  onClick={() => googleEventCode('how-it-works-modal')}
                />
              )}
            </Row>
            <Row>
              <div className={styles.groupshop_infoBox_lastLine}>
                *Your cashback gets reimbursed
                automatically to the payment
                <br />
                method you used for your order.
              </div>
            </Row>
          </section>
        </Modal.Body>

      </Modal>
    </>
  );
};

InfoBox.defaultProps = {
  shareUrl: '',
};

export default InfoBox;
