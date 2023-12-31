import Button from 'components/Buttons/Button/Button';
import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import styles from 'styles/OnBoardingFlowRegular.module.scss';
import GroupshopIcon from 'assets/images/groupshop-icon.svg';
import MicrostoreIcon from 'assets/images/ms-icon.svg';
import PuprpleHeadMobile2 from 'assets/images/purple-head-mobile2.jpg';
import { useRouter } from 'next/router';
import useLogo from 'hooks/useLogo';
import { GroupshopContext } from 'store/groupshop.context';
import { useMutation } from '@apollo/client';
import { IGroupshop } from 'types/groupshop';
import { ADD_DEAL_PRODUCT } from 'store/store.graphql';
import useCode from 'hooks/useCode';
import useOwnerOnboarding from 'hooks/useOwnerOnboarding';
import useDeal from 'hooks/useDeal';

interface Props {
  open: Boolean
}

const OnBoardWelcomeRegular = ({ open }: Props) => {
  const [addDealProduct] = useMutation<IGroupshop>(ADD_DEAL_PRODUCT);
  const [show, setShow] = useState<Boolean>(false);
  const { countTotalDiscount } = useOwnerOnboarding();
  const storeLogo = useLogo();
  const Router = useRouter();
  const { brandName } = useDeal();
  const {
    shop, discountCode, ownerCode,
  } = useCode();

  const {
    nativeShareText, gsShortURL, currencySymbol, getOwnerFirstName, isDrops,
  } = useDeal();
  // console.log('nativeShareText ===', nativeShareText);
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
    dispatch({ type: 'UPDATE_GROUPSHOP', payload: { ...gsctx, obSettings: { ...gsctx.obSettings, step: 1 } } });

    await addDealProduct({
      variables: {
        updateGroupshopInput: {
          id: gsctx.id,
          obSettings: {
            ...gsctx.obSettings,
            step: 1,
          },
        },
      },
    });

    // if (shop && ownerCode && discountCode) {
    //   Router.push(`/${shop}/deal/${discountCode}/owner&${ownerCode}`);
    // }
    handleClose();
  };

  return (
    <>
      <div onClick={handleShow} onKeyDown={handleShow} role="button" tabIndex={0}>ON-BOARDING FLOW - REGULAR/DEFAULT</div>
      <Modal
        show={show}
        onHide={() => {
          moveForward();
          handleClose();
        }}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        // backdrop="static"
        dialogClassName={styles.welcome__modal}
        contentClassName={styles.welcome__modal__content}
      >
        <Modal.Header className={styles.welcome__modal__closebtnlg} />
        <div className={styles.welcome__modal__imgBox}>
          {isDrops
            ? <img src="/images/purple-head.png" alt="headtag" className="img-fluid" />
            : <img src={PuprpleHeadMobile2.src} alt="headtag" className="img-fluid" />}
        </div>
        <Modal.Body className={styles.welcome__modal__body}>
          {/* <LeEsableIcon className={styles.welcome__modal__body__mainicon} /> */}
          <div className={styles.welcome__modal__icons}>
            <img src={storeLogo} className={styles.welcome__modal__body__mainicon} alt="brand logo" />
            <div className={styles.welcome__modal__body__vertical_seprator} />
            {isDrops
              ? <GroupshopIcon className={styles.welcome__modal__body__mainicons__icon} />
              : <MicrostoreIcon className={styles.welcome__modal__body__mainicons__icon} />}
          </div>
          <div className={styles.welcome__modal__body__mainiconarea}>

            <img src={storeLogo} className={styles.welcome__modal__body__mainiconMobile} alt="brand logo" />
            <div className={styles.welcome__modal__body__mainiconarea__vertical_seprator} />
            <MicrostoreIcon className={styles.welcome__modal__body__mainiconarea__icon} />
          </div>
          <h2 className={[styles.welcome__modal__body__welcomeTxt, 'd-lg-block d-none'].join(' ')}>
            Welcome
            {' '}
            {getOwnerFirstName()}
            !
          </h2>
          <h2 className={styles.welcome__modal__body__welcomeTxtMobile}>
            New to Microstore?
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
            Here are the two ways you can earn rewards with
            {' '}
            {gsctx.store?.brandName}
            :
          </div>
          <div className={styles.welcome__modal__body__icons}>
            🛒
            {'  '}
            📩
            {'  '}
            🤑
          </div>
          <div className={styles.welcome__modal__body__getStarted2}>
            {/* 3 steps to get started */}
            Two ways to Earn Rewards
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
              <strong> Shop </strong>
              exclusive
              {' '}
              {brandName}
              {' '}
              discounts and get
              {' '}
              {gsctx.discountCode.percentage}
              % off your order.
            </p>
            {/* <p className={[styles.welcome__modal__body__descriptionSmall,
            styles.welcome__modal__body__box2__p2].join(' ')}>
              You can also shop these discounts yourself, we won’t judge.
            </p> */}
          </div>
          <div className={styles.welcome__modal__body__box3}>
            <p className={styles.welcome__modal__body__description}>
              <strong> Share </strong>
              this Microstore with friends and
              <strong> earn 100% cashback </strong>
              when they shop!
              <p className={[styles.welcome__modal__body__descriptionSmall,
                styles.welcome__modal__body__box2__p2].join(' ')}
              >
                That’s&nbsp;
                <strong>
                  {currencySymbol}
                  {Number.isInteger(countTotalDiscount())
                    ? countTotalDiscount() : countTotalDiscount().toFixed(2)}
                </strong>
                , in case you forgot.
              </p>
            </p>
          </div>

          <div
            className={styles.welcome__modal__body__boxMobile}
            onClick={moveForward}
            onKeyDown={moveForward}
            role="button"
            tabIndex={0}
          >
            <p className={styles.welcome__modal__body__boxMobile__txt}>
              <div className={styles.welcome__modal__body__boxMobile__txt__icon}>🛒</div>
              <div>
                <strong> Shop </strong>
                exclusive
                {' '}
                {gsctx.store?.brandName}
                {' '}
                discounts and get
                {' '}
                <strong>
                  {gsctx.discountCode.percentage}
                  %
                  {' '}
                </strong>
                off your  order.
              </div>
            </p>
          </div>
          <div
            role="button"
            tabIndex={0}
            className={styles.welcome__modal__body__boxMobile}
            onClick={() => navigator?.share({
              title: 'Microstore',
              text: `${nativeShareText} ${gsShortURL}`,
            })}
            onKeyDown={() => navigator?.share({
              title: 'Microstore',
              text: `${nativeShareText} ${gsShortURL}`,
            })}

          >
            <p className={styles.welcome__modal__body__boxMobile__txt}>
              <div className={styles.welcome__modal__body__boxMobile__txt__icon}>📩</div>
              <div>
                <strong> Share </strong>
                {' '}
                this Microstore with friends and
                {' '}
                <strong> earn 100% cashback  </strong>
                when they shop.
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
            {/* <div className={styles.welcome__modal__body__description2}>
              Customize your Groupshop now and share it when you’re done!
            </div> */}
          </div>

          <div className="d-flex justify-content-center my-4">
            <Button
              className={[styles.welcome__modal__body__btn].join(' ')}
              onClick={moveForward}
            >
              Get Started
            </Button>

            {/* <Button
              className={styles.welcome__modal__body__btnMobile}
              onClick={moveForward}
            >
              Get Started
            </Button> */}
          </div>
          {/* <div
            className={styles.welcome__modal__body__btnskip}
            onClick={handleClose}
            onKeyDown={handleClose}
            role="button"
            tabIndex={0}
          >
            Skip and shop
          </div> */}
          {/* <div
            className={styles.welcome__modal__body__btnskipMobie}
            onClick={handleClose}
            onKeyDown={handleClose}
            role="button"
            tabIndex={0}
          >
            Skip to shop
          </div> */}
        </Modal.Body>

      </Modal>
    </>
  );
};

export default OnBoardWelcomeRegular;
