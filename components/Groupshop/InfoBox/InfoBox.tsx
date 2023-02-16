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
import Face from 'assets/images/face.svg';
import Envp from 'assets/images/envelop.svg';
import Cross from 'assets/images/CrossLg.svg';
import PuprpleHeadMobile from 'assets/images/purple-head-mobile.jpg';
import PuprpleHeadMobile2 from 'assets/images/purple-head-mobile2.jpg';
import ArrowDown from 'assets/images/arrow-down.svg';
import useGtm from 'hooks/useGtm';
import { Send } from 'react-bootstrap-icons';
import ShareButton from 'components/Buttons/ShareButton/ShareButton';
import useDeal from 'hooks/useDeal';
import Icon from 'assets/images/model-info-cone.svg';

interface mesProps {
  mes: string;
  brandname: any;
  handleRewardsModel?: any;
  shareUrl?: string;
  fullshareurl?: string;
}
const InfoBox = ({
  mes, brandname, shareUrl, handleRewardsModel, fullshareurl,
}: mesProps) => {
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
  const { socialText } = useDeal();

  const handleClose = () => {
    handleRewardsModel();
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const { isDrops } = useDeal();
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
          <Row onClick={handleClose}>
            <div><ArrowDown /></div>
          </Row>
        </Modal.Header>
        <div className="styles.groupshop_infoBox_imgBox">
          {isDrops && !isModalForMobile && <img src={PuprpleHeadMobile.src} alt="headtag" className="img-fluid" />}
          {!isDrops && !isModalForMobile && <img src={PuprpleHeadMobile2.src} alt="headtag" className="img-fluid" />}
          {isDrops && isModalForMobile && <img src={PuprpleHeadMobile.src} alt="headtag" className="img-fluid" />}
          {!isDrops && isModalForMobile && <img src={PuprpleHeadMobile2.src} alt="headtag" className="img-fluid" />}
        </div>
        <Modal.Body className="py-2 px-3">
          <div className={styles.groupshop_infoBox}>
            <h2>
              Shopping together has never
              <br />
              been so rewarding
              {' '}
              <Icon />
            </h2>
          </div>
          <div className={styles.groupshop_infoBox}>
            <p>
              Welcome to
              {' '}
              {isDrops ? 'Groupshop' : 'Microstore'}
              {' '}
              ‒ a personalized store where you
              and your friends shop and
              {' '}
              <strong>earn cashback and discounts.</strong>
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
                  {brandname}
                  {' '}
                  <strong>discounts</strong>
                  {' '}
                  on this
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
            <div className="my-2 d-flex justify-content-center">
              <Col xs={2} className="d-flex justify-content-end">
                <Face />
              </Col>
              <Col xs={9}>
                <p className={styles.groupshop_infoBox__pointers}>
                  If you’re one of the first 5 friends to join, you’ll
                  {' '}
                  <strong>earn cashback*</strong>
                  {' '}
                  on your order when more friends shop.
                </p>
              </Col>
            </div>
            {!isModalForMobile && (
            <div>
              <h4 className="align-content-center text-center fw-bold ">
                {' '}
                The more friends shop, the more
                <br />
                rewards for everyone!

              </h4>
            </div>
            )}
          </div>
          <div className="d-flex justify-content-center my-4">
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
                  text: `${socialText} ${shareUrl ?? ''}`,
                })}
              >
                <Send size={18} />

              </ButtonReact>
            ) : (
              <ShareButton
                  // placement="bottom"
                shareurl={shareUrl ?? ''}
                fullshareurl={fullshareurl ?? ''}
                  // label="Invite"
                  // className={styles.groupshop__top_invite}
                icon={<Send size={18} />}
                className={styles.groupshop_infoBox_shareBtn}
                onClick={() => googleEventCode('how-it-works-modal')}
              />
            )}
          </div>
          <div>
            <div className={styles.groupshop_infoBox_lastLine}>
              *Your cashback gets reimbursed
              automatically to the payment
              method you used for your order.
            </div>
          </div>
        </Modal.Body>

      </Modal>
    </>
  );
};

InfoBox.defaultProps = {
  handleRewardsModel: () => {},
  shareUrl: '',
  fullshareurl: '',
};

export default InfoBox;
