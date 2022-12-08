import React from 'react';
import styles from 'styles/Modal.module.scss';
import { IStore, RootProps } from 'types/store';
import {
  Button,
  Col, Form, Modal, Row,
} from 'react-bootstrap';
import { CREATE_CHANNEL_GROUPSHOP } from 'store/store.graphql';
import useGtm from 'hooks/useGtm';
import { useMediaQuery } from 'react-responsive';
import useDeal from 'hooks/useDeal';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import * as yup from 'yup';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import { useMutation } from '@apollo/client';

interface GetRewardBoxProps extends RootProps {
  show: boolean;
  handleClose(e: any): any;
  store: IStore;
  Channel: any;
  setError1: any;
}

interface IConsumerForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const GetRewardBox = ({
  show = false, handleClose, store, Channel, setError1,
}: GetRewardBoxProps) => {
  const [consumerInitial, setconsumerInitial] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [
    createChannelGroupshop,
    { error },
  ] = useMutation(CREATE_CHANNEL_GROUPSHOP);

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = yup.object({
    firstName: yup
      .string()
      .required('First Name is required.')
      .min(3, 'Too Short please give least three characters')
      .max(20, 'Too Long !! only 20 characters allowed.'),
    lastName: yup
      .string()
      .required('Last Name is required.')
      .min(3, 'Too Short please give least three characters')
      .max(20, 'Too Long !! only 20 characters allowed.'),
    email: yup
      .string()
      .required('Email is required.')
      .email(),
    phoneNumber: yup
      .string().matches(phoneRegExp, 'Phone number is not valid'),
  });

  const closeModal = (e: any) => {
    // setotherProducts(undefined);
    // setSelected(undefined);
    handleClose(e);
  };
  const { googleEventCode } = useGtm();
  const isDesktop = useMediaQuery({
    query: '(min-width: 476px)',
  });

  const {
    isExpired,
  } = useDeal();

  const {
    handleSubmit, values, handleChange, touched, errors,
  }: FormikProps<IConsumerForm> = useFormik<IConsumerForm>({
    initialValues: consumerInitial,
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (valz, { validateForm }: FormikHelpers<IConsumerForm>) => {
      if (validateForm) validateForm(valz);
      const {
        firstName, lastName, email, phone,
      } = valz;

      // create gs and get code
      try {
        const gs = await createChannelGroupshop({
          variables: {
            createChannelGroupshopInput: {
              storeId: store.id,
              channelId: Channel.id,
              url: null,
              shortUrl: null,
              discountCode: {
                title: null,
                percentage: null,
                priceRuleId: null,
              },
              customerDetail: {
                firstName,
                lastName,
                email,
                phone,
              },
              members: [],
            },
          },
        });
        // if (error && error.message === 'Groupshop with this email already exist') {
        //   setError1('Groupshop with this email already exist');
        // }
        Router.push(`/${gs.data.createChannelGroupshop.url}`);
      } catch (e: any) {
        if (e.message) {
          setError1(e?.message ?? 'Something went wrong');
        } else {
          setError1('Something went wrong');
        }
      }
    },
  });

  return (
    <>
      <Modal
        show={show}
        onHide={closeModal}
        size="lg"
        centered
        dialogClassName={styles.getRewardBox_modal}
        contentClassName={styles.getRewardBox_modal__content}
      >
        <Modal.Header className={styles.getRewardBox_modal__closebtnlg}>
          {/* <Row onClick={handleClose}>
            <div><Cross /></div>
          </Row> */}
        </Modal.Header>
        <Modal.Header className={styles.getRewardBox_modal__closebtnsm}>
          {/* <Row onClick={handleClose}>
            <div><ArrowDown /></div>
          </Row> */}
        </Modal.Header>
        <Modal.Body className={styles.getRewardBox_modal__body}>
          <Row>
            <Col lg={12} className="px-0">
              <div className={styles.getRewardBox_modal__top}>
                <div className={styles.getRewardBox_modal__top__icon}>
                  {/* <LeEsableIcon /> */}
                  <Link
                    href={{
                      pathname: `https://${store.shop}`,
                    }}
                  >
                    <a target="_blank">
                      <img width="100" src={store.logoImage} alt="brand_logo" className="img-fluid" />
                    </a>
                  </Link>
                </div>
                <h2>
                  Get Access to
                  {' '}
                  {Channel.rewards.baseline}
                  {' '}
                  Off
                  <br />
                  + unlimited rewards
                </h2>
                <span>
                  Join
                  {' '}
                  {`${store.brandName}`}
                  ’s Groupshop rewards and get immediate access to
                  exclusive discounts and a personalized store with your favorite
                  products to share with friends!
                </span>
              </div>
            </Col>
          </Row>
          <Row className={styles.getRewardBox_modal__form}>
            <Col sm={6} md={6} lg={6}>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="input"
                placeholder="Enter First Name"
                name="firstName"
                value={values.firstName}
                onChange={(e) => handleChange(e)}
                isInvalid={touched.firstName && !!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="input"
                placeholder="Enter Last Name"
                name="lastName"
                value={values.lastName}
                onChange={(e) => handleChange(e)}
                isInvalid={touched.lastName && !!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Col>
            <Col lg={12}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email address"
                name="email"
                value={values.email}
                onChange={(e) => handleChange(e)}
                isInvalid={touched.email && !!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Col>
            <Col lg={12} className="pt-1">
              <Form.Label>Phone Number (Optional)</Form.Label>
              <Row>
                <Col md={12} lg={6}>
                  <Form.Control
                    type="input"
                    placeholder="+1  |"
                    name="phone"
                    value={values.phone}
                    onChange={(e) => handleChange(e)}
                    isInvalid={touched.phone && !!errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Col>
                <Col md={12} lg={6}>
                  <p className={styles.getRewardBox_modal__form__agree}>
                    By filling this box, you agree to receive recurring
                    personalized marketing text messages from
                    Groupshop and Jelcie at the cell number entered below.
                    Msg & data rates may apply.
                  </p>
                </Col>
              </Row>
            </Col>
            {/* <Col md={12} lg={6}>
              <span className={styles.getRewardBox_modal__form__agree}>
                By filling this box, you agree to receive recurring
                personalized marketing text messages from
                Groupshop and Jelcie at the cell number entered below.
                Msg & data rates may apply.
              </span>
            </Col> */}
          </Row>
          <Row className="justify-content-center">
            <Col lg={12}>
              <div className={styles.getRewardBox_modal__btnSection}>
                <Button variant="dark" onClick={() => handleSubmit()}>
                  Get Rewards
                </Button>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default GetRewardBox;
