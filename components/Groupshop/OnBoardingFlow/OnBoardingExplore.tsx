import Button from 'components/Buttons/Button/Button';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import styles from 'styles/OnBoardingFlow.module.scss';

const Icon = () => (
  <svg width="112" height="21" viewBox="0 0 112 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.242188 5.40145H2.92165V19.1603H12.2147V20.2873H0.242188V5.40145Z" fill="black" />
    <path d="M14.1354 5.40145H27.1287V6.52853H16.8149V11.7599H25.9378V12.8657H16.8149V19.1603H27.1287V20.2873H14.1354V5.40145Z" fill="black" />
    <path d="M42.0641 20.5C39.8666 20.5 38.1299 20.0747 36.854 19.2241C35.5781 18.3734 34.8834 17.1684 34.77 15.6089H37.0029C37.1021 16.9132 37.5629 17.8702 38.3851 18.4798C39.2074 19.0752 40.4195 19.3729 42.0215 19.3729C43.4109 19.3729 44.46 19.1319 45.1688 18.6499C45.8919 18.1679 46.2534 17.4661 46.2534 16.5446C46.2534 16.0059 46.1187 15.5522 45.8493 15.1836C45.58 14.815 45.105 14.4889 44.4245 14.2054C43.7441 13.9077 42.7729 13.6312 41.5112 13.376C39.5264 12.9791 37.9669 12.4616 36.8327 11.8237C35.7128 11.1857 35.1528 10.2642 35.1528 9.05913C35.1528 7.72649 35.7695 6.74827 37.0029 6.12448C38.2504 5.50069 39.8595 5.1888 41.8301 5.1888C43.9 5.1888 45.4949 5.55031 46.6149 6.27334C47.7491 6.98219 48.3941 7.9675 48.5501 9.22925H46.3384C46.1258 8.19433 45.6367 7.45003 44.8711 6.99637C44.1056 6.5427 43.0423 6.31587 41.6813 6.31587C40.4195 6.31587 39.4626 6.52853 38.8104 6.95384C38.1583 7.37915 37.8322 7.94623 37.8322 8.65508C37.8322 9.08039 37.9527 9.449 38.1937 9.76089C38.4347 10.0586 38.8813 10.3351 39.5335 10.5902C40.1856 10.8454 41.1142 11.1006 42.3193 11.3558C43.8646 11.6819 45.105 12.0292 46.0407 12.3978C46.9764 12.7664 47.6924 13.2555 48.1886 13.8651C48.6848 14.4748 48.9328 15.2616 48.9328 16.2256C48.9328 17.5724 48.3161 18.6215 47.0827 19.3729C45.8493 20.1243 44.1764 20.5 42.0641 20.5Z" fill="black" />
    <path d="M61.5053 16.4595H53.2542L51.3616 20.2873H49.5328L57.2734 5.1888H58.8258L66.1199 20.2873H63.2916L61.5053 16.4595ZM60.9736 15.3325L57.5074 7.88952L53.8284 15.3325H60.9736Z" fill="black" />
    <path d="M67.8808 5.40145H75.0048C76.2098 5.40145 77.266 5.54322 78.1733 5.82676C79.0948 6.1103 79.8037 6.52144 80.2999 7.06017C80.7961 7.58472 81.0442 8.20142 81.0442 8.91027C81.0442 9.78925 80.6827 10.5548 79.9596 11.207C79.2508 11.8591 78.308 12.2986 77.1313 12.5254C78.6199 12.6955 79.7895 13.0712 80.6401 13.6525C81.4908 14.2196 81.9161 15.0915 81.9161 16.2682C81.9161 17.5583 81.3632 18.5507 80.2574 19.2453C79.1657 19.94 77.585 20.2873 75.5151 20.2873H67.8808V5.40145ZM74.2179 12.015C75.5648 12.015 76.5926 11.7599 77.3014 11.2495C78.0245 10.7391 78.386 10.0019 78.386 9.03786C78.386 7.36497 77.0179 6.52853 74.2817 6.52853H70.5603V12.015H74.2179ZM75.7278 19.1603C76.8478 19.1603 77.7126 18.9051 78.3222 18.3947C78.9318 17.8843 79.2366 17.14 79.2366 16.1618C79.2366 15.1694 78.7971 14.418 77.9181 13.9077C77.0533 13.3831 75.7774 13.1209 74.0903 13.1209H70.5603V19.1603H75.7278Z" fill="black" />
    <path d="M84.183 5.40145H86.8625V19.1603H96.1555V20.2873H84.183V5.40145Z" fill="black" />
    <path d="M98.0762 5.40145H111.069V6.52853H100.756V11.7599H109.879V12.8657H100.756V19.1603H111.069V20.2873H98.0762V5.40145ZM107.348 0.595436C107.688 0.198479 108.106 0 108.603 0C108.83 0 109.014 0.0567083 109.156 0.170125C109.297 0.283541 109.368 0.425312 109.368 0.595436C109.368 0.907331 109.092 1.25467 108.539 1.63745L105.285 3.91286H104.392L107.348 0.595436Z" fill="black" />
  </svg>
);

const OnBoardingExplore = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div onClick={handleShow} onKeyDown={handleShow} role="button" tabIndex={0}>onbaording explore</div>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centeredv
        dialogClassName={styles.explore__modal}
        contentClassName={styles.explore__modal__content}
      >
        <Modal.Header className={styles.explore__modal__closebtnlg} />
        <div className="styles.explore__modal__imgBox">
          <img src="/images/purple-head.png" alt="headtag" className="img-fluid" />
        </div>
        <Modal.Body className={styles.explore__modal__body}>
          <Icon />
          <h2>
            That’s it, you did it! 🎉
          </h2>
          <div className={styles.explore__modal__body__description}>
            You’ve claimed your Groupshop and you’re set to
            <strong> earn cash everytime someone shops. </strong>
          </div>

          <div className={styles.explore__modal__body__sharingTxt}>
            Start sharing and earning
          </div>

          <div className={styles.explore__modal__body__box}>
            <div className={styles.explore__modal__body__box__img}>👀</div>
            <div className={styles.explore__modal__body__box__txt}>
              Explore your Groupshop and curate your favorite products.
            </div>
          </div>

          <div className={styles.explore__modal__body__box}>
            <div className={styles.explore__modal__body__box__img}>📩</div>
            <div className={styles.explore__modal__body__box__txt}>
              Invite your friends and followers to shop with you to give them access
              to exclusive discounts.
            </div>
          </div>

          <div className={styles.explore__modal__body__box}>
            <div className={styles.explore__modal__body__box__img}>🤑</div>
            <div className={styles.explore__modal__body__box__txt}>
              Everytime someone shops (including you) you’ll earn 10% cash.
            </div>
          </div>

          <div className="d-flex justify-content-center my-4">
            <Button
              className={styles.explore__modal__body__btn}
              onClick={handleClose}
            >
              Explore your Groupshop
            </Button>
          </div>
          <div onClick={handleClose} onKeyDown={handleClose} role="button" tabIndex={0}>
            <span className={styles.explore__modal__body__btnskip_img}>🎨</span>
            <span className={styles.explore__modal__body__btnskip}>Customize Products & Theme</span>
          </div>
        </Modal.Body>

      </Modal>
    </>
  );
};

export default OnBoardingExplore;
