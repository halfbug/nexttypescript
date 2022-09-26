import React from 'react';
import styles from 'styles/Marketing.module.scss';
import { RootProps } from 'types/store';
import {
  Col, Modal, Row, Table, Spinner,
} from 'react-bootstrap';
import Cross from 'assets/images/CrossLg.svg';
import CreateGroupshopBoxInner from './CreateGroupshopBoxInner';

interface CreateGroupshopBoxProps extends RootProps {
  show: boolean;
  showCreateBtn: boolean;
  handleInnerSubmit:any;
  setShowInvitePopup:any;
  startDate:string;
  endDate:string;
  minOrderValue:string;
  setCreateGroupshopPopup:any;
  inProgress: boolean;
  setInProgress: any;
  handleClose(e: any): any;
  listCustomers: any;
}

const CreateGroupshopBox = ({
  show = false, showCreateBtn, handleInnerSubmit, handleClose, listCustomers, setShowInvitePopup,
  startDate, endDate, minOrderValue, setCreateGroupshopPopup, inProgress, setInProgress,
}: CreateGroupshopBoxProps) => {
  const closeGroupshopModal = (e: any) => {
    setCreateGroupshopPopup(false);
    setShowInvitePopup(true);
  };
  return (
    <>
      <Modal
        show={show}
        onHide={closeGroupshopModal}
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
        { show && (
        <CreateGroupshopBoxInner
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          startDate={startDate}
          handleInnerSubmit={handleInnerSubmit}
          endDate={endDate}
          minOrderValue={minOrderValue}
          show={show}
          showCreateBtn={showCreateBtn}
          listCustomers={listCustomers}
          setShowInvitePopup={setShowInvitePopup}
          setCreateGroupshopPopup={setCreateGroupshopPopup}
          inProgress={inProgress}
          setInProgress={setInProgress}
          handleClose={handleClose}
        />
        )}
      </Modal>
    </>
  );
};
CreateGroupshopBox.defaultProps = {
};

export default CreateGroupshopBox;
