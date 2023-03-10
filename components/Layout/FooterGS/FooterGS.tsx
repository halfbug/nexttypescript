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
import SocialButtonMobile from 'components/Buttons/SocialButton/SocialButtonMobile';
import Brand from 'components/Groupshop/Brand/Brand';
import useLogo from 'hooks/useLogo';

interface FooterProps {
  LeftComp: React.ReactNode;
  RightComp: React.ReactNode;
  isDrops?:boolean;
  shopName?:string | string[];
  formId?: string;
  setLearnHowDrops?: any;
  pending?: boolean;
}

export interface ISignUp {
  email?: string;
  createSignUpInput?: object;
}

const Footer = ({
  LeftComp, RightComp, isDrops, setLearnHowDrops, formId, shopName, pending,
}: FooterProps) => {
  // const { isChannel } = useAppContext();
  const {
    getDateDifference, isExpired, socialLinks, isInfluencerGS, getOwnerName, gsctx,
  } = useDeal();

  const { store } = gsctx;
  const storeLogo = useLogo();
  const milestone3 = store?.drops?.rewards?.maximum;
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
                    <strong>
                      THIS
                      {' '}
                      {isDrops ? 'GROUPSHOP' : 'MICROSTORE'}
                      {' '}
                      HAS EXPIRED
                      {' '}
                    </strong>
                  </h6>
                  <p className={styles1.GSfooter}>
                    Invite 1 friend to join
                    {' '}
                    {isDrops ? 'Groupshop' : 'Microstore'}
                    today, and start shopping
                    with them to get exclusive cashback and discounts.
                  </p>

                </>
              ) : (
                <>
                  {isInfluencerGS ? (
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

            {isInfluencerGS ? (
              <Row>
                <Col className={styles1.Influencer_MobileView}>
                  <div className="text-center me-2">
                    <Button className={styles1.Influencer_footer_leftBtn} variant="">
                      <Link href="https://www.groupshop.com/consumers#brands">
                        <a target="_blank" className="text-decoration-none">
                          Explore all Microstore brands
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
          <div className={['mt-2 mx-2 mb-2', styles.groupshop_footer__logo].join(' ')}>
            {/* <img src={footerLogo.src} alt="brandLogo" /> */}
            {isDrops ? (<img src={isDrops ? '/images/logo.svg' : `${process.env.IMAGE_PATH}/ms-logo-svg.svg`} alt="Groupshop" className=" img-fluid" />)
              : (
                <div className="text-center">
                  {store?.logoImage === '' || store?.logoImage === undefined ? (
                    <Link href={`https://${store?.shop}`}>
                      <Brand
                        name={
                      (store?.brandName || '').split(' ').slice(0, 2).join(' ') || ''
                    }
                        pending={pending}
                      />
                    </Link>
                  ) : (
                    <Link href={`https://${store?.shop}`}>
                      <a target="_blank" style={{ cursor: 'pointer' }}>
                        <img
                          src={storeLogo}
                          alt={`${store?.brandName}`}
                          className="img-fluid"
                          width={100}
                        />
                      </a>
                    </Link>
                  )}
                </div>

              )}
            {/* <img src="/images/logo-thin.svg" alt="Groupshop" className="img-fluid" /> */}
          </div>
          <Row className={styles.groupshop_socialIcon}>

            {isDrops
              ? (
                <section className="d-flex justify-content-center px-2">
                  <div className="mx-1">
                    <SocialButtonMobile isDrops text={`Shop on my Groupshop Drops and get up to ${milestone3}% off `} network="Email" url={gsctx?.shortUrl ? gsctx?.shortUrl : ''} />
                  </div>
                  <div className="mx-1">
                    <SocialButtonMobile isDrops text="" network="Instagram" url="https://www.instagram.com/groupshopit/" />
                  </div>
                  <div className="mx-1">
                    <SocialButtonMobile isDrops text="" network="Pinterest" url="https://www.pinterest.com/Groupshop/" />
                  </div>
                  <div className="mx-1">
                    <SocialButtonMobile isDrops text="" network="Twitter" url="https://twitter.com/groupshopit" />
                  </div>
                  <div className="mx-1">
                    <SocialButtonMobile isDrops text="" network="Facebook" url="https://www.facebook.com/groupshopit/" />
                  </div>
                </section>
              )
              : (
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
              )}

          </Row>
          <Row className={['d-flex', styles.groupshop_footer_link].join(' ')}>
            <div className=" text-center ">
              {isDrops && (
                <>
                  <a
                    onClick={() => setLearnHowDrops(true)}
                    onKeyDown={() => setLearnHowDrops(true)}
                    role="button"
                    tabIndex={0}
                  >
                    <strong>How it Works</strong>

                  </a>
                </>
              )}
              {/* {!isDrops && (
                <>
                  <Link href="https://groupshop.zendesk.com/hc/en-us/sections/4429435469843-About-us">
                    <a target="_blank"><strong>About</strong></a>
                  </Link>
                </>
              )} */}
              {isDrops ? (
                <Link href="https://groupshop.zendesk.com/hc/en-us">
                  <a target="_blank"><strong>Get Help</strong></a>
                </Link>
              ) : (
                <></>
                // <Link href="https://microstore.zendesk.com/hc/en-us">
                //   <a target="_blank"><strong>FAQ</strong></a>
                // </Link>
              )}
            </div>
          </Row>
        </Col>
        <Col lg={3}>
          <section>
            {!isDrops && (
            <div className={styles.groupshop_footer_text}>
              {/* {isExpired ? (
                <>
                  <p className={styles1.GSfooter}>

                    Stay on top of new offers from
                    {' '}

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
                    you can shop your favorite brands on Microstore.
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
              )} */}

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
            )}
            {isDrops && (
            <div className={styles.groupshop_footer_text}>
              <>
                <p>
                  <strong>Want in on the next drops?</strong>
                </p>
                <p>
                  Join the waitlist and we’ll text you when it’s your turn.
                </p>
                {formId !== '' && shopName !== '' && (
                <div className="mt-3">
                  <iframe title="klaviyo-form" height="290" width="100%" src={(typeof window !== 'undefined') ? `${window.location.origin}/${shopName}/klaviyo-form/${formId}` : `/${shopName}/klaviyo-form/${formId}`} />
                </div>
                )}
              </>
            </div>
            )}

          </section>
        </Col>
      </Row>
      <Row className={styles.groupshop_footer_f2_wrapper}>
        <hr />
        <div className={[styles.groupshop_footer_f2].join(' ')}>
          <p>Powered by</p>
          {/* <img src={isExpired ? footerLogoExpire.src : footerLogo1.src} alt="Logo" className=" mx-1" width={112} /> */}
          <img src={isDrops ? '/images/logo.svg' : `${process.env.IMAGE_PATH}/ms-logo1.png`} alt="Logo" className=" mx-1" width={112} />
        </div>
      </Row>
      <AlertComponent />
    </Container>

  );
};
Footer.defaultProps = {
  isDrops: false,
  formId: '',
  shopName: '',
  setLearnHowDrops: () => true,
  pending: true,
};

export default Footer;
