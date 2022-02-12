/* eslint-disable no-unused-vars */
import InfoButton from 'components/Buttons/InfoButton/InfoButton';
import React, {
  useState,
} from 'react';
import {
  Button,
  Modal,
} from 'react-bootstrap';
import styles from 'styles/Groupshop.module.scss';

// interface InfoBoxProps extends RootProps {
//   show : boolean;
//   handleClose(e:any): any;
//   // handleSearch(e:any): any;
// }

const InfoBox = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <InfoButton handleClick={handleShow} message="How does this work?" />

      <Modal
        show={show}
        onHide={handleClose}
        className={styles.groupshop_modal_info}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centeredv
      >

        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>

      </Modal>
    </>
  );
};

// InfoBox.defaultProps = {
//   user: {},
// };

export default InfoBox;
