import Button from 'components/Buttons/Button/Button';
import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import styles from 'styles/OnBoardingFlowRegular.module.scss';
import GroupshopIcon from 'assets/images/groupshop-icon.svg';
import { useRouter } from 'next/router';
import { GroupshopContext } from 'store/groupshop.context';
import { useMutation } from '@apollo/client';
import { IGroupshop } from 'types/groupshop';
import { ADD_DEAL_PRODUCT } from 'store/store.graphql';
import useLogo from 'hooks/useLogo';
import useCode from 'hooks/useCode';

interface Props {
  open: Boolean
}

const OnBoardTimeToShine = ({ open }: Props) => {
  const [show, setShow] = useState<Boolean>(false);
  const Router = useRouter();
  const storeLogo = useLogo();
  const {
    shop, discountCode, ownerCode,
  } = useCode();
  const { gsctx, dispatch } = useContext(GroupshopContext);
  const [addDealProduct] = useMutation<IGroupshop>(ADD_DEAL_PRODUCT);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setShow(open);
  }, [open]);

  const moveForward = async () => {
    const data = {
      ...gsctx.obSettings,
      step: 4,
    };

    dispatch({ type: 'UPDATE_GROUPSHOP', payload: { ...gsctx, obSettings: { ...gsctx.obSettings, ...data } } });

    await addDealProduct({
      variables: {
        updateGroupshopInput: {
          id: gsctx.id,
          dealProducts: gsctx.dealProducts,
          obSettings: {
            ...data,
          },
        },
      },
    });

    if (shop && ownerCode && discountCode) {
      handleClose();
      Router.push(`/${shop}/deal/${discountCode}/owner&${ownerCode}`);
    }
  };

  return (
    <>
      <div onClick={handleShow} onKeyDown={handleShow} role="button" tabIndex={0}>onbaording time to shine</div>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centeredv
        backdrop="static"
        dialogClassName={styles.timeToShine__modal}
        contentClassName={styles.timeToShine__modal__content}
      >
        <Modal.Header className={styles.timeToShine__modal__closebtnlg} />
        <div className={styles.timeToShine__modal__imgBox}>
          <img src="/images/purple-head.png" alt="headtag" className="img-fluid" />
        </div>
        <Modal.Body className={styles.timeToShine__modal__body}>
          {/* <LeEsableIcon className={styles.timeToShine__modal__body__mainicon} /> */}
          {/* <img src={storeLogo}
          className={styles.timeToShine__modal__body__mainicon} alt="brand logo" /> */}
          <div className={`m-0 ${styles.welcome__modal__icons}`}>
            <img src={storeLogo} className={styles.welcome__modal__body__mainicon} alt="brand logo" />
            <div className={styles.welcome__modal__body__vertical_seprator} />
            <GroupshopIcon className={styles.welcome__modal__body__mainicons__icon} />
          </div>

          <div className={styles.timeToShine__modal__body__mainiconarea}>
            {/* <LeEsableIcon /> */}
            <img src={storeLogo} className={styles.timeToShine__modal__body__mainiconMobile} alt="brand logo" />

            <div className={styles.timeToShine__modal__body__mainiconarea__vertical_seprator} />
            <GroupshopIcon className={styles.timeToShine__modal__body__mainiconarea__icon} />
          </div>
          <h2 className={styles.timeToShine__modal__body__welcomeTxt}>
            Time to shine ✨
          </h2>
          <h2 className={styles.timeToShine__modal__body__welcomeTxtMobile}>
            Shop, share, earn
          </h2>
          <div className={styles.timeToShine__modal__body__description1}>
            You’ve claimed your Groupshop and you’re set to
            <strong> earn cash everytime someone shops. </strong>
          </div>
          <div className={styles.timeToShine__modal__body__description2}>
            You’ve customized your Groupshop! Now explore your store,
            invite your friends to give them access to exclusive discounts,
            and start earning when they shop.
          </div>

          <div className={styles.timeToShine__modal__body__sharingTxt}>
            Shop, share, earn
          </div>

          <div className={styles.timeToShine__modal__body__box1}>
            <p className={styles.timeToShine__modal__body__box1__txt}>
              After you’ve earned 100% of your order in cashback, you’ll
              <strong> keep earning 15% of every order </strong>
              made on your Groupshop.
            </p>
          </div>

          <div className={styles.timeToShine__modal__body__box}>
            <div className={styles.timeToShine__modal__body__box__img}>👀</div>
            <div className={styles.timeToShine__modal__body__box__txt}>
              Explore your unique Groupshop.
            </div>
          </div>

          <div className={styles.timeToShine__modal__body__box}>
            <div className={styles.timeToShine__modal__body__box__img}>📩</div>
            <div className={styles.timeToShine__modal__body__box__txt}>
              Invite your friends and followers
              to shop with you to give them access to exclusive discounts.
            </div>
          </div>

          <div className={styles.timeToShine__modal__body__box}>
            <div className={styles.timeToShine__modal__body__box__img}>🤑</div>
            <div className={styles.timeToShine__modal__body__box__txt}>
              Everytime someone shops (including you)
              you’ll earn cashback* and unlock additional rewards for everyone.
            </div>
          </div>

          <div className={styles.timeToShine__modal__body__boxMobile}>
            <div className={styles.timeToShine__modal__body__boxMobile__txt}>
              Every time someone shops, you’ll
              <strong> receive cashback* </strong>
              and unlock additional rewards for everyone.
            </div>
          </div>

          <div className={styles.timeToShine__modal__body__seprator} />

          <div className={styles.timeToShine__modal__body__iconsRowdollar}>
            😍 😍 😍
          </div>
          <div className="d-flex justify-content-center my-4">
            <Button
              className={styles.timeToShine__modal__body__btn}
              onClick={moveForward}
            >
              Start Earning
            </Button>
            <Button
              className={styles.timeToShine__modal__body__btnMobile}
              onClick={moveForward}
            >
              Start Earning
            </Button>
          </div>
        </Modal.Body>

      </Modal>
    </>
  );
};

export default OnBoardTimeToShine;
