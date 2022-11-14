import React, { useEffect } from 'react';
import {
  Form, Button,
} from 'react-bootstrap';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import styles from 'styles/QrStoreDetails.module.scss';
import * as yup from 'yup';
import useAlert from 'hooks/useAlert';
import { useLazyQuery } from '@apollo/client';
import { GET_ACTIVE_GROUPSHOPS_BY_EMAIL } from 'store/store.graphql';
import useAppContext from 'hooks/useAppContext';
import { useRouter } from 'next/router';

export interface IQRCode {
  email: string;
}

interface IWelcomeProps {
  setShowWelcome: any;
  setShowAuth: any;
  setShowError: any;
  setactiveGroupshops: any;
  setEmail: any;
  brandName: string;
}

export default function QrWelcomeScreen({
  // brandLogo,
  setShowWelcome,
  setShowAuth,
  setShowError,
  setactiveGroupshops,
  setEmail,
  brandName,
}: IWelcomeProps) {
  const validationSchema = yup.object({
    email: yup.string()
      .email('Invalid email format')
      .required('Required'),
  });
  const { AlertComponent } = useAlert();
  const Router = useRouter();

  const [getDealLink, { data }] = useLazyQuery(GET_ACTIVE_GROUPSHOPS_BY_EMAIL, { fetchPolicy: 'network-only' });

  useEffect(() => {
    async function gets3logo() {
      if (data) {
        if (data?.getActiveGroupshops.length) {
          const arr = data?.getActiveGroupshops
            .filter((gs: any) => gs?.shop?.brandName === brandName);
          if (arr.length) {
            if (arr[0].isExpired) {
              Router.push(`${arr[0]?.groupshop?.url}/status&activated`);
            } else {
              Router.push(`${arr[0]?.groupshop?.url}`);
            }
          } else {
            setShowWelcome(false);
            setShowAuth(true);
            setactiveGroupshops(data?.getActiveGroupshops || []);
          }
        } else {
          setShowWelcome(false);
          setShowError(true);
        }
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
      setEmail(email);
      getDealLink({ variables: { email } });
    },
  });
  const { gsctx, dispatch } = useAppContext();

  return (
    <>
      {/* <div className={styles.QRContainer_Brandlogo}><Brandlogo /></div> */}
      <div className={styles.QRContainer__content__container}>
        {/* {gsctx?.store?.logoImage} */}
        <div className={[styles.QRContainer__content__congratswrapper, styles.QRContainer__content__container__congratsmain, ''].join(' ')}>
          {/* {brandLogo} */}
          <div className={styles.QRContainer__content__heading}>
            <h2>
              Access your personalized store with
              <strong> exclusive discounts</strong>
              {' '}
              and
              {' '}
              <strong>cashback </strong>
              for you and your friends.
            </h2>
            {/* <GroupshopRoundLogo className="img-fluid" /> */}
          </div>
          <div className={styles.QRContainer__content__container__congratsmain__simply}>
            <p className="mt-3">
              It’s called a Groupshop! Simply enter the email you used to shop with
              {' '}
              {brandName}
              {' '}
              to get started.
            </p>
          </div>
          <div className={styles.QRContainer__form__container}>
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  isInvalid={!!errors.email}
                  onChange={(e) => handleChange(e)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <div>
                <Button className={styles.QRContainer__btnGroupShop} type="submit">Find my Groupshop</Button>
              </div>
            </Form>
          </div>
        </div>
        <AlertComponent />
      </div>
    </>
  );
}
