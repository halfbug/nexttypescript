/* eslint-disable no-undef */
import React from 'react';
import styles from 'styles/Marketing.module.scss';
import { RootProps } from 'types/store';
import {
  Col, Modal, Row, Form,
} from 'react-bootstrap';
import Cross from 'assets/images/CrossLg.svg';
import { InfoCircle } from 'react-bootstrap-icons';
import ToolTip from 'components/Buttons/ToolTip/ToolTip';
import WhiteButton from 'components/Buttons/WhiteButton/WhiteButton';

interface InviteCustomerBoxProps extends RootProps {
  show: boolean;
  handleClose(e: any): any;
  // addToCart(e: any): any;
}

const InviteCustomerBox = ({
  show = false, handleClose,
}: InviteCustomerBoxProps) => {
  const closeModal = (e: any) => {
    // setotherProducts(undefined);
    // setSelected(undefined);
    handleClose(e);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={closeModal}
        size="lg"
        centered
        dialogClassName={styles.marketing_inviteCustomerBox_modal}
        contentClassName={styles.marketing_inviteCustomerBox_modal__content}
      >
        <Modal.Header className={styles.marketing_inviteCustomerBox_modal__closebtnlg}>
          <Row onClick={handleClose}>
            <div><Cross /></div>
          </Row>
        </Modal.Header>
        <Modal.Body className={styles.marketing_inviteCustomerBox_modal__body}>
          <Row>
            <Col lg={12}>
              <div className={styles.marketing_inviteCustomerBox_modal__top}>
                <h4>
                  Add Past Customers
                </h4>
                <p>
                  To avoid duplicate pages, customers who have previously received
                  a Groupshop will not show below.
                </p>
                <p>
                  After you add customers, they will receive an automatic email containing
                  a link to their
                  Groupshop and instructions on how to use it.
                </p>
              </div>
              <hr />
            </Col>
          </Row>
          <Row className={styles.marketing_inviteCustomerBox_modal__bottom}>
            <Col lg={6}>
              <h4>
                Filter by date range:
              </h4>
              <Row>
                <Col lg={6}>
                  <span className={styles.marketing_inviteCustomerBox_modal__label}>
                    Start Date
                  </span>
                  <ToolTip
                    className={styles.marketing__tooltip_1}
                    popoverClassName={styles.marketing__tooltip_1__popover}
                    icon={<InfoCircle size={13} />}
                    popContent=""
                  />
                  <Form.Control
                    type="date"
                  />
                </Col>
                <Col lg={6}>
                  <span className={styles.marketing_inviteCustomerBox_modal__label}>
                    End Date
                  </span>
                  <ToolTip
                    className={styles.marketing__tooltip_1}
                    popoverClassName={styles.marketing__tooltip_1__popover}
                    icon={<InfoCircle size={13} />}
                    popContent=""
                  />
                  <Form.Control
                    type="date"
                  />
                </Col>
              </Row>
              <WhiteButton
                className={styles.marketing_inviteCustomerBox_modal__btn}
              >
                Clear dates
              </WhiteButton>
            </Col>
            <Col lg={6}>
              <h4>Filter by order value:</h4>
              <div>
                <span className={styles.marketing_inviteCustomerBox_modal__label}>
                  Minimum Order Value
                </span>
              </div>
              <Form.Control
                className={styles.marketing_inviteCustomerBox_modal__input}
                type="text"
              />
            </Col>
            <Row className="mt-5" />
            <Col lg={6}>
              <h4>Filter by products purchased:</h4>
              <p className={styles.marketing_inviteCustomerBox_modal__hint}>
                Only orders containing at least one of the products selected below will qualify.
              </p>
              <WhiteButton
                className={styles.marketing_inviteCustomerBox_modal__btn}
              >
                Add products
              </WhiteButton>
            </Col>
            <Col lg={6}>
              <h4>Filter by number of purchases</h4>
              <span className={styles.marketing_inviteCustomerBox_modal__label}>
                Minimum number of orders placed
              </span>
              <Form.Control
                className={styles.marketing_inviteCustomerBox_modal__input}
                type="text"
              />
            </Col>
            <Col lg={12}>
              <div className={styles.marketing_inviteCustomerBox_modal__btnSection}>
                <WhiteButton
                  className={styles.marketing_inviteCustomerBox_modal__btn}
                  onClick={handleClose}
                >
                  Close
                </WhiteButton>
                <WhiteButton
                  className={styles.marketing_inviteCustomerBox_modal__purpleBtn}
                >
                  Create Groupshops for 372 customers
                </WhiteButton>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};
InviteCustomerBox.defaultProps = {
};

export default InviteCustomerBox;