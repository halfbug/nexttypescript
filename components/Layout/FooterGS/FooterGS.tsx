/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import footerLogo1 from 'public/images/logo-thin.png';
import SocialButtonLinks from 'components/Buttons/SocialButtonLinks/SocialButtonLinks';
import styles from 'styles/Groupshop.module.scss';
import {
  Form, Col, Row, Button, FormControl, InputGroup, Container,
} from 'react-bootstrap';
import { ChevronRight } from 'react-bootstrap-icons';
import useDeal from 'hooks/useDeal';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import * as yup from 'yup';
import useAlert from 'hooks/useAlert';
import { useMutation } from '@apollo/client';
import { CREATE_SIGNUP } from 'store/store.graphql';
import Link from 'next/link';

interface FooterProps {
  LeftComp: React.ReactNode;
  RightComp: React.ReactNode;
}

export interface ISignUp {
  email?: string;
  createSignUpInput?: object;
}

const Footer = ({
  LeftComp, RightComp,
}: FooterProps) => {
  const { getDateDifference, isExpired, socialLinks } = useDeal();
  const { days, hrs, mins } = getDateDifference();

  const [
    addSignUp,
    // eslint-disable-next-line no-unused-vars
    { data, loading, error },
  ] = useMutation<ISignUp>(CREATE_SIGNUP);
  const { AlertComponent, showError, showSuccess } = useAlert();
  const validationSchema = yup.object({
    email: yup.string().email('Invalid email format').required('Required email address.'),
  });

  const {
    handleSubmit,
    handleChange,
    errors,
    setFieldValue,
  }: FormikProps<ISignUp> = useFormik<ISignUp>({
    initialValues: {
      email: '',
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: async (valz, { validateForm }: FormikHelpers<ISignUp>) => {
      if (validateForm) validateForm(valz);
      const { email } = valz;
      const signUpObj: null | any = await addSignUp({
        variables: {
          createSignUpInput: {
            email,
          },
        },
      });
      if (signUpObj.data.createSignUp.email !== '') {
        showSuccess('You have successfully subscribed!');
      } else {
        showError('Email address is already registered');
      }
    },
  });

  return (

    <Container fluid className={styles.groupshop_footer}>
      <hr />
      <Row className={styles.groupshop_footer_f1}>
        <Col lg={3}>
          <div className={styles.groupshop_footer_counter_wrapper}>
            <p className="mb-5 w-75 ">{isExpired ? <strong>THIS GROUPSHOP HAS EXPIRED </strong> : <b>Complete your order in time to benefit from these exclusive rewards!</b>}</p>
            <Row className={[styles.groupshop_footer_counter, 'justify-content-start'].join(' ')}>
              <Col className="d-flex col-3 ">
                <div className="text-center me-2">
                  <span>
                    {' '}
                    {days}
                  </span>
                  <p className="mt-1">DAYS</p>
                </div>
                <div className="py-3">
                  {' '}
                  :
                </div>
              </Col>
              <Col className="d-flex col-3  ">
                <div className="text-center mx-2">
                  <span>
                    {hrs}
                  </span>
                  <p className="mt-1">HOURS</p>
                </div>
                <div className="py-3">
                  {' '}
                  :
                </div>
              </Col>
              <Col className="d-flex col-3 ">
                <div className="text-center mx-3">
                  <span>
                    {mins}
                  </span>
                  <p className="mt-1">MINUTES</p>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col lg={4}>
          <Row className={['mt-2 mx-2 mb-2', styles.groupshop_footer__logo].join(' ')}>
            {/* <img src={footerLogo.src} alt="brandLogo" /> */}
            <img src="/images/logo-thin.svg" alt="Groupshop" className="img-fluid" />
          </Row>
          <Row className={styles.groupshop_socialIcon}>

            <section className="d-flex justify-content-center px-2">
              <div className="mx-1">
                {' '}
                <SocialButtonLinks network="Instagram" url={socialLinks?.instagram ?? ''} />
              </div>

              <div className="mx-1">
                {' '}
                <SocialButtonLinks network="Facebook" url={socialLinks?.facebook ?? ''} />
                {' '}
              </div>

              <div className="mx-1">
                {' '}
                <SocialButtonLinks network="Tiktok" url={socialLinks?.tiktok ?? ''} />
                {' '}
              </div>
              <div className="mx-1">
                {' '}
                <SocialButtonLinks network="Twitter" url={socialLinks?.twitter ?? ''} />
                {' '}
              </div>
            </section>

          </Row>
          <Row className={['d-flex', styles.groupshop_footer_link].join(' ')}>
            <div className=" text-center ">
              <Link href="https://groupshop.zendesk.com/hc/en-us/sections/4429435469843-About-us">
                <a target="_blank"><strong>About</strong></a>
              </Link>
              <Link href="https://groupshop.zendesk.com/hc/en-us/categories/4414265217427-For-Shoppers">
                <a target="_blank"><strong>FAQ</strong></a>
              </Link>
            </div>
          </Row>
        </Col>
        <Col lg={3}>
          <section>
            <div className={styles.groupshop_footer_text}>
              <p>
                <strong>Want your own store? </strong>
                Be the first to find out when
                you can shop your favorite brands on Groupshop.
              </p>
            </div>
            <Form noValidate onSubmit={handleSubmit}>
              <InputGroup className=" my-3" id="borderclr">
                <FormControl
                  name="email"
                  placeholder="Enter your email"
                  aria-label="Email"
                  aria-describedby="basic-addon2"
                  isInvalid={!!errors.email}
                  className="border-bottom rounded-0 border-0 px-2"
                  onChange={handleChange}
                />
                <Button type="submit" size="sm" variant="outline" className={styles.groupshop_footer_sub}>
                  <ChevronRight size={16} />
                </Button>
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </InputGroup>
            </Form>
          </section>
        </Col>
      </Row>
      <Row className={styles.groupshop_footer_f2_wrapper}>
        <hr />
        <div className={styles.groupshop_footer_f2}>
          <p>Powered by</p>
          <img src={footerLogo1.src} alt="Logo" className=" mx-1" width={112} />
        </div>
      </Row>
      <AlertComponent />
    </Container>

  );
};

export default Footer;
