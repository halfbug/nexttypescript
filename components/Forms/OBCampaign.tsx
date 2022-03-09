import * as React from 'react';
import {
  Form, Row, Col, ToggleButtonGroup, ToggleButton, Tooltip,
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
import { CREATE_CAMPAIGN, UPDATE_CAMPAIGN } from 'store/store.graphql';
import AddProductButton from 'components/Buttons/AddProductButton';
import styles from 'styles/Campaign.module.scss';
import ToolTip from 'components/Buttons/ToolTip/ToolTip';

export default function OBCampaign() {
  const [, setParams] = useQueryString();
  const [
    addCampaign,
    // eslint-disable-next-line no-unused-vars
    { data, loading, error },
  ] = useMutation<ICampaign, ICampaign | null>(CREATE_CAMPAIGN);
  const [editCampaign] = useMutation<any, ICampaign | null>(UPDATE_CAMPAIGN);

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
      console.log({ valz });

      const { name, criteria, joinExisting } = valz;
      let campObj:null | any;
      let newObj;

      if (store?.newCampaign?.id) {
        campObj = await editCampaign({
          variables: {
            updateCampaignInput: {
              storeId: store.id,
              id: store?.newCampaign.id,
              name,
              criteria,
              isActive: true,
              // eslint-disable-next-line radix
              joinExisting: Boolean(parseInt(joinExisting ?? 1)),
              products: store?.newCampaign?.productsArray,
              addableProducts: store?.newCampaign?.addableProductsArray,
            },
          },
        });
        newObj = { ...valz, id: store?.newCampaign.id };
      } else {
        campObj = await addCampaign({
          variables: {
            createCampaignInput: {
              storeId: store.id,
              name,
              criteria,
              isActive: true,
              // eslint-disable-next-line radix
              joinExisting: Boolean(parseInt(joinExisting ?? 1)),
              products: store?.newCampaign?.productsArray,
              addableProducts: store?.newCampaign?.addableProductsArray,
            },
          },
        });
        const { id } = campObj.data.createCampaign;
        newObj = { ...valz, id };
      }

      dispatch({ type: 'NEW_CAMPAIGN', payload: { newCampaign: newObj } });
      setParams({ ins: 3 });
    },
  });

  const setValue = (field: string, value: string | number) => {
    dispatch({ type: 'NEW_CAMPAIGN', payload: { newCampaign: { [field]: value } } });
  };
  const Bstyle = {
    width: '143px',
  };
  console.log({ store });

  return (

    <Form noValidate onSubmit={handleSubmit} className="mx-4">
      <Row className="mt-3"><h4>Name your Groupshop campaign</h4></Row>
      <Row>
        <Col lg={9} className="d-flex">
          <Form.Group className="mb-3 col-10" controlId="campainNameValidation">
            <Form.Control
              type="email"
              placeholder="My first campaign..."
              name="name"
              value={values.name}
              onChange={handleChange}
              isInvalid={touched.name && !!errors.name}
              onBlur={(e) => setValue('name', e.target.value)}
            />
            <Form.Control.Feedback type="invalid" className={styles.dbrewards_error}>
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Text className={['col-2 text-muted mt-2 mx-2', styles.dashboard_campaign_text_limit].join(' ')}>
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
      <Row className="text-muted"><p>Customers can get discounts on the products selected below by default.</p></Row>
      <Row className="mt-2">
        <Col>
          <Form.Check
            inline
            label="Best sellers"
            className={styles.dashboard_campaign_radio_label}
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
            className={styles.dashboard_campaign_radio_label}
            type="radio"
            name="criteria"
            value="newest"
            isInvalid={touched.criteria && !!errors.criteria}
            onClick={() => setValue('criteria', 'newest')}
            checked={values.criteria === 'newest'}
          />
        </Col>
      </Row>
      <Row className="mt-2 ">
        <Col>
          <Form.Check
            inline
            label="Specific products/collections (up to 80 products)"
            className={styles.dashboard_campaign_radio_label}
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
      {/* <p>25 product(s)/2 collection(s) selected</p> */}
      <Row className="mt-4">
        <Col lg={12} className="d-flex align-items-center">
          <h4 className="my-1">
            Allow customers to add products from your store
          </h4>
          <ToolTip
            className={['px-2 d-flex align-item-center', styles.dashboard_campaign__pop].join(' ')}
            icon={<InfoCircle size={13} />}
            popContent="You choose which products your customers will earn
                        cashback and discounts on. Use this feature to select which additional products
                        customers can add from your store to personalize their Groupshop."
          />

        </Col>
      </Row>
      <Row className="text-muted"><p>Select additional products that customers can add to personalize their Groupshop.</p></Row>
      <AddProductButton />
      <Row className="mt-5">
        <Col lg={4}>
          <Button style={Bstyle} onClick={() => setParams({ ins: 1 })}>Previous</Button>
        </Col>
        <Col lg={4} className="text-center d-flex align-items-center justify-content-center">
          <span className="text-muted">2/4</span>
        </Col>
        <Col lg={4} className="d-flex justify-content-end">
          <Button style={Bstyle} type="submit"> Next </Button>
        </Col>
      </Row>

    </Form>
  );
}
