import * as React from 'react';
import {
  Form, Row, Col,
} from 'react-bootstrap';
import Button from 'components/Buttons/Button/Button';
import Exclaim from 'assets/images/exclaimation.svg';
import RBButton from 'components/Buttons/RoundedButton/RBButton';
import useQueryString from 'hooks/useQueryString';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { StoreContext } from 'store/store.context';
import { ICampaign } from 'types/store';
import ProductButton from 'components/Buttons/ProductButton';
import { useMutation } from '@apollo/client';
import { CREATE_CAMPAIGN } from 'store/store.graphql';

export default function OBCampaign() {
  const [, setParams] = useQueryString();
  const [
    addCampaign,
    // eslint-disable-next-line no-unused-vars
    { data, loading, error },
  ] = useMutation<ICampaign, ICampaign | null>(CREATE_CAMPAIGN);

  const { store, dispatch } = React.useContext(StoreContext);
  // eslint-disable-next-line no-unused-vars
  const [joinBtnVal, setjoinBtnVal] = React.useState(false);
  // eslint-disable-next-line no-unused-vars
  const [disableBtn, setdisableBtn] = React.useState(true);

  const validationSchema = yup.object({
    name: yup
      .string()
      .required('Campaign Name is required.')
      .min(5, 'Too Short please give least five characters')
      .max(20, 'Too Long !! only 20 characters allowed.'),
    productSelectionCriteria: yup
      .string()
      .required('Select product options'),
  });

  const {
    handleSubmit, values, handleChange, touched, errors,
  }: FormikProps<ICampaign> = useFormik<ICampaign>({
    initialValues: {
      name: '',
      productSelectionCriteria: '',
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (valz, { validateForm }:FormikHelpers<ICampaign>) => {
      console.log('....', valz);
      if (validateForm) validateForm(valz);
      const { name, productSelectionCriteria } = valz;

      await addCampaign({
        variables: {
          createCampaignInput: {
            storeId: store.id,
            name,
            productSelectionCriteria,
            joinExisting: joinBtnVal,
          },
        },
      });

      dispatch({ type: 'NEW_CAMPAIGN', payload: { newCampaign: valz } });
      setParams({ ins: 3 });
      // setTimeout(() => resetForm(), 5000);
    },
  });

  return (
    <Col className="text-sm-start" md={8}>

      <Form noValidate onSubmit={handleSubmit}>
        <Row className="mt-3"><h4>Name your Groupshop campaign</h4></Row>
        <Row>
          <Col xs={9}>
            <Form.Group className="mb-3" controlId="campainNameValidation">
              <Form.Control
                type="email"
                placeholder="My first campaign..."
                name="name"
                value={values.name}
                onChange={handleChange}
                isInvalid={touched.name && !!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={3}>
            <Form.Text className="text-muted">
              {values.name?.length}
              /20
            </Form.Text>
          </Col>
        </Row>
        <Row className="mt-3">
          <h4>
            Select
            {' '}
            &
            {' '}
            add products from your store
          </h4>
        </Row>
        <Row className="text-muted"><h6>Customers can get discounts on the products selected below</h6></Row>
        <Row className="mt-2">
          <Col>
            <Form.Check
              inline
              label="Best sellers"
              onChange={handleChange}
              type="radio"
              name="productSelectionCriteria"
              isInvalid={touched.productSelectionCriteria && !!errors.productSelectionCriteria}
              value="bestseller"
              onClick={() => setdisableBtn(false)}
            />
            <Form.Check
              inline
              onChange={handleChange}
              label="Newest products"
              type="radio"
              name="productSelectionCriteria"
              value="newproducts"
              isInvalid={touched.productSelectionCriteria && !!errors.productSelectionCriteria}
              onClick={() => setdisableBtn(false)}
            />
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <Form.Check
              inline
              label="Specific products/collections (up to 80 products)"
              onChange={handleChange}
              onClick={() => setdisableBtn(false)}
              type="radio"
              name="productSelectionCriteria"
              isInvalid={touched.productSelectionCriteria && !!errors.productSelectionCriteria}
              value=""
            />

          </Col>
          <Form.Control.Feedback type="invalid">
            {errors.productSelectionCriteria}
          </Form.Control.Feedback>
        </Row>
        <ProductButton disableBtn={disableBtn} />
        <Row className="mt-3">
          <Col xs={8}><h4>Allow customers to join existing Groupshop pages</h4></Col>
          <Col className="text-left"><Exclaim /></Col>
        </Row>
        <Row className="text-muted"><h6>When enabled, customers can access discounts from existing Groupshop pages</h6></Row>
        <Row className="mt-2">
          {/* <Col xs={3} md={4}> </Col> */}
          <Col xs={2} className="text-right">
            <RBButton
              onClick={() => setjoinBtnVal(true)}
              // onChange={handleChange}
            >
              Enable

            </RBButton>
          </Col>
          <Col xs={9} className="text-left">
            <RBButton onClick={() => setjoinBtnVal(false)}>Disable</RBButton>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col xs={4}>
            <Button onClick={() => setParams({ ins: 1 })}>Previous</Button>
          </Col>
          <Col xs={4} className="text-center">
            <span className="text-muted">2/4</span>
          </Col>
          <Col xs={4} className="d-flex justify-content-end">
            <Button type="submit"> Next </Button>
            {/* onClick={() => setParams({ ins: 3 })} */}
          </Col>
          {/* <Col xs={3} md={4}>&nbsp; </Col> */}
        </Row>

      </Form>
    </Col>
  );
}
