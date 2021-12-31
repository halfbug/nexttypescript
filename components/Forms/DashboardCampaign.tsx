/* eslint-disable max-len */
import * as React from 'react';
import {
  Form, Row, Col, ToggleButtonGroup, ToggleButton, Container, Button,
} from 'react-bootstrap';
import styles from 'styles/Campaign.module.scss';
import useQueryString from 'hooks/useQueryString';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { StoreContext } from 'store/store.context';
import { ICampaign } from 'types/store';
import ProductButton from 'components/Buttons/ProductButton';
import { useMutation } from '@apollo/client';
import { Check2Circle, InfoCircle, XCircle } from 'react-bootstrap-icons';
import { UPDATE_CAMPAIGN } from 'store/store.graphql';
import { useRouter } from 'next/router';
import Settings from './Settings';
import SocialMedia from './SocialMedia';

export default function DashboardCampaign() {
  const { query: { campaignid } } = useRouter();

  const [
    editCampaign,
    // eslint-disable-next-line no-unused-vars
    { data, loading, error },
  ] = useMutation<any, ICampaign | null>(UPDATE_CAMPAIGN);

  const { store, dispatch } = React.useContext(StoreContext);
  console.log('🚀 ~ file: DashboardCampaign.tsx ~ line 29 ~ DashboardCampaign ~ store', store);

  const [disableBtn, setdisableBtn] = React.useState(true);
  const [state, setstate] = React.useState({
    id: '',
    name: '',
    criteria: '',
    joinExisting: 1,
    rewards: '',
  });

  let campaignInitial: ICampaign = {
    id: '',
    name: '',
    criteria: '',
    joinExisting: 1,
    rewards: '',
  };

  React.useEffect(() => {
    if (store?.campaigns) {
      const arr:any = store.campaigns.filter((item:any) => item.id === campaignid);
      campaignInitial = { ...arr[0] };
      setstate({ ...arr[0] });
      console.log('🚀 ~ file: DashboardCampaign.tsx ~ line 48 ~ React.useEffect ~ campaignInitial', campaignInitial);
    }
  }, [store.campaigns]);

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
    initialValues: state,
    validationSchema,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (valz, { validateForm }:FormikHelpers<ICampaign>) => {
      if (validateForm) validateForm(valz);
      const {
        name, criteria, joinExisting, products,
      } = valz;

      const campObj:null | any = await editCampaign({
        variables: {
          updateCampaignInput: {
            id: store.id,
            name,
            criteria,
            // eslint-disable-next-line radix
            joinExisting: Boolean(parseInt(joinExisting ?? 1)),
            products: store?.newCampaign?.productsArray,
          },
        },
      });
      const { id } = campObj.data.updateCampaign;
      const newObj = { ...valz, id };
      dispatch({ type: 'UPDATE_CAMPAIGN', payload: { campaigns: newObj } });
    },
  });

  // const setValue = (field: string, value: string | number) => {
  //   dispatch({ type: 'UPDATE_CAMPAIGN', payload: { campaigns: { [field]: value } } });
  // };
  console.log({ store });
  console.log({ values });
  console.log('🚀 campaignInitial', campaignInitial);

  return (
    <Container>
      <Form noValidate>
        <Row className="mt-3">
          <Col md={7}>
            <h3>Groupshop Product</h3>
          </Col>
          <Col md={4}>
            <h3 className="text-center">Campigns Reward</h3>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={7} className={styles.box_1}>
            <Row className="mt-3"><h4>Name your Groupshop campaign</h4></Row>
            <Row>
              <Col xs={9}>
                <Form.Group className="mb-3" controlId="campainNameValidation">
                  <Form.Control
                    type="text"
                    placeholder="My first campaign..."
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    isInvalid={touched.name && !!errors.name}
                    onBlur={(e) => handleSubmit}
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
                  // onClick={() => setValue('criteria', 'bestseller')}
                  checked={values.criteria === 'bestseller'}
                  onBlur={(e) => handleSubmit}
                />
                <Form.Check
                  inline
                  onChange={handleChange}
                  label="Newest products"
                  type="radio"
                  name="criteria"
                  value="newest"
                  isInvalid={touched.criteria && !!errors.criteria}
                  // onClick={() => setValue('criteria', 'newest')}
                  checked={values.criteria === 'newest'}
                  onBlur={(e) => handleSubmit}
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <Form.Check
                  inline
                  label="Specific products/collections (up to 80 products)"
                  onChange={handleChange}
                  onClick={() => {
                    setdisableBtn(false);
                    // setValue('criteria', 'custom');
                  }}
                  type="radio"
                  name="criteria"
                  isInvalid={touched.criteria && !!errors.criteria}
                  value="custom"
                  checked={values.criteria === 'custom'}
                  onBlur={(e) => handleSubmit}
                />

              </Col>
              <Form.Control.Feedback type="invalid">
                {errors.criteria}
              </Form.Control.Feedback>
            </Row>
            <ProductButton disableBtn={disableBtn} />
          </Col>
          <Col md={3}>
            <div className={styles.box_2}>
              <h6 className={styles.select_Heading}>Set your rewards</h6>
              <p className={styles.silver}>Set the discount and chashback percentages your customers will earn on their order as they reach different milestones. </p>
              <h6 className={styles.select_Heading}>Select your desired sales volume:</h6>
              <p className={styles.silver}>We’ll set your reward tiers based on our recommendations. </p>
              <Button variant="light" className={styles.low_btn}>Low</Button>
              <Button variant="light" className={styles.Avg_btn}>Average</Button>
              <Button variant="light" className={styles.high_btn}>High</Button>
              <Button variant="light" className={styles.super_btn}>Supercharged</Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
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
                <ToggleButtonGroup
                  type="radio"
                  name="joinExisting"
                >
                  <ToggleButton
                    variant="outline-primary"
                    className="rounded-pill me-2"
                    id="joinExisting-e"
                    value={1}
                    onBlur={(e) => handleSubmit}
                  >
                    <Check2Circle className="fs-4" />
                    {' '}
                    Enabled
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-primary"
                    className="rounded-pill"
                    id="joinExisting-d"
                    value={0}
                    onBlur={(e) => handleSubmit}
                  >
                    <XCircle className="fs-5" />
                    {' '}
                    Disabled
                  </ToggleButton>

                </ToggleButtonGroup>
              </Col>
            </Row>
            {/* <Row>
              <Col><button type="submit">submit</button></Col>
            </Row> */}
          </Col>
        </Row>
      </Form>
      <Row className="mt-5">
        <h3>Groupshop Design</h3>
        <Col md={7} className={['p-2', '', 'box_3'].join(' ')}>
          <Row><Settings isDB /></Row>
        </Col>
        <Col md={3} className={styles.box_5}>
          <SocialMedia />
        </Col>
      </Row>
    </Container>
  );
}
