/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import footerLogo1 from 'public/images/logo-thin.png';
import footerLogoExpire from 'public/images/logo-thin-expire.png';
import SocialButtonLinks from 'components/Buttons/SocialButtonLinks/SocialButtonLinks';
import styles from 'styles/Groupshop.module.scss';
import styles1 from 'styles/Influencer.module.scss';
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
import useAppContext from 'hooks/useAppContext';

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
  const { isChannel } = useAppContext();
  const {
    getDateDifference, isExpired, socialLinks, isInfluencerGS, getOwnerName,
  } = useDeal();
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
    values,
    errors,
    resetForm,
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
        resetForm({});
        showSuccess('You have successfully subscribed!');
      } else {
        showError('Email address is already registered!');
      }
    },
  });

  return (

    <Container fluid className={styles.groupshop_footer}>
      <hr />
      <Row className={styles.groupshop_footer_f1}>
        <Col lg={3}>
          <div>
            <div className={styles.groupshop_footer_expire_text}>
              {isExpired ? (
                <>
                  <h6>
                    <strong>THIS GROUPSHOP HAS EXPIRED </strong>
                  </h6>
                  <p className={styles1.GSfooter}>
                    Invite 1 friend to join Groupshop today, and start shopping
                    with them to get exclusive cashback and discounts.
                  </p>

                </>
              ) : (
                <>
                  {isInfluencerGS || isChannel ? (
                    <h6>
                      <span className={[styles1.Influencer_fontMeduim, ''].join(' ')}>
                        Want to keep shopping with unlimited rewards?

                      </span>
                    </h6>
                  ) : (
                    <h6 className={styles.groupshop_footer_counter_wrapper}>
                      <strong>Complete your order in time to benefit from these exclusive rewards!</strong>
                    </h6>
                  )}
                </>
              )}
            </div>

            {isInfluencerGS || isChannel ? (
              <Row>
                <Col className={styles1.Influencer_MobileView}>
                  <div className="text-center me-2">
                    <Button className={styles1.Influencer_footer_leftBtn} variant="">
                      <Link href="https://www.groupshop.com/consumers#brands">
                        <a target="_blank" className="text-decoration-none">
                          Explore all Groupshop brands
                          {' '}
                          {'>'}
                        </a>
                      </Link>
                    </Button>
                  </div>
                </Col>
              </Row>
            ) : (
              <Row className={[styles.groupshop_footer_counter, 'justify-content-start'].join(' ')}>
                <Col className="d-flex col-3 ">
                  <div className="text-center me-2">
                    <span>
                      {' '}
                      {(isExpired) ? '00' : days}
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
                      {(isExpired) ? '00' : hrs}
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
                      {(isExpired) ? '00' : mins}
                    </span>
                    <p className="mt-1">MINUTES</p>
                  </div>
                </Col>
              </Row>
            )}
          </div>
        </Col>
        <Col lg={4}>
          <Row className={['mt-2 mx-2 mb-2', styles.groupshop_footer__logo].join(' ')}>
            {/* <img src={footerLogo.src} alt="brandLogo" /> */}
            <img src="/images/logo-thin.svg" alt="Groupshop" className="img-fluid" />
          </Row>
          <Row className={styles.groupshop_socialIcon}>

            <section className="d-flex justify-content-center px-2">
              <div>
                {' '}
                <SocialButtonLinks network="Instagram" url={socialLinks?.instagram ?? ''} />
              </div>

              <div>
                {' '}
                <SocialButtonLinks network="Facebook" url={socialLinks?.facebook ?? ''} />
                {' '}
              </div>

              <div>
                {' '}
                <SocialButtonLinks network="Tiktok" url={socialLinks?.tiktok ?? ''} />
                {' '}
              </div>
              <div>
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
              {isExpired ? (
                <>
                  <p className={styles1.GSfooter}>

                    Stay on top of new offers from
                    {' '}
                    {/* {owner?.firstName} */}
                    {getOwnerName()}
                    .
                    <br />
                    Subscribe to get instant notifications.
                  </p>
                  <Form noValidate onSubmit={handleSubmit}>
                    <InputGroup id="borderclr">
                      <FormControl
                        name="email"
                        value={values.email}
                        placeholder="Enter your email"
                        aria-label="Email"
                        aria-describedby="basic-addon2"
                        isInvalid={!!errors.email}
                        className={styles.groupshop_footer_input2}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </InputGroup>
                    <Button type="submit" size="lg" variant="outline" className={styles.groupshop_footer_submit}>
                      Submit
                    </Button>
                  </Form>
                </>
              ) : (
                <>
                  <p>
                    <strong>Want your own store?</strong>
                    {' '}
                    Be the first to find out when
                    you can shop your favorite brands on Groupshop.
                  </p>
                  <Form noValidate onSubmit={handleSubmit}>
                    <InputGroup id="borderclr">
                      <FormControl
                        name="email"
                        value={values.email}
                        placeholder="Enter your email"
                        aria-label="Email"
                        aria-describedby="basic-addon2"
                        isInvalid={!!errors.email}
                        className={styles.groupshop_footer_input}
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

                </>
              )}

              {/* {isInfluencerGS ? (
                <>
                  <p>
                    <strong>Want your own store? </strong>
                    Be the first to find out when
                    you can shop your favorite brands on Groupshop.
                  </p>
                </>
              )
                : isExpired ? (
                  <>
                    <p>
                      <strong>Want your own store? </strong>
                      Be the first to find out when
                      you can shop your favorite brands on Groupshop.
                    </p>
                  </>
                )
                  : (
                    <p>
                      <strong>Want your own store? </strong>
                      Be the first to find out when
                      you can shop your favorite brands on Groupshop.
                    </p>
                  )} */}
            </div>

          </section>
        </Col>
      </Row>
      <Row className={styles.groupshop_footer_f2_wrapper}>
        <hr />
        <div className={[styles.groupshop_footer_f2].join(' ')}>
          <p>Powered by</p>
          <img src={isExpired ? footerLogoExpire.src : footerLogo1.src} alt="Logo" className=" mx-1" width={112} />
        </div>
      </Row>
      <AlertComponent />
    </Container>

  );
};
// Footer.defaultProps = {
//   isExpired: false,
// };

export default Footer;
