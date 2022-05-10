/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, Fragment } from 'react';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import * as yup from 'yup';
import useAlert from 'hooks/useAlert';
import { useLazyQuery } from '@apollo/client';
import { GET_QR_DEAL } from 'store/store.graphql';
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
import QR from 'assets/images/qr-screen-1.png';
import QRMobile from 'assets/images/qr-screen-mobile-1.png';
import Instagram from 'assets/images/instagram.svg';
import Pinterest from 'assets/images/pinterest.svg';
import Twitter from 'assets/images/twitter.svg';
import TikTok from 'assets/images/TikTokPixel.svg';
import useUtilityFunction from 'hooks/useUtilityFunction';

// import shared component
import MarqueeSlider from 'components/Shared/MarqueeSlider/MarqueeSlider';

export interface IQRCode {
  email: string;
  ordernumber: string;
}

interface IStep1Props {
  setShowStep1: any;
  setShowStep2: any;
  setShowStep3: any;
  setdealLink: any;
  setbrandLogo: any;
}

export default function QrStep1({
  setShowStep1,
  setShowStep2,
  setShowStep3,
  setdealLink,
  setbrandLogo,
}: IStep1Props) {
  const validationSchema = yup.object({
    email: yup.string().email('Invalid email format').required('Required'),
    ordernumber: yup.number().typeError('Must be a number only').required('Required'),
  });

  const { AlertComponent, showError } = useAlert();

  const [getDealLink, { data }] = useLazyQuery(GET_QR_DEAL, {
    onError() {
      showError('Record not found!');
    },
  });

  const { getSignedUrlS3, getKeyFromS3URL } = useUtilityFunction();
  useEffect(() => {
    async function gets3logo() {
      if (data) {
        const key = getKeyFromS3URL(data?.getQrDealLink.brandname ?? '');
        const logoS3 = await getSignedUrlS3(key);
        console.log(logoS3);
        setbrandLogo(logoS3);
        setShowStep1(false);
        setShowStep2(true);
        setTimeout(() => {
          setdealLink(data.getQrDealLink.url);
          setShowStep2(false);
          setShowStep3(true);
        }, 2000);
      }
    }
    gets3logo();
  }, [data]);

  const {
    handleSubmit,
    handleChange,
    errors,
    setFieldValue,
  }: FormikProps<IQRCode> = useFormik<IQRCode>({
    initialValues: {
      email: '',
      ordernumber: '',
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: async (valz, { validateForm }: FormikHelpers<IQRCode>) => {
      if (validateForm) validateForm(valz);
      const { email, ordernumber } = valz;
      getDealLink({ variables: { email, ordernumber } });
    },
  });

  return (
    <>
      <div className={styles.QRContainer}>
        <Container fluid>
          <Row>
            <Col md={6}>
              <div className={styles.QRContainer__form__wrapper}>
                <div className={styles.QRContainer__Logo}>
                  <HeadLogo />
                </div>
                <div className={styles.QRContainer__mobileImage}>
                  <Image src={QRMobile} alt="QR Right Screen" layout="responsive" />
                </div>
                <div className={styles.QRContainer__content__container}>
                  <div className={styles.QRContainer__content__heading}>
                    <h2>
                      Access your personalized store with
                      {' '}
                      <strong>
                        exclusive discounts and cashback for you and your friends.
                      </strong>
                    </h2>
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
                      <Form.Group className="mb-4">
                        <div className={styles.QRContainer__text__how}>
                          <Form.Label>Order Number</Form.Label>
                          <a>
                            {' '}
                            <ToolTip
                              className={styles.dashboard_campaign__pop}
                              label="How?"
                              popContent="You can find your order number on the order confirmation email from the brand you used Groupshop with as well as the order summary slip included in your package."
                            />
                          </a>

                        </div>
                        <Form.Control
                          type="text"
                          placeholder="Enter Order Number"
                          name="ordernumber"
                          isInvalid={!!errors.ordernumber}
                          onChange={(e) => setFieldValue('ordernumber', e.currentTarget.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.ordernumber}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <div className={styles.QRContainer__btnGroupShop}>
                        <Button type="submit"> Get my Groupshop </Button>
                      </div>
                    </Form>
                  </div>
                  <div className={styles.QRContainer__bottom__content}>
                    <hr />
                    <p>
                      Have Questions?
                      {' '}
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
                          {' '}
                          <Link href="https://www.groupshop.com/"><a target="_blank">groupshop.com</a></Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={6} className="p-0">
              <div className={styles.QRContainer__contentImage}>
                <div className={styles.QRContainer__desktopImage}>
                  <Image
                    src={QR}
                    alt="QR Right Screen"
                    width="100%"
                    height="100%"
                    layout="responsive"
                    className={styles.QRContainer__fit__image}
                  />
                </div>
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
