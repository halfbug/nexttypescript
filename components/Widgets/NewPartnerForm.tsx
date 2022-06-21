import React from 'react';
import {
  Col, Form, Row, ToggleButton, ToggleButtonGroup, Button,
} from 'react-bootstrap';
import styles from 'styles/Partner.module.scss';
import { Check2Circle, BoxArrowUp } from 'react-bootstrap-icons';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { StoreContext } from 'store/store.context';
import PartnerRewards from 'components/Widgets/PartnerRewards';
import { IPartnerTools } from 'types/store';
import { CREATE_PARTNER_DB, EXIT_PARTNER_GROUPSHOP } from 'store/store.graphql';
import UploadLogo from 'assets/images/upload.svg';
import useAlert from 'hooks/useAlert';

interface ActiveAffiliateProps {
  handleAfterSubmit: any;
}

export default function NewPartnerForm({ handleAfterSubmit } : ActiveAffiliateProps) {
  const [editMin, setEditMin] = React.useState(false);
  const [editMax, setEditMax] = React.useState(false);
  const [exitPartnerRecord, setExitPartnerRecord] = React.useState(false);
  const partnerGroupshopInitial = {
    email: '',
    minDiscount: 10,
    maxDiscount: 20,
    partnerCommission: 20,

  };
  const [editParCommison, setEditParCommison] = React.useState(false);
  const [
    createPartner,
    { loading, error },
  ] = useMutation<IPartnerTools>(CREATE_PARTNER_DB);
  const { store, dispatch } = React.useContext(StoreContext);
  const storeId = store.id;
  const handleForm = (field: string, value: string) => {
    setFieldValue(field, value);
  };

  const [exitPartner, { data }] = useLazyQuery(EXIT_PARTNER_GROUPSHOP, {
    onError() {
      setExitPartnerRecord(false);
      showError('Something went wrong!');
    },
    onCompleted() {
      setExitPartnerRecord(data.existPartnerGroupshop.isActive);
      if (data.existPartnerGroupshop.isActive === true) {
        setExitPartnerRecord(false);
        return false;
      }
      setExitPartnerRecord(true);
      return true;
    },

  });

  const duplicateEmailCheck = (values: string | undefined) => {
    exitPartner({ variables: { email: values, storeId } });
    if (exitPartnerRecord === true) {
      return true;
    }
    return false;
  };

  const validationSchema = yup.object({
    email: yup
      .string().email('Invalid email format')
      .test('Unique', 'Email need te be unique', (values) => duplicateEmailCheck(values))
      .required('Email Address is required.'),
    minDiscount: yup
      .number().typeError('you must specify a number')
      .min(5)
      .max(40)
      .required('Min Discount is required.'),
    maxDiscount: yup
      .number().typeError('you must specify a number')
      .min(15)
      .max(50)
      .required('Max Discount is required.'),
    partnerCommission: yup
      .number().typeError('you must specify a number')
      .min(5)
      .max(50)
      .required('partner Commisson is required.'),
  });

  const { AlertComponent, showError } = useAlert();

  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    resetForm,
    setFieldValue,
  }: FormikProps<IPartnerTools> = useFormik<IPartnerTools>({
    initialValues: partnerGroupshopInitial,
    validationSchema,
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (valz, { validateForm }: FormikHelpers<IPartnerTools>) => {
      if (validateForm) validateForm(valz);
      const {
        email, minDiscount, maxDiscount, partnerCommission,
      } = valz;
      if (exitPartnerRecord === true) {
        const minDiscountVal = `${minDiscount}%`;
        const maxDiscountVal = `${maxDiscount}%`;
        const newAverage = ((minDiscount! + maxDiscount!) / 2);
        const newAverageVal = `${newAverage}%`;
        const partnerCommissionVal = `${partnerCommission}%`;
        const partnerObj = await createPartner({
          variables: {
            createPartnersInput: {
              storeId: store.id,
              campaignId: (store?.campaigns && store?.campaigns?.length > 0)
                ? store?.campaigns[0]?.id : null,
              url: null,
              shortUrl: null,
              partnerCommission: partnerCommissionVal,
              isActive: true,
              discountCode: {
                title: null,
                percentage: null,
                priceRuleId: null,
              },
              partnerDetails: {
                fname: null,
                lname: null,
                email,
                shopifyCustomerId: null,
              },
              partnerRewards: {
                baseline: minDiscountVal,
                average: newAverageVal,
                maximum: maxDiscountVal,
              },
            },

          },

        });
        resetForm({});
        handleAfterSubmit();
        // console.log({ partnerObj });
      }
    },
  });
  return (
    <>
      <Form noValidate onSubmit={handleSubmit}>
        <Row>
          <Col xxl={8} xl={8} lg={8} md={8} xs={12}>
            <section className={styles.partner__box_1}>
              <h4 className="mt-0">
                Add New Partners
              </h4>
              <Row className={styles.partner__light_txt}>
                Add your influencer partners and we’ll auto-generate their Groupshop page.
                Learn more about the benefits of using Groupshop for your affiliate programs here.

              </Row>
              <Row className="mt-3 mb-4">
                <Col xl={7} lg={6} md={8}>
                  <Form.Group className="" controlId="PartnerFormvalidation">
                    <Form.Control
                      type="email"
                      name="email"
                      isInvalid={!!errors.email}
                      onChange={handleChange}
                      placeholder="Enter Email Address"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xl={5} lg={6} md={4}>
                  <Row>
                    <Col xl={5} lg={5} md={5}>
                      <Button
                        type="submit"
                        variant="outline-dark"
                        className={styles.partner__dark_btn}
                        value={1}
                      >
                        <Check2Circle className="fs-5" />
                        {' '}
                        Add Affiliate
                      </Button>
                    </Col>
                    <Col xl={7} lg={7} md={7}>
                      <Button
                        variant="outline-dark"
                        className={styles.partner__dark_btn}
                        value={0}
                      >
                        <BoxArrowUp className="fs-5" />
                        {' '}
                        Bulk Upload
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </section>
          </Col>
          <Col xxl={4} xl={4} lg={4} md={4} xs={12}>
            <PartnerRewards
              values={values}
              handleChange={handleChange}
              touched={touched}
              errors={errors}
              setFieldValue={setFieldValue}
              editMax={editMax}
              editMin={editMin}
              editParterCommission={editParCommison}
              setEditMax={setEditMax}
              setEditMin={setEditMin}
              setEditParterCommisson={setEditParCommison}
              handleForm={handleForm}
            />
          </Col>
        </Row>
      </Form>
      <AlertComponent />
    </>
  );
}
