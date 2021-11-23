import * as React from 'react';
import {
  Form, Row, Col, ToggleButtonGroup, ToggleButton,
} from 'react-bootstrap';
import Button from 'components/Buttons/Button/Button';
import useQueryString from 'hooks/useQueryString';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { StoreContext } from 'store/store.context';
import { ICampaign } from 'types/store';
import ProductButton from 'components/Buttons/ProductButton';
import { useMutation } from '@apollo/client';
import { Check2Circle, InfoCircle, XCircle } from 'react-bootstrap-icons';
import { CREATE_CAMPAIGN } from 'store/store.graphql';

export default function OBCampaign() {
  const [, setParams] = useQueryString();
  const [
    addCampaign,
    // eslint-disable-next-line no-unused-vars
    { data, loading, error },
  ] = useMutation<ICampaign, ICampaign | null>(CREATE_CAMPAIGN);

  const { store, dispatch } = React.useContext(StoreContext);

  const [disableBtn, setdisableBtn] = React.useState(true);

  const campaignInitial = store?.newCampaign ?? {

    name: '',
    criteria: '',
    joinExisting: 1,
  };

  const validationSchema = yup.object({
    name: yup
      .string()
      .required('Campaign Name is required.')
      .min(5, 'Too Short please give least five characters')
      .max(20, 'Too Long !! only 20 characters allowed.'),
    criteria: yup
      .string()
      .required('Select product options'),
  });

  const {
    handleSubmit, values, handleChange, touched, errors,
  }: FormikProps<ICampaign> = useFormik<ICampaign>({
    initialValues: campaignInitial,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (valz, { validateForm }:FormikHelpers<ICampaign>) => {
      if (validateForm) validateForm(valz);
      const { name, criteria, joinExisting } = valz;

      await addCampaign({
        variables: {
          createCampaignInput: {
            storeId: store.id,
            name,
            criteria,
            // eslint-disable-next-line radix
            joinExisting: Boolean(parseInt(joinExisting ?? 1)),
            products: store?.newCampaign?.productsArray,
          },
        },
      });

      dispatch({ type: 'NEW_CAMPAIGN', payload: { newCampaign: valz } });
      setParams({ ins: 3 });
    },
  });

  const setValue = (field: string, value: string | number) => {
    dispatch({ type: 'NEW_CAMPAIGN', payload: { newCampaign: { [field]: value } } });
  };

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
                onBlur={(e) => setValue('name', e.target.value)}
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
              name="criteria"
              isInvalid={touched.criteria && !!errors.criteria}
              value="bestseller"
              onClick={() => setValue('criteria', 'bestseller')}
              checked={values.criteria === 'bestseller'}
            />
            <Form.Check
              inline
              onChange={handleChange}
              label="Newest products"
              type="radio"
              name="criteria"
              value="newest"
              isInvalid={touched.criteria && !!errors.criteria}
              onClick={() => setValue('criteria', 'newest')}
              checked={values.criteria === 'newest'}
            />
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <Form.Check
              inline
              label="Specific products/collections (up to 80 products)"
              onChange={handleChange}
              onClick={() => { setdisableBtn(false); setValue('criteria', 'custom'); }}
              type="radio"
              name="criteria"
              isInvalid={touched.criteria && !!errors.criteria}
              value="custom"
              checked={values.criteria === 'custom'}
            />

          </Col>
          <Form.Control.Feedback type="invalid">
            {errors.criteria}
          </Form.Control.Feedback>
        </Row>
        <ProductButton disableBtn={disableBtn} />
        <Row className="mt-3">
          <Col xs={12}>
            <h4>
              Allow customers to join existing Groupshop pages
              {' '}
              {' '}
              <InfoCircle />

            </h4>

          </Col>

        </Row>
        <Row className="text-muted"><h6>When enabled, customers can access discounts from existing Groupshop pages</h6></Row>
        <Row className="mt-2">
          {/* <Col xs={3} md={4}> </Col> */}
          <Col xs={12} md={6} className="text-right">
            <ToggleButtonGroup type="radio" name="joinExisting" value={values.joinExisting}>
              <ToggleButton variant="outline-primary" className="rounded-pill me-2" id="joinExisting-e" value={1} onChange={handleChange} onClick={() => setValue('joinExisting', 1)}>
                <Check2Circle className="fs-4" />
                {' '}
                Enabled
              </ToggleButton>
              <ToggleButton variant="outline-primary" className="rounded-pill" id="joinExisting-d" value={0} onChange={handleChange} onClick={() => setValue('joinExisting', 0)}>
                <XCircle className="fs-5" />
                {' '}
                Disabled
              </ToggleButton>

            </ToggleButtonGroup>
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

          </Col>

        </Row>

      </Form>
    </Col>
  );
}
