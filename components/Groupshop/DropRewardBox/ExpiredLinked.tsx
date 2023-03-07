import React from 'react';
import styles from 'styles/Modal.module.scss';
import { RootProps } from 'types/store';
import {
  Button,
  Col, Modal, Row,
} from 'react-bootstrap';
import Cross from 'assets/images/CrossLg.svg';
import GroupshopIcon from 'assets/images/Logo-small.svg';
import ArrowDown from 'assets/images/arrow-down.svg';
import useGtm from 'hooks/useGtm';
import { useMediaQuery } from 'react-responsive';
import useDeal from 'hooks/useDeal';
import useDrops from 'hooks/useDrops';
import useAppContext from 'hooks/useAppContext';
import useCountDown from 'hooks/useCountDown';

interface ExpiredLinkedProps extends RootProps {
  show: boolean;
  formId: string;
  shopName:string | string[];
  handleClose(e: any): any;

}

const ExpiredLinked = ({
  show = false, handleClose, formId, shopName,
}: ExpiredLinkedProps) => {
  const closeModal = (e: any) => {
    // setotherProducts(undefined);
    // setSelected(undefined);
    handleClose(e);
  };
  const { googleEventCode } = useGtm();
  const isDesktop = useMediaQuery({
    query: '(min-width: 476px)',
  });
  const {
    isCountdownOver,
  } : any = useCountDown();

  const {
    isExpired,
    shortActivateURL,
    activateURL,
    socialText,
  } = useDeal();

  const {
    currentDropReward,
  } = useDrops();

  const {
    gsctx: {
      revisedCount,
      store,
      expiredAt,
    },
  } = useAppContext();

  return (
    <>
      <Modal
        show={(show && expiredAt) || isCountdownOver}
        onHide={closeModal}
        size="lg"
        centered
        dialogClassName={styles.expiredLinked_modal}
        contentClassName={styles.expiredLinked_modal__content}
      >
        <Modal.Header className={styles.expiredLinked_modal__closebtnlg}>
          {/* <Row onClick={handleClose}>
            <div><Cross /></div>
          </Row> */}
        </Modal.Header>
        <Modal.Header className={styles.expiredLinked_modal__closebtnsm}>
          {/* <Row onClick={handleClose}>
            <div><ArrowDown /></div>
          </Row> */}
        </Modal.Header>
        <Modal.Body className={styles.expiredLinked_modal__body}>
          <Row className="mx-0">
            <Col lg={12} className="px-0">
              <div className={styles.expiredLinked_modal__top}>
                <div className={styles.expiredLinked_modal__top__icon}>
                  <GroupshopIcon />
                </div>
                {
                  revisedCount === 0 ? (
                    <h2 className="mx-3">
                      This drop has expired, but you can still get
                      {' '}
                      {currentDropReward}
                      % off.
                    </h2>
                  ) : (
                    <h2 className="mx-3">
                      This drop has expired, but you can still get
                      {' '}
                      {store?.drops?.rewards?.baseline}
                      % off the next one.
                    </h2>
                  )
                }
                <div className="d-flex justify-content-center my-4 align-items-center">
                  <span className="border shadow-sm w-auto h-25 px-3 py-1 rounded-3">0 hrs</span>
                  <span className="mx-2">:</span>
                  <span className="border shadow-sm w-auto h-25 px-3 py-1 rounded-3">0 mins</span>
                  <span className="mx-2">:</span>
                  <span className="border shadow-sm w-auto h-25 px-3 py-1 rounded-3">0 secs</span>
                </div>

              </div>
              {
                revisedCount === 0 && (
                <div className={styles.expiredLinked_modal__greyBox}>
                  <div className={styles.expiredLinked_modal__greyBox__text}>
                    Invite friends to join to get immediate access to
                    {' '}
                    {currentDropReward}
                    % off this drop.
                  </div>
                  <Row className="justify-content-center">
                    <Col lg={12}>
                      <div className={styles.expiredLinked_modal__btnSection}>
                        <Button
                          variant="dark"
                          onClick={() => navigator?.share({
                            title: 'Groupshop',
                            text: `${socialText} ${shortActivateURL ?? activateURL}`,
                          })}
                        >
                          Share with friends
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
                )
              }
              <div className={styles.expiredLinked_modal__greyBox}>
                {/* <div className={styles.expiredLinked_modal__greyBox__heading}>
                  After you shop, you unlock 50% off.
                </div> */}
                <div className={styles.expiredLinked_modal__greyBox__text}>
                  {
                    revisedCount === 0
                      ? ('Or, enter your phone number below &  join the waitlist for our next drop. We’ll text you when it goes live.')
                      : ('Enter your phone number below & join the waitlist for our next drop. We’ll text you when it goes live.')
                  }
                  {formId !== '' && shopName !== '' && (
                  <Row className="justify-content-center mt-3">
                    <Col lg={12}>
                      <iframe title="klaviyo-form" height="280" width="100%" src={(typeof window !== 'undefined') ? `${window.location.origin}/${shopName}/klaviyo-form/${formId}` : `/${shopName}/klaviyo-form/${formId}`} />
                    </Col>
                  </Row>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ExpiredLinked;
