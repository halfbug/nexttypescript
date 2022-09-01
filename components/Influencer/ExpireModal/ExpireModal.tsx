import React, {
  useState, useEffect,
} from 'react';
import {
  Modal, Row,
} from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import Button from 'components/Buttons/Button/Button';
import styles from 'styles/Groupshop.module.scss';
import styles1 from 'styles/Influencer.module.scss';
import Cross from 'assets/images/CrossLg.svg';
import PuprpleHeadMobile from 'assets/images/purple-head-mobile.jpg';
import ArrowDown from 'assets/images/arrow-down.svg';
import { GET_ACTIVE_GROUPSHOP_BY_SHOP } from 'store/store.graphql';
import { useQuery } from '@apollo/client';
import useGtm from 'hooks/useGtm';
import { string } from 'yup';
import Link from 'next/link';

interface mesProps {
  storeId? : string;
  storeLogo? : string;
  showExpiredModel?: boolean;
  setShowExpiredModel?: any;
}
const InfoBox = ({
  showExpiredModel, setShowExpiredModel, storeLogo, storeId,
}: mesProps) => {
  const [show, setShow] = useState(false);
  const [groupShopURL, setGroupShopURL] = useState<string>('');
  const [groupShopError, setGroupShopError] = useState<string>('');

  const isModalForMobile = useMediaQuery({
    query: '(max-width: 475px)',
  });
  useEffect(() => {
    if (showExpiredModel) { setShow(true); }
  }, [showExpiredModel]);

  const { googleEventCode } = useGtm();
  useEffect(() => {
    if (show) { googleEventCode('how-it-works-modal'); }
  }, [show]);

  const {
    data, refetch,
  } = useQuery(GET_ACTIVE_GROUPSHOP_BY_SHOP, {
    variables: { storeId },
  });

  useEffect(() => {
    if (groupShopURL === '') {
      if (data?.getActiveGroupshop?.shortUrl) {
        setGroupShopURL(data.getActiveGroupshop.shortUrl);
      }
    }
  }, [data]);

  const handleClose = () => {
    setShow(false);
    setShowExpiredModel(false);
  };
  const handleError = () => {
    setGroupShopError('Sorry could not find any running groupshop');
  };
  return (
    <>
      <Modal
        show={show}
        backdrop="static"
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centeredv
        dialogClassName={styles.groupshop__info_modal}
        contentClassName={styles.groupshop__info_modal__content}
      >
        <Modal.Header className={styles.groupshop__info_modal__closebtnlg}>
          <Row onClick={handleClose} />
        </Modal.Header>
        <Modal.Header className={styles.groupshop__info_modal__closebtnsm}>
          <Row onClick={handleClose} />
        </Modal.Header>
        <div className="styles.groupshop_infoBox_imgBox">
          {!isModalForMobile && <img src="/images/purple-head.png" alt="headtag" className="img-fluid" />}
          {isModalForMobile && <img src={PuprpleHeadMobile.src} alt="headtag" className="img-fluid" />}
        </div>
        <Modal.Body className="py-2 px-3 text-center">
          <div className={styles.groupshop_infoBox}>
            <div className={styles.groupshop_infoBox_mobileLogo}>
              <img src={storeLogo} alt="headtag" className="img-fluid" />
            </div>
            <h2>
              This Groupshop expired!
            </h2>
            <div className={styles1.Influencer_expired}>
              <hr />
            </div>
            <p className={styles.groupshop_infoBox_textDiscount}>
              But you can still get exclusive discounts.

            </p>
            <div className="my-2 d-flex justify-content-center">
              <p className={styles.groupshop_expiremodal__pointers}>
                Click below and we'll pair you with another Groupshop to shop. share and earn!
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-center my-4">
            {groupShopURL !== ''
            && (
            <div
              className={`${'Button_onboarding__button__XLPBP'} ${styles.groupshop_infoBox_shoppingBtn}`}
            >
              <Link href={groupShopURL}>
                <a target="_blank" className="text-decoration-none">
                  Find a Groupshop
                </a>
              </Link>
            </div>
            )}
            {groupShopURL === ''
            && (
              <Button
                className={styles.groupshop_infoBox_shoppingBtn}
                onClick={handleError}
              >
                Find a Groupshop
              </Button>
            )}
          </div>
          <div className="text-danger">{groupShopError}</div>
        </Modal.Body>

      </Modal>
    </>
  );
};

InfoBox.defaultProps = {
  storeId: string,
  storeLogo: string,
  showExpiredModel: false,
  setShowExpiredModel: () => {},
};
export default InfoBox;
