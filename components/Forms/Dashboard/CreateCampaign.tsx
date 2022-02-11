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
import Router, { useRouter } from 'next/router';
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
  const shopName: string[] | undefined = store?.shop?.split('.', 1);

  const [disableBtn, setdisableBtn] = React.useState(true);

  const campaignInitial: ICampaignForm = {
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
    onSubmit: async (valz, { validateForm }: FormikHelpers<ICampaignForm>) => {
      if (validateForm) validateForm(valz);
      const {
        name, criteria, joinExisting, products, rewards, selectedTarget, isActive,
        brandColor, customColor, customBg, imageUrl, youtubeUrl, instagram, pinterest, tiktok, facebook, twitter,
      } = valz;
      console.log({ valz });
      let { media } = valz;
      if (customBg) media = "";

      // const socialLinks = {
      //   instagram, pinterest, tiktok, facebook, twitter,
      // };

      if (selectedTarget) {
        delete selectedTarget["__typename"];
        if (selectedTarget.rewards.length) {
          const newR = selectedTarget?.rewards.map((item: any) => {
            const { __typename, ...valWithoutTypename } = item;
            return valWithoutTypename;
          });
          selectedTarget.rewards = [...newR];
        }
      }

      const campObj: null | any = await addCampaign({
        variables: {
          createCampaignInput: {
            storeId: store.id,
            name,
            criteria,
            // eslint-disable-next-line radix
            joinExisting: Boolean(parseInt(joinExisting ?? 1)),
            isActive,
            products: store?.newCampaign?.productsArray,
            socialLinks: {
              facebook,
              instagram,
              tiktok,
              pinterest,
              twitter,
            },
            rewards,
            salesTarget: selectedTarget,
            settings: {
              brandColor,
              customColor,
              customBg,
              imageUrl,
              youtubeUrl,
              media,
            },

          },
        },
      });
      const newObj = campObj.data.createCampaign;
      dispatch({ type: 'NEW_CAMPAIGN', payload: { newCampaign: newObj } });
      const updatedCampaigns = store?.campaigns?.map((item:any) => {
        if (item.id === newObj.id) {
          return newObj;
        }
        return item;
      });
      console.log("🚀 ~ file: CreateCampaign.tsx ~ line 123 ~ onSubmit: ~ newObj", newObj);
      console.log('🚀 ~ store', store);
      Router.push(`/${shopName}/campaign`);
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

  const handleCustomBg = (field: string, value: string) => {
    // empty other bg and keep only one
    if (field === 'customBg') {
      setFieldValue('imageUrl', '');
      setFieldValue('youtubeUrl', '');
      setFieldValue('customColor', '');
    } else {
      setFieldValue('customColor', '');
      setFieldValue('customBg', '');
    }
    // if ((field !== 'imageUrl' && field !== 'media' && field !== 'youtubeUrl')) {
    // }
    setFieldValue(field, value);
    // handleSubmit();
  };
  const handleForm = (field: string, value: string) => {
    setFieldValue(field, value);
  };

  return (
    <Container className={styles.dashboard_campaign}>
      <Screen1 show={ins === '2a'} />
      <Form noValidate onSubmit={handleSubmit}>

        <Row>
          <Col lg={7} className="mt-4">
            <Row>
              <Col>
                <h3>Setup</h3>
              </Col>
            </Row>
            <section className={styles.dashboard_campaign__box_1}>
              <Row><h4>Name your Groupshop campaign</h4></Row>
              <Row className="text-muted"><h6>You won’t be able to change this later. This name isn’t used on anything your customers will see.</h6></Row>
              <Row className='mt-2'>
                <Col lg={9}>
                  <Form.Group className="mb-2" controlId="campainNameValidation">
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
                <Col lg={3}>
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
          <Col lg={7}>
            <Row>
              <Col>
                <h3>Groupshop Product</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <section className={styles.dashboard_campaign__box_1}>
                  <Row>
                    <h4>
                      Select
                      {' '}
                      &
                      {' '}
                      add products to Groupshop
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
                  <Row>
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
                          variant="outline-success"
                          className=""
                          id="joinExisting-e"
                          value={1}
                          checked={values.joinExisting === true}
                          onChange={(e) => handleChange(e)}
                        >
                          <Check2Circle className="fs-4" />
                          {' '}
                          Enabled
                        </ToggleButton>

                        <ToggleButton
                          variant="outline-primary"
                          className=""
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
          <Col lg={5}>
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
        <Row>
          <Col><h3>Groupshop Design</h3></Col>
        </Row>
        <Row>
          <Col lg={7}>
            <section className={[styles.dashboard_campaign__box_3, '', ''].join(' ')}>
              <DBSettings
                values={values}
                handleChange={handleChange}
                touched={touched}
                errors={errors}
                setFieldValue={setFieldValue}
                handleCustomBg={handleCustomBg}
                isEdit={false}
                handleForm={handleForm}
              />
            </section>
          </Col>
          <Col lg={5}>
            <section className={styles.dashboard_campaign__box_5}>
              <CampaignSocialMedia
                handleChange={handleChange}
                setFieldValue={setFieldValue}
                values={values}
              />
            </section>
          </Col>
        </Row>
        <Row>
          <Col lg={7} className={[styles.dashboard_campaign__lightBg].join(' ')}>
            <h4>Save Campaign</h4>
            <p className={styles.dashboard_campaign__light_text}>Save & activate this Groupshop campaign, or just save and come back to it later.</p>
            <WhiteButton
              type="submit"
              onClick={(e) => {
                setFieldValue('isActive', true);
                // handleSubmit();
              }}
            >
              Save and activate
            </WhiteButton>
            {' '}
            {' '}
            <WhiteButton
              type="submit"
              onClick={(e) => {
                setFieldValue('isActive', false);
                // handleSubmit();
              }}
            >
              Save for later
            </WhiteButton>
          </Col>
        </Row>

      </Form>
    </Container>
  );
}
