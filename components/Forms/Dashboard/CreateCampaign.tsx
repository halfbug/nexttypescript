/* eslint-disable no-param-reassign */
/* eslint-disable dot-notation */
/* eslint-disable quotes */
/* eslint-disable jsx-quotes */
/* eslint-disable max-len */
import * as React from 'react';
import {
  Form, Row, Col, ToggleButtonGroup, ToggleButton, Container, Button,
} from 'react-bootstrap';
import styles from 'styles/Campaign.module.scss';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { StoreContext } from 'store/store.context';
import { ICampaign, ICampaignForm } from 'types/store';
import ProductButton from 'components/Buttons/ProductButton';
import { useMutation } from '@apollo/client';
import { Check2Circle, InfoCircle, XCircle } from 'react-bootstrap-icons';
import { CREATE_CAMPAIGN_DB } from 'store/store.graphql';

import WhiteButton from 'components/Buttons/WhiteButton/WhiteButton';
import Screen1 from 'components/Onboarding/Step2a/Screen1';
import { useRouter } from 'next/router';
import useQueryString from 'hooks/useQueryString';
import DBRewards from './DBRewards';
import DBSettings from './DBSettings';
import CampaignSocialMedia from './CampaignSocialMedia';

export default function CreateCampaign() {
  const { query: { ins } } = useRouter();
  const [, setParams] = useQueryString();
  const [
    addCampaign,
    // eslint-disable-next-line no-unused-vars
    { data, loading, error },
  ] = useMutation<any, ICampaign | null>(CREATE_CAMPAIGN_DB);

  const { store, dispatch } = React.useContext(StoreContext);

  const [disableBtn, setdisableBtn] = React.useState(true);

  const campaignInitial:ICampaignForm = {
    id: '',
    name: '',
    criteria: '',
    joinExisting: 1,
    rewards: '',
    brandColor: '#3C3C3C',
    customColor: '#FFF199',
    customBg: '',
    imageUrl: '',
    youtubeUrl: '',
    media: 'image',
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
    brandColor: yup
      .string()
      .required('Brand Color is required.'),
    rewards: yup
      .string()
      .required('required.'),
  });

  const {
    handleSubmit, values, handleChange, touched, errors, setFieldValue,
  }: FormikProps<ICampaignForm> = useFormik<ICampaignForm>({
    initialValues: campaignInitial,
    validationSchema,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (valz, { validateForm }:FormikHelpers<ICampaignForm>) => {
      if (validateForm) validateForm(valz);
      const {
        name, criteria, joinExisting, products, rewards, selectedTarget,
        brandColor, customColor, customBg, imageUrl, youtubeUrl, instagram, pinterest, tiktok, facebook, twitter,
      } = valz;
      console.log({ valz });

      const socialLinks = {
        instagram, pinterest, tiktok, facebook, twitter,
      };

      if (selectedTarget) {
        selectedTarget?.rewards.map((item:any) => (delete item["__typename"]));
        delete selectedTarget["__typename"];
      }

      const campObj:null | any = await addCampaign({
        variables: {
          createCampaignInput: {
            storeId: store.id,
            name,
            criteria,
            // eslint-disable-next-line radix
            joinExisting: Boolean(parseInt(joinExisting ?? 1)),
            products: store?.newCampaign?.productsArray,
            socialLinks,
            rewards,
            salesTarget: selectedTarget,
            settings: {
              brandColor,
              customColor,
              customBg,
              imageUrl,
              youtubeUrl,
            },

          },
        },
      });
      const newObj = campObj.data.createCampaign;
      console.log("🚀 ~ file: CreateCampaign.tsx ~ line 123 ~ onSubmit: ~ newObj", newObj);
      dispatch({ type: 'NEW_CAMPAIGN', payload: { newCampaign: newObj } });
      // dispatch({ type: 'UPDATE_CAMPAIGN', payload: { campaigns: [...newObj] } });
      console.log('🚀 ~ store', store);
    },
  });

  React.useEffect(() => {
    if (ins === '2') {
      setFieldValue('products', store?.newCampaign?.productsArray);
      // setTimeout(handleSubmit, 2000);
      setParams({ ins: undefined });
    }
  }, [ins]);

  console.log({ store });
  console.log({ values });

  return (
    <Container className="dashboard_campaign">
      <Screen1 show={ins === '2a'} />
      <Form noValidate onSubmit={handleSubmit}>
        <Row className="mt-4">
          <Col>
            <Row>
              <Col>
                <h3>Setup</h3>
              </Col>
            </Row>
            <section className={styles.dashboard_campaign__box_1}>
              <Row><h4>Name your Groupshop campaign</h4></Row>
              <Row>
                <Col xs={9}>
                  <Form.Group className="mb-3" controlId="campainNameValidation">
                    <Form.Control
                      type="text"
                      placeholder="My first campaign..."
                      name="name"
                      value={values.name}
                      onChange={(e) => handleChange(e)}
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
            </section>

          </Col>
        </Row>
        <Row>
          <Col xs={6} className="mt-4">
            <Row>
              <Col>
                <h3>Groupshop Product</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <section className={styles.dashboard_campaign__box_1}>
                  <Row className="mt-4">
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
                        onChange={(e) => handleChange(e)}
                        type="radio"
                        name="criteria"
                        isInvalid={touched.criteria && !!errors.criteria}
                        value="bestseller"
                  // onClick={() => setValue('criteria', 'bestseller')}
                        checked={values.criteria === 'bestseller'}
                      />
                      <Form.Check
                        inline
                        onChange={(e) => handleChange(e)}
                        label="Newest products"
                        type="radio"
                        name="criteria"
                        value="newest"
                        isInvalid={touched.criteria && !!errors.criteria}
                  // onClick={() => setValue('criteria', 'newest')}
                        checked={values.criteria === 'newest'}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col>
                      <Form.Check
                        inline
                        label="Specific products/collections (up to 80 products)"
                        onChange={(e) => handleChange(e)}
                        onClick={() => {
                          setdisableBtn(false);
                          // setValue('criteria', 'custom');
                        }}
                        type="radio"
                        name="criteria"
                        isInvalid={touched.criteria && !!errors.criteria}
                        value="custom"
                        checked={values.criteria === 'custom'}
                      />
                      {/* {values.criteria === 'bestseller' ? setdisableBtn(false) : setdisableBtn(true)} */}
                    </Col>
                    <Form.Control.Feedback type="invalid">
                      {errors.criteria}
                    </Form.Control.Feedback>
                  </Row>
                  <ProductButton
                    disableBtn={disableBtn}
                    // totalProducts={(values.products?.length) ? values.products?.length : 0}
                  />
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
                          onChange={(e) => handleChange(e)}
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
                          onChange={(e) => handleChange(e)}
                        >
                          <XCircle className="fs-5" />
                          {' '}
                          Disabled
                        </ToggleButton>

                      </ToggleButtonGroup>
                    </Col>
                  </Row>
                </section>

              </Col>
            </Row>

          </Col>
          <Col xs={6} className="mt-4">
            <Row>
              <Col>
                <h3>Campaign Rewards</h3>
              </Col>
            </Row>

            <DBRewards
              values={values}
              handleChange={handleChange}
              touched={touched}
              errors={errors}
              setFieldValue={setFieldValue}
              initvalz={campaignInitial}
            />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col><h2>Groupshop Design</h2></Col>
        </Row>

        <Row className="mt-2">
          <Col>
            <section className={[styles.dashboard_campaign__box_3, '', ''].join(' ')}>
              <DBSettings
                values={values}
                handleChange={handleChange}
                touched={touched}
                errors={errors}
                setFieldValue={setFieldValue}
              />
            </section>

          </Col>
          <Col>
            <Row />
            <section className={styles.dashboard_campaign__box_5}>
              <CampaignSocialMedia
                handleChange={handleChange}
                setFieldValue={setFieldValue}
              />
            </section>
          </Col>
        </Row>
        <Row className={['mt-2', styles.dashboard_campaign__lightBg].join(' ')}>
          <Col>
            <Row>
              <Col><h4>Save Campaign</h4></Col>
            </Row>
            <Row>
              <Col><p className={styles.dashboard_campaign__light_text}>Save and activate this Groupshop campaign, or just save and come back to it later.</p></Col>
            </Row>
            <Row>
              <Col xs={2} className='text-end'><WhiteButton type="submit">Save and activate</WhiteButton></Col>
              <Col xs={10} className='text-start'><WhiteButton type="submit">Save for later</WhiteButton></Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
