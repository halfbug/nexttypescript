import Button from 'components/Buttons/Button/Button';
import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import styles from 'styles/OnBoardingFlowRegular.module.scss';
import GroupshopIcon from 'assets/images/groupshop-icon.svg';
import { useRouter } from 'next/router';
import useLogo from 'hooks/useLogo';
import { GroupshopContext } from 'store/groupshop.context';
import { useMutation } from '@apollo/client';
import { IGroupshop } from 'types/groupshop';
import { ADD_DEAL_PRODUCT } from 'store/store.graphql';
import useCode from 'hooks/useCode';
import useOwnerOnboarding from 'hooks/useOwnerOnboarding';

interface Props {
  open: Boolean
}

const OnBoardWelcomeRegular = ({ open }: Props) => {
  const [addDealProduct] = useMutation<IGroupshop>(ADD_DEAL_PRODUCT);
  const [show, setShow] = useState<Boolean>(false);
  const { countTotalDiscount } = useOwnerOnboarding();
  const storeLogo = useLogo();
  const Router = useRouter();
  const {
    shop, discountCode, ownerCode,
  } = useCode();
  const { gsctx, dispatch } = useContext(GroupshopContext);

  const handleClose = () => {
    setShow(false);
    if (shop && ownerCode && discountCode) {
      Router.push(`/${shop}/deal/${discountCode}/owner&${ownerCode}`);
    }
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    setShow(open);
  }, [open]);

  const moveForward = async () => {
    dispatch({ type: 'UPDATE_GROUPSHOP', payload: { ...gsctx, obSettings: { ...gsctx.obSettings, step: 0 } } });

    await addDealProduct({
      variables: {
        updateGroupshopInput: {
          id: gsctx.id,
          obSettings: {
            step: 0,
          },
        },
      },
    });

    // if (shop && ownerCode && discountCode) {
    //   Router.push(`/${shop}/deal/${discountCode}/${ownerCode}/1`);
    // }
  };

  return (
    <>
      <div onClick={handleShow} onKeyDown={handleShow} role="button" tabIndex={0}>ON-BOARDING FLOW - REGULAR/DEFAULT</div>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        dialogClassName={styles.welcome__modal}
        contentClassName={styles.welcome__modal__content}
      >
        <Modal.Header className={styles.welcome__modal__closebtnlg} />
        <div className={styles.welcome__modal__imgBox}>
          <img src="/images/purple-head.png" alt="headtag" className="img-fluid" />
        </div>
        <Modal.Body className={styles.welcome__modal__body}>
          {/* <LeEsableIcon className={styles.welcome__modal__body__mainicon} /> */}
          <img src={storeLogo} className={styles.welcome__modal__body__mainicon} alt="brand logo" />
          <div className={styles.welcome__modal__body__mainiconarea}>
            {/* <LeEsableIcon /> */}
            <img src={storeLogo} className={styles.welcome__modal__body__mainiconMobile} alt="brand logo" />
            <div className={styles.welcome__modal__body__mainiconarea__vertical_seprator} />
            <GroupshopIcon className={styles.welcome__modal__body__mainiconarea__icon} />
          </div>
          <h2 className={styles.welcome__modal__body__welcomeTxt}>
            Welcome to Groupshop!
          </h2>
          <h2 className={styles.welcome__modal__body__welcomeTxtMobile}>
            Welcome to Groupshop!
          </h2>
          {/* <div className={styles.welcome__modal__body__description}>
            The
            <strong> personalized store </strong>
            where you and your friends
            <strong> shop together </strong>
            and
            <strong> earn 100% cashback and discounts. </strong>
          </div> */}
          <div className={styles.welcome__modal__body__descriptionMobile}>
            The
            <strong> personalized store</strong>
            where you and your friends
            <strong>shop together </strong>
            and
            <strong>earn real cashback and discounts.</strong>
            {/* {' '}
            {gsctx.store?.brandName}
            : */}
          </div>
          <div className={styles.welcome__modal__body__icons}>🛒   📩   🤑</div>
          <div className={styles.welcome__modal__body__getStarted}>
            {/* 3 steps to get started */}
            How it works
          </div>
          {/* <div className={styles.welcome__modal__body__box1}>
            <p className={styles.welcome__modal__body__description}>
              <strong> Customize </strong>
              your Groupshop by adding your favorite
              {' '}
              {gsctx.store?.brandName}
              {' '}
              products.
            </p>
          </div> */}
          <div className={styles.welcome__modal__body__box2}>
            <p className={styles.welcome__modal__body__description}>
              <strong> Share </strong>
              your Groupshop with friends to give them access to
              <strong>
                {' '}
                up to
                {' '}
                {gsctx.discountCode.percentage}
                % off.
                {' '}
              </strong>
            </p>
            <p className={[styles.welcome__modal__body__descriptionSmall, styles.welcome__modal__body__box2__p2].join(' ')}>
              You can also shop these discounts yourself, we won’t judge.
            </p>
          </div>
          <div className={styles.welcome__modal__body__box3}>
            <p className={styles.welcome__modal__body__description}>
              <strong> Earn cashback </strong>
              on your order -
              <strong> up to 100% </strong>
              - everytime someone shops.
              <p className={[styles.welcome__modal__body__descriptionSmall, styles.welcome__modal__body__box2__p2].join(' ')}>
                That’s&nbsp;
                <strong>
                  $
                  {countTotalDiscount()}
                </strong>
                , in case you forgot.
              </p>
            </p>
          </div>

          <div className={styles.welcome__modal__body__boxMobile}>
            <p className={styles.welcome__modal__body__boxMobile__txt}>
              {/* <div className={styles.welcome__modal__body__boxMobile__txt__icon}>🛒</div> */}
              <div>
                Using Groupshop, you can
                {' '}
                <strong>earn up to 100% cashback </strong>
                on your recent
                {' '}
                {gsctx.store?.brandName}
                {' '}
                order.
              </div>
            </p>
          </div>
          <div className={styles.welcome__modal__body__boxMobile}>
            <p className={styles.welcome__modal__body__boxMobile__txt}>
              {/* <div className={styles.welcome__modal__body__boxMobile__txt__icon}>📩</div> */}
              <div>
                You and your friends can get
                {' '}
                <strong> up to 40% off</strong>
                {' '}
                on your favorite
                {' '}
                {gsctx.store?.brandName}
                {' '}
                products!
              </div>
            </p>
          </div>
          {/* <div className={styles.welcome__modal__body__ractengal}></div> */}
        </Modal.Body>
        <hr className={styles.welcome__modal__body__horizontal_seprator} />
        <Modal.Body className={styles.welcome__modal__body}>
          {/* <div className={styles.welcome__modal__body__readytxt}>
            Ready to see your store?
          </div> */}
          <div className={[styles.welcome__modal__body__description, styles.welcome__modal__body__w50].join(' ')}>
            The
            <strong> more friends </strong>
            shop, the
            <strong> more rewards </strong>
            for everyone.
            <br />
            <br />
            <div className={styles.welcome__modal__body__description2}>
              Customize your Groupshop now and share it when you’re done!
            </div>
          </div>

          <div className="d-flex justify-content-center my-4">
            <Button
              className={styles.welcome__modal__body__btn}
              onClick={moveForward}
            >
              Customize
            </Button>

            <Button
              className={styles.welcome__modal__body__btnMobile}
              onClick={moveForward}
            >
              Get Started
            </Button>
          </div>
          <div className={styles.welcome__modal__body__btnskip} onClick={handleClose} onKeyDown={handleClose} role="button" tabIndex={0}>
            Skip for now
          </div>
          <div className={styles.welcome__modal__body__btnskipMobie} onClick={handleClose} onKeyDown={handleClose} role="button" tabIndex={0}>
            Skip to shop
          </div>
        </Modal.Body>

      </Modal>
    </>
  );
};

export default OnBoardWelcomeRegular;
