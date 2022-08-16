import Button from 'components/Buttons/Button/Button';
import React, { useState } from 'react';
import {
  Col,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Row,
} from 'react-bootstrap';
import styles from 'styles/OnBoardingFlow.module.scss';
import PayPalIcon from 'assets/images/paypal.svg';
import VenmoIcon from 'assets/images/venmo.svg';
import ZelleIcon from 'assets/images/zelle.svg';
import CashAppIcon from 'assets/images/cash-app.svg';

const OnBoardingRewards = () => {
  const [show, setShow] = useState(false);
  const [emailNotification, setemailNotification] = useState(true);
  const [textRewards, settextRewards] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div onClick={handleShow} onKeyDown={handleShow} role="button" tabIndex={0}>onbaording rewards</div>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centeredv
        dialogClassName={styles.reward__modal}
        contentClassName={styles.reward__modal__content}
      >
        <Modal.Header className={styles.reward__modal__closebtnlg} />
        <div className="styles.reward__modal__imgBox">
          <img src="/images/purple-head.png" alt="headtag" className="img-fluid" />
        </div>
        <Modal.Body className={styles.reward__modal__body}>
          <h2>
            Getting rewards
          </h2>
          <div className={styles.reward__modal__body__description}>
            We’ll let you know you every time you earn cash with your Groupshop.
            You can link the account you want to receive your rewards on now or later
            through your rewards portal*.
          </div>
          <div className={styles.reward__modal__body__cashout}>
            Select cash-out method 👇
          </div>
          <Row className="px-4">
            <Col sm={6}>
              <div className={[styles.reward__modal__body__paypalIcon, styles.reward__modal__body__btnDisabled].join(' ')}>
                <PayPalIcon />
              </div>
            </Col>
            <Col sm={6}>
              <div className={styles.reward__modal__body__venmoIcon}>
                <VenmoIcon />
              </div>
            </Col>
          </Row>
          <Row className="px-4 mt-3">
            <Col sm={6}>
              <div className={[styles.reward__modal__body__zelleIcon, styles.reward__modal__body__btnDisabled].join(' ')}>
                <ZelleIcon />
              </div>
            </Col>
            <Col sm={6}>
              <div className={[styles.reward__modal__body__cashAppIcon, styles.reward__modal__body__btnDisabled].join(' ')}>
                <CashAppIcon />
              </div>
            </Col>
          </Row>
          <div className={styles.reward__modal__body__howInput}>
            <div>
              <InputGroup>
                <FormControl
                  placeholder="@ Enter Venmo handle"
                  aria-label="Cash Out Method Email"
                  aria-describedby="basic-addon2"
                  className={styles.reward__modal__body__howInput__input}
                />
                <Button id="button-addon2" className={styles.reward__modal__body__howInput__howBtn}>
                  How?
                </Button>
              </InputGroup>
            </div>
            <Button className={styles.reward__modal__body__howInput__saveBtn}>Save</Button>
          </div>
          <div className={styles.reward__modal__body__info}>
            *We’ll send you a link to your rewards portal via email so you can track your
            progress and update your payment settings anytime.
          </div>
          <div className={styles.reward__modal__body__seprator} />
          <div className={styles.reward__modal__body__info}>
            ✨ Opt-in to email and SMS notifications so we can notify you when someone shops
            from your page and you’ve earned rewards.
          </div>

          <div className={styles.reward__modal__body__checkArea}>
            <div>
              <Form.Check
                className={styles.reward__modal__body__checkArea__checkbox}
                type="checkbox"
                checked={emailNotification}
              >
                <Form.Check.Input type="checkbox" name="bnr" className={styles.reward__modal__body__checkArea__checkbox__check} />
                <Form.Check.Label>
                  Email me notifications
                </Form.Check.Label>
              </Form.Check>
              <div className={styles.reward__modal__body__checkArea__txt}>
                We don’t sell or share your information.
                You can unsuscribe at any time.
              </div>
            </div>
            <div>
              <Form.Check
                className={styles.reward__modal__body__checkArea__checkbox}
                type="checkbox"
                checked={textRewards}
              >
                <Form.Check.Input type="checkbox" name="bnr" className={styles.reward__modal__body__checkArea__checkbox__check} />
                <Form.Check.Label>
                  Text me about my rewards
                </Form.Check.Label>
              </Form.Check>
              <InputGroup className={styles.reward__modal__body__checkArea__inputGroup}>
                <InputGroup.Text id="basic-addon1" className={styles.reward__modal__body__checkArea__preTxt}>+1</InputGroup.Text>
                <FormControl
                  placeholder=""
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  className={styles.reward__modal__body__checkArea__input}
                />
              </InputGroup>
              <div className={styles.reward__modal__body__checkArea__txt1}>
                By entering your number, you agree to receive recurring personalized marketing text
                messages from Groupshop at the cell number entered below. Msg & data rates may
                apply. View Terms & Privacy
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center my-4">
            <Button
              className={styles.reward__modal__body__btn}
              onClick={handleClose}
            >
              Done
            </Button>
          </div>
          <div className={styles.reward__modal__body__btnskip} onClick={handleClose} onKeyDown={handleClose} role="button" tabIndex={0}>
            Skip and shop
          </div>
        </Modal.Body>

      </Modal>
    </>
  );
};

export default OnBoardingRewards;
