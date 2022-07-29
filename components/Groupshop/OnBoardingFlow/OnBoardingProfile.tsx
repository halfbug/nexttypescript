import Button from 'components/Buttons/Button/Button';
import React, { useState } from 'react';
import {
  Form,
  FormControl,
  InputGroup,
  Modal,
} from 'react-bootstrap';
import styles from 'styles/OnBoardingFlow.module.scss';
import InstagramIcon from 'assets/images/intagram-icon-black.svg';
import PIcon from 'assets/images/p-icon-black.svg';
import TikTokIcon from 'assets/images/tiktok-icon-grey.svg';
import TwitterIcon from 'assets/images/twitter-icon-grey.svg';
import TickIconGrey from 'assets/images/tik-icon-grey.svg';
import Theme5Icon from 'assets/images/theme5.svg';
import TickIcon from 'assets/images/tick-icon.svg';
import CrossIcon from 'assets/images/cross.svg';
import ProductCard from '../ProductCard/ProductCard';

const OnBoardingProfile = () => {
  const [show, setShow] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [bannerImage, setBannerImage] = useState<string>('https://s3.amazonaws.com/gsnodeimages/native-root-stage_logoImage2.jpeg?AWSAccessKeyId=AKIA6KH4T3ZCMIHFWAXN&Expires=1654709088&Signature=4jaVHOONPIQGyt%2Fi04AaLXbbZNk%3D');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handlesetShowProduct = () => setShow(false);

  return (
    <>
      <div onClick={handleShow} onKeyDown={handleShow} role="button" tabIndex={0}>onbaording profile</div>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centeredv
        dialogClassName={styles.profile__modal}
        contentClassName={styles.profile__modal__content}
      >
        <Modal.Header className={styles.profile__modal__closebtnlg} />
        <div className="styles.profile__modal__imgBox">
          <img src="/images/purple-head.png" alt="headtag" className="img-fluid" />
        </div>
        <Modal.Body className={styles.profile__modal__body}>
          <div className={styles.profile__modal__body__leftArea}>
            <div className={styles.profile__modal__body__label}>
              Edit your welcome header
            </div>
            <Form.Control type="text" placeholder="Enter email" className={styles.profile__modal__body__input} value="Welcome to Elisa’s Groupshop" />
            <div className={styles.profile__modal__body__inputCount}>29/50</div>

            <div className={styles.profile__modal__body__leftArea__titleIcon_row}>
              <div className={styles.profile__modal__body__label}>
                Add social links
              </div>
              <div className={styles.profile__modal__body__leftArea__titleIcon_row__icon}>
                <InstagramIcon />
                <PIcon />
                <TikTokIcon />
                <TwitterIcon />
              </div>
            </div>
            <InputGroup className={styles.profile__modal__body__input_group}>
              <FormControl
                placeholder="Select a channel"
                aria-label="Cash Out Method Email"
                aria-describedby="basic-addon2"
                className={styles.profile__modal__body__input}
              />
              <InputGroup.Text className={styles.profile__modal__body__input}>
                <TickIconGrey />
              </InputGroup.Text>
            </InputGroup>
            <div className={styles.profile__modal__body__label}>
              Pick a banner and theme
            </div>
            <div className={styles.profile__modal__body__themeIcons}>
              <div className={styles.profile__modal__body__themeIcons__theme}>
                <Theme5Icon />
                <div className={styles.profile__modal__body__themeIcons__theme__tick}>
                  <TickIcon />
                </div>
              </div>
              <Theme5Icon />
              <Theme5Icon />
              <Theme5Icon />
              <Theme5Icon />
              <Theme5Icon />
            </div>
            <div className={styles.profile__modal__body__label}>
              Add up to two products to your store
            </div>
            <div className={styles.profile__modal__body__descrip}>
              <div>
                Click ‘Add a Product’ to your right to select two products you love from
                Insert Name Here’s catalog. You can add more later.
              </div>
              <div className={styles.profile__modal__body__descrip__icon}>👉</div>
            </div>

            <div className="d-flex justify-content-start align-items-center my-4">
              <Button
                className={styles.profile__modal__body__btn}
                onClick={handleClose}
              >
                Save Choices
              </Button>
              <div className={styles.profile__modal__body__btnskip} onClick={handleClose} onKeyDown={handleClose} role="button" tabIndex={0}>
                Skip and shop
              </div>
            </div>
          </div>

          <div className={styles.profile__modal__body__rightArea}>
            <div className={styles.profile__modal__body__rightArea__rect}>
              <div className={styles.profile__modal__body__rightArea__banner} style={{ backgroundImage: `url(${bannerImage})` }}>
                <div className={styles.profile__modal__body__rightArea__banner__txt}>
                  Welcome to Elisa’s Groupshop
                </div>
              </div>
              <div className={styles.profile__modal__body__rightArea__productRow}>
                <ProductCard
                  isrc="/images/empty.png"
                  className={styles.profile__modal__body__pcard}
                  imgOverlay={(
                    <>
                      {showProduct === true ? (
                        <div className="m-1 d-flex justify-content-between">
                          <div className={styles.profile__modal__body__pcard__tagPrice}>
                            {`${30}% OFF`}
                          </div>
                          <div
                            className={styles.profile__modal__body__pcard__crossIcon}
                            onClick={() => setShowProduct(false)}
                            onKeyDown={handlesetShowProduct}
                            role="button"
                            tabIndex={-1}
                          >
                            <CrossIcon />
                          </div>
                        </div>
                      ) : (
                        <Button
                          className={styles.profile__modal__body__pcard__btn}
                          onClick={() => setShowProduct(true)}
                          disabled={false}
                        >
                          ADD A PRODUCT
                        </Button>
                      )}
                    </>
                  )}
                />
                <ProductCard
                  isrc="/images/empty.png"
                  className={styles.profile__modal__body__pcard}
                  imgOverlay={(
                    <>
                      {showProduct === true ? (
                        <div className="m-1 d-flex justify-content-between">
                          <div className={styles.profile__modal__body__pcard__tagPrice}>
                            {`${30}% OFF`}
                          </div>
                          <div
                            className={styles.profile__modal__body__pcard__crossIcon}
                            onClick={() => setShowProduct(false)}
                            onKeyDown={handlesetShowProduct}
                            role="button"
                            tabIndex={-1}
                          >
                            <CrossIcon />
                          </div>
                        </div>
                      ) : (
                        <Button
                          className={styles.profile__modal__body__pcard__btn}
                          onClick={() => setShowProduct(true)}
                          disabled={false}
                        >
                          ADD A PRODUCT
                        </Button>
                      )}
                    </>
                  )}
                />
              </div>
            </div>
          </div>
        </Modal.Body>

      </Modal>
    </>
  );
};

export default OnBoardingProfile;
