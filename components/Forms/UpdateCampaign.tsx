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

import WhiteButton from 'components/Buttons/WhiteButton/WhiteButton';
import Screen1 from 'components/Onboarding/Step2a/Screen1';
import Settings from './Settings';
import SocialMedia from './SocialMedia';
import UpdateRewards from './UpdateRewards';

export default function UpdateCampaign() {
  const { query: { campaignid, ins } } = useRouter();
  const [, setParams] = useQueryString();

  const [
    editCampaign,
    // eslint-disable-next-line no-unused-vars
    { data, loading, error },
  ] = useMutation<any, ICampaign | null>(UPDATE_CAMPAIGN);

  const { store, dispatch } = React.useContext(StoreContext);

  const [disableBtn, setdisableBtn] = React.useState(true);
  const [state, setstate] = React.useState({
    id: '',
    criteria: '',
    joinExisting: 1,
    rewards: '',
  });

  let campaignInitial: ICampaign = {
    id: '',
    criteria: '',
    joinExisting: 1,
    rewards: '',
  };

  React.useEffect(() => {
    if (store?.campaigns) {
      const arr:any = store.campaigns.filter((item:any) => item.id === campaignid);
      campaignInitial = { ...arr[0] };
      setstate({ ...arr[0] });
    }
  }, [store.campaigns]);

  const validationSchema = yup.object({
    criteria: yup
      .string()
      .required('Select product options'),
  });

  const {
    handleSubmit, values, handleChange, touched, errors, setFieldValue,
  }: FormikProps<ICampaign> = useFormik<ICampaign>({
    initialValues: state,
    validationSchema,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (valz, { validateForm }:FormikHelpers<ICampaign>) => {
      if (validateForm) validateForm(valz);
      const {
        criteria, joinExisting, products,
      } = valz;
      console.log({ valz });

      const campObj:null | any = await editCampaign({
        variables: {
          updateCampaignInput: {
            storeId: store.id,
            id: campaignid,
            criteria,
            // eslint-disable-next-line radix
            joinExisting: Boolean(parseInt(joinExisting ?? 1)),
            products: criteria === 'custom' ? store?.newCampaign?.productsArray : [],
          },
        },
      });
      const updatedCampaigns = store?.campaigns?.map((item:any) => {
        if (item.id === campObj.id) {
          return campObj;
        }
        return item;
      });
      dispatch({ type: 'UPDATE_CAMPAIGN', payload: { campaigns: updatedCampaigns } });
      console.log('🚀 ~ file: UpdateCampaign.tsx ~ line 32 ~ UpdateCampaign ~ store', store);
    },
  });

  React.useEffect(() => {
    if (ins === '2') {
      setFieldValue('products', store?.newCampaign?.productsArray);
      setTimeout(handleSubmit, 2000);
      setParams({ ins: undefined });
    }
  }, [ins]);

  console.log({ store });
  console.log({ values });
  console.log('🚀 campaignInitial', campaignInitial);

  return (
    <Container className={styles.dashboard_campaign}>
      <Screen1 show={ins === '2a'} />
      <Row>
        <Col xs={6} className="mt-4">
          <Row>
            <Col>
              <h3>Groupshop Product</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form noValidate onSubmit={handleSubmit}>
                <section className={styles.dashboard_campaign__box_1}>
                  <Row className="mt-1">
                    <h4>
                      Select and add products to Groupshop
                    </h4>
                  </Row>
                  <Row className="text-muted"><h6>Customers can get discounts on the products selected below</h6></Row>
                  <Row className="mt-2">
                    <Col>
                      <Form.Check
                        inline
                        label="Best sellers"
                        onChange={(e) => {
                          handleChange(e);
                          handleSubmit();
                        }}
                        type="radio"
                        name="criteria"
                        isInvalid={touched.criteria && !!errors.criteria}
                        value="bestseller"
                  // onClick={() => setValue('criteria', 'bestseller')}
                        checked={values.criteria === 'bestseller'}
                        // onBlur={(e) => handleSubmit}
                      />
                      <Form.Check
                        inline
                        onChange={(e) => {
                          handleChange(e);
                          handleSubmit();
                        }}
                        label="Newest products"
                        type="radio"
                        name="criteria"
                        value="newest"
                        isInvalid={touched.criteria && !!errors.criteria}
                  // onClick={() => setValue('criteria', 'newest')}
                        checked={values.criteria === 'newest'}
                        // onBlur={(e) => handleSubmit}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col>
                      <Form.Check
                        inline
                        label="Specific products/collections (up to 80 products)"
                        onChange={(e) => {
                          handleChange(e);
                          handleSubmit();
                        }}
                        onClick={() => {
                          setdisableBtn(false);
                          // setValue('criteria', 'custom');
                        }}
                        type="radio"
                        name="criteria"
                        isInvalid={touched.criteria && !!errors.criteria}
                        value="custom"
                        checked={values.criteria === 'custom'}
                        // onBlur={(e) => handleSubmit}
                      />
                      {/* {values.criteria === 'bestseller' ? setdisableBtn(false) : setdisableBtn(true)} */}
                    </Col>
                    <Form.Control.Feedback type="invalid">
                      {errors.criteria}
                    </Form.Control.Feedback>
                  </Row>
                  <ProductButton disableBtn={disableBtn} totalProducts={(values.products?.length) ? values.products?.length : 0} />
                  <Row className="mt-4">
                    <Col>
                      <h4>
                        Allow customers to add products from your store
                        {' '}
                        {' '}
                        <InfoCircle />
                      </h4>
                    </Col>
                  </Row>
                  <Row className="text-muted"><h6>Select the products that customers can add to personalize their Groupshop</h6></Row>
                  <Row className="text-start"><Col><WhiteButton>Add products</WhiteButton></Col></Row>
                </section>

                <section className={styles.dashboard_campaign__box_2}>
                  <Row className="mt-4">
                    <Col>
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
                          checked={values.joinExisting}
                          onChange={(e) => {
                            handleChange(e);
                            handleSubmit();
                          }}
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
                          checked={values.joinExisting === false}
                          onChange={(e) => {
                            handleChange(e);
                            handleSubmit();
                          }}
                        >
                          <XCircle className="fs-5" />
                          {' '}
                          Disabled
                        </ToggleButton>

                      </ToggleButtonGroup>
                    </Col>
                  </Row>
                </section>

              </Form>

            </Col>
          </Row>

        </Col>
        <Col xs={6} className="mt-4">
          <Row>
            <Col>
              <h3>Campaign Rewards</h3>
            </Col>
          </Row>

          <UpdateRewards />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col><h2>Groupshop Design</h2></Col>
      </Row>

      <Row className="mt-2">
        <Col>
          <section className={[styles.dashboard_campaign__box_3, '', ''].join(' ')}>
            <Settings isDB />
          </section>

        </Col>
        <Col>
          <Row />
          <section className={styles.dashboard_campaign__box_5}>
            <SocialMedia />
          </section>
        </Col>
      </Row>
    </Container>
  );
}
