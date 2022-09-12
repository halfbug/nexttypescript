/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, Fragment } from 'react';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import * as yup from 'yup';
import useAlert from 'hooks/useAlert';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_ACTIVE_GROUPSHOPS_BY_EMAIL, GET_QR_DEAL } from 'store/store.graphql';
import Image from 'next/image';
import ToolTip from 'components/Buttons/ToolTip/ToolTip';
import { Check2Circle, InfoCircle, XCircle } from 'react-bootstrap-icons';
import Link from 'next/link';

// import react bootstrap components
import {
  Form, Button, Container, Row, Col,
} from 'react-bootstrap';

// import styles
import styles from 'styles/QrStoreDetails.module.scss';

// import images
import HeadLogo from 'assets/images/QRLogo.svg';
import QR from 'assets/images/qr-screen-1.jpg';
import QRMobile from 'assets/images/qr-screen-mobile-1.jpg';
import Instagram from 'assets/images/instagram.svg';
import Pinterest from 'assets/images/pinterest.svg';
import Twitter from 'assets/images/twitter.svg';
import TikTok from 'assets/images/TikTokPixel.svg';
import useUtilityFunction from 'hooks/useUtilityFunction';
import GroupshopRoundLogo from 'assets/images/groupshop-round-logo.svg';
import GroupshopRoundLogo1 from 'assets/images/groupshop-round-logo1.svg';

// import shared component
import MarqueeSlider from 'components/Shared/MarqueeSlider/MarqueeSlider';

export interface IQRCode {
  email: string;
}

interface IStep1Props {
  setShowStep1: any;
  setShowStep2: any;
  setShowStep3: any;
  setactiveGroupshops: any;
  setEmail: any;
}

export default function QrStep1({
  setShowStep1,
  setShowStep2,
  setShowStep3,
  setactiveGroupshops,
  setEmail,
}:IStep1Props) {
  const validationSchema = yup.object({
    email: yup.string()
      .email('Invalid email format')
      .required('Required'),
  });
  const { AlertComponent, showError } = useAlert();

  // const [getDealLink, { data }] = useLazyQuery(GET_QR_DEAL, {
  //   onError() {
  //     showError('Record not found!');
  //   },
  // });

  const [getDealLink, { data }] = useLazyQuery(GET_ACTIVE_GROUPSHOPS_BY_EMAIL, {
    onError() { showError('Error in finding Groupshops!'); },
  });

  // const { getSignedUrlS3, getKeyFromS3URL } = useUtilityFunction();
  useEffect(() => {
    async function gets3logo() {
      if (data) {
        // const key = getKeyFromS3URL(data?.getQrDealLink.brandname ?? '');
        // const logoS3 = await getSignedUrlS3(key);
        // console.log(logoS3);
        // setbrandLogo(logoS3);
        if (data?.getActiveGroupshops.length) {
          setShowStep1(false);
          setShowStep2(true);
          setactiveGroupshops(data?.getActiveGroupshops || []);
        } else {
          setShowStep1(false);
          setShowStep3(true);
        }
        // setdealLink(data.getQrDealLink.url);
      }
    }
    gets3logo();
  }, [data]);

  const {
    handleSubmit,
    handleChange,
    errors,
  }: FormikProps<IQRCode> = useFormik<IQRCode>({
    initialValues: {
      email: '',
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: async (valz, { validateForm }: FormikHelpers<IQRCode>) => {
      if (validateForm) validateForm(valz);
      const { email } = valz;
      // console.log("🚀 ~ file: QrStep1.tsx ~ line 105 ~ onSubmit: ~ email", email)
      setEmail(email);
      getDealLink({ variables: { email } });
    },
  });

  return (
    <>
      <div className={styles.QRContainer}>
        <Container fluid>
          <Row>
            <Col md={6} sm={12} className="p-0">
              <div className={styles.QRContainer__form__wrapper}>
                <div className={styles.QRContainer__Logo}>
                  <HeadLogo />
                </div>
                <div className={styles.QRContainer__mobileImage}>
                  <img src={QRMobile.src} alt="QR Right Screen" className="img-fluid" />
                  <GroupshopRoundLogo1 className="img-fluid" />
                </div>
                <div className={styles.QRContainer__content__container}>
                  <div className={[styles.QRContainer__content__congratswrapper, styles.QRContainer__content__container__congratsmain].join(' ')}>
                    <div className={styles.QRContainer__content__heading}>
                      <h2>
                        Access your personalized store with
                        <strong>
                          exclusive discounts and cashback for you and your friends.
                        </strong>
                      </h2>
                      <GroupshopRoundLogo className="img-fluid" />
                    </div>
                    <div className={styles.QRContainer__content__container__congratsmain__simply}>
                      <p>
                        Simply enter the email you used to shop with any Groupshop
                        <br />
                        brand to get started.
                      </p>
                    </div>
                    <div className={styles.QRContainer__content__container__congratsmain__how}>
                      How?
                    </div>
                    <div className={styles.QRContainer__content__container__congratsmain__email}>
                      <div className={`${styles['QRContainer__content'
                          + '__container__congratsmain__email__notsure']}`}
                      >
                        <div className={`${styles['QRContainer__content'
                          + '__container__congratsmain__email__notsure__box']}`}
                        >
                          &nbsp;
                        </div>
                        <p className={`${styles['QRContainer__content__container'
                          + '__congratsmain__email__notsure__notsureemail']}`}
                        >
                          Not sure what email you send to check-out?
                          Check for an email confirmation from the brand.
                        </p>
                      </div>
                    </div>
                    <div className={styles.QRContainer__form__container}>
                      <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group className="mb-4">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Email"
                            name="email"
                            isInvalid={!!errors.email}
                            onChange={(e) => handleChange(e)}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.email}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <div className={styles.QRContainer__btnGroupShop}>
                          <Button type="submit">Get my Groupshop</Button>
                        </div>
                      </Form>
                    </div>
                  </div>
                  <div className={styles.QRContainer__bottom__content}>
                    <hr />
                    <p className={styles.question}>
                      Have Questions?
                      <a href="/">Peep our FAQ</a>
                    </p>

                    <div className={styles.QRContainer__social__media}>
                      <div className={styles.QRContainer__social__icons}>
                        <Link href="https://www.instagram.com/groupshopit/"><a target="_blank"><Instagram /></a></Link>
                        <Link href="https://pinterest.com/Groupshop/"><a target="_blank"><Pinterest /></a></Link>
                        <Link href="https://twitter.com/groupshopit"><a target="_blank"><Twitter /></a></Link>
                        <Link href="https://www.tiktok.com/@groupshopit?lang=en"><a target="_blank"><TikTok /></a></Link>
                      </div>
                      <div className={styles.QRContainer__link}>
                        <p>
                          Go to
                          <Link href="https://www.groupshop.com/"><a target="_blank">groupshop.com</a></Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={6} sm={12} className="p-0">
              <div className={styles.QRContainer__desktopImage}>
                <img src={QR.src} alt="QRImage" className="img-fluid" />
              </div>
            </Col>
          </Row>
        </Container>
        <AlertComponent />
        <MarqueeSlider />
      </div>
    </>
  );
}
