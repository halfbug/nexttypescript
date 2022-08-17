import React, {
  useState, useEffect,
} from 'react';
import {
  Modal, Row,
} from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import Button from 'components/Buttons/Button/Button';
import styles from 'styles/Groupshop.module.scss';
import Cross from 'assets/images/CrossLg.svg';
import PuprpleHeadMobile from 'assets/images/purple-head-mobile.jpg';
import ArrowDown from 'assets/images/arrow-down.svg';
import useGtm from 'hooks/useGtm';

interface mesProps {
  showRewards?: boolean;
  setShowRewards?: any;
}
const InfoBox = ({
  showRewards, setShowRewards,
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

  const handleClose = () => {
    setShow(false);
    setShowRewards(false);
  };
  return (
    <>
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
        <Modal.Body className="py-2 px-3 text-center">
          <div className={styles.groupshop_infoBox}>
            <img src="/images/name-here.png" alt="headtag" className="img-fluid" />
            <h2>
              This Groupshop expired!
            </h2>
            <p>
              <strong>But you can still get exclusive discounts</strong>
            </p>
            <div className="my-2 d-flex justify-content-center">
              <p className={styles.groupshop_expiremodal__pointers}>
                Click below and we'll pair you with another Groupshop to shop. share and earn!
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-center my-4">
            <Button
              className={styles.groupshop_infoBox_shoppingBtn}
              onClick={handleClose}
            >
              Find a Groupshop
            </Button>
          </div>
        </Modal.Body>

      </Modal>
    </>
  );
};

InfoBox.defaultProps = {
  showRewards: false,
  setShowRewards: () => {},
};
export default InfoBox;
