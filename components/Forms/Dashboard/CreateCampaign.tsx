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
import useCampaign from 'hooks/useCampaign';
import useUtilityFunction from 'hooks/useUtilityFunction';
import * as constant from 'configs/constant';
import AddProductButton from 'components/Buttons/AddProductButton';
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
  const [editMin, setEditMin] = React.useState(false);
  const [editMax, setEditMax] = React.useState(false);

  const { store, dispatch } = React.useContext(StoreContext);
  const shopName: string[] | undefined = store?.shop?.split('.', 1);

  const [disableBtn, setdisableBtn] = React.useState(true);

  const [campaignInitial, setcampaignInitial] = React.useState({
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
    maxDiscountVal: '',
    minDiscountVal: '',
    minDiscount: 0,
    maxDiscount: 0,
    isRewardEdit: false,

  });
  const { clearNewCampaign } = useCampaign();
  React.useEffect(() => {
    // console.log('IM IN CREATE HOOK');

    clearNewCampaign();
    dispatch({ type: 'SINGLE_CAMPAIGN', payload: { singleEditCampaignId: '' } });
  }, []);
  const { multiple5, isMultiple5 } = useUtilityFunction();

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
    minDiscount: yup
      .number()
      .lessThan(yup.ref('maxDiscount'), constant.EDIT_REWARDS_MSG2) // .test("diff", "diff",
      .test('diff', constant.EDIT_REWARDS_MSG1,
        (val: number | undefined, context) => {
          if (val && (context.parent.maxDiscount - val) < 10) {
            // console.log(context);
            return false;
          }
          return true;
        })
      .test('multiple', constant.EDIT_REWARDS_MSG3,
        (val: number | undefined) => {
          if (val && isMultiple5(val)) {
            return true;
          }
          return false;
        }),
    maxDiscount: yup
      .number()
      .moreThan(yup.ref('minDiscount'), constant.EDIT_REWARDS_MSG4)
      .test('diff', constant.EDIT_REWARDS_MSG1,
        (val: number | undefined, context) => {
          if (val && (val - context.parent.minDiscount) < 10) {
            // console.log(context);
            return false;
          }
          return true;
        })
      .test('multiple', constant.EDIT_REWARDS_MSG3,
        (val: number | undefined) => {
          if (val && isMultiple5(val)) {
            return true;
          }
          return false;
        }),

  });

  const {
    handleSubmit, values, handleChange, touched, errors, setFieldValue,
  }: FormikProps<ICampaignForm> = useFormik<ICampaignForm>({
    initialValues: campaignInitial,
    validationSchema,
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (valz, { validateForm }: FormikHelpers<ICampaignForm>) => {
      // console.log({ validateForm });

      if (validateForm) validateForm(valz);
      const {
        name, criteria, joinExisting, products, rewards, selectedTarget, isActive,
        brandColor, customColor, customBg, imageUrl, youtubeUrl, instagram, pinterest,
        tiktok, facebook, twitter, addableProducts, maxDiscountVal, minDiscountVal,
        minDiscount, maxDiscount, isRewardEdit,
      } = valz;
      // console.log({ valz });
      let { media } = valz;
      if (customBg) media = '';
      const newSelectedTarget = { ...selectedTarget };

      if (isRewardEdit) {
        const baseline = minDiscount;
        const maximum = maxDiscount;
        const lowBaseline = 10;
        const avgBaseline = 15;
        const highBaseline = 20;
        const superBaseline = 25;

        if (baseline! <= lowBaseline) {
          newSelectedTarget.name = 'Low';
        } else if (baseline! > lowBaseline && baseline! <= avgBaseline) {
          newSelectedTarget.name = 'Average';
        } else if (baseline! >= highBaseline && baseline! < superBaseline) {
          newSelectedTarget.name = 'High';
        } else if (baseline! >= superBaseline) {
          newSelectedTarget.name = 'Super-charged';
        }
        const newAverage = multiple5((minDiscount! + maxDiscount!) / 2);
        newSelectedTarget.rewards = [{ ...newSelectedTarget.rewards[0], discount: minDiscountVal },
          { ...newSelectedTarget.rewards[1], discount: `${newAverage}%` },
          { ...newSelectedTarget.rewards[2], discount: maxDiscountVal }];

        // console.log({ valz });
      }

      const campObj: null | any = await addCampaign({
        variables: {
          createCampaignInput: {
            storeId: store.id,
            name,
            criteria,
            rewards,
            // eslint-disable-next-line radix
            joinExisting: Boolean(parseInt(joinExisting ?? 1)),
            isActive,
            products: store?.newCampaign?.productsArray,
            addableProducts,
            socialLinks: {
              facebook,
              instagram,
              tiktok,
              pinterest,
              twitter,
            },
            salesTarget: newSelectedTarget,
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
      const updatedCampaigns = store?.campaigns?.map((item: any) => {
        if (item.id === newObj.id) {
          return newObj;
        }
        return item;
      });
      // console.log("🚀 ~ file: CreateCampaign.tsx ~ line 123 ~ onSubmit: ~ newObj", newObj);
      // console.log('🚀 ~ store', store);
      Router.push(`/${shopName}/campaign`);
    },
  });

  React.useEffect(() => {
    if (ins === '2') {
      if (store?.newCampaign?.productsArray?.length) {
        setFieldValue('products', store?.newCampaign?.productsArray);
      }
      if (store?.newCampaign?.addableProductsArray?.length) {
        setFieldValue('addableProducts', store?.newCampaign?.addableProductsArray);
      }
      // setTimeout(handleSubmit, 2000);
      setParams({ ins: undefined });
    }
  }, [ins]);

  // console.log({ store });

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
  const handleAddProduct = () => {
    setParams({ ins: 'addproduct' });
  };
  const { setValue } = useUtilityFunction();
  // console.log({ store });
  // console.log("//////////////////");

  return (
    <Container className={styles.dashboard_campaign}>
      <Screen1 show={ins === '2a' || ins === 'addproduct'} />
      <Form noValidate onSubmit={handleSubmit}>

        <Row>
          <Col lg={7} className="mt-4">
            <Row>
              <Col>
                <h3>Set-Up</h3>
              </Col>
            </Row>
            <section className={['mt-2', styles.dashboard_campaign__box_1].join(' ')}>
              <Row><h4>Name your Groupshop campaign</h4></Row>
              <Row className="text-muted"><p>You won’t be able to change this later. This name isn’t used on anything your customers will see.</p></Row>
              <Row>
                <Col lg={10} className="d-flex ">
                  <Form.Group className="col-9 mb-2 " controlId="campainNameValidation">
                    <Form.Control
                      type="text"
                      placeholder="My first campaign..."
                      name="name"
                      value={values.name}
                      onChange={(e) => handleChange(e)}
                      onClick={(e) => setValue('name', e.currentTarget.value)}
                      isInvalid={touched.name && !!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Text className={['col-3 mt-2 mx-2', styles.dashboard_campaign_text_limit].join(' ')}>
                    {values.name?.length}
                    /20
                  </Form.Text>
                  {/* <Col lg={3} className="mx-0 mt-1 text-start">
                  <Form.Text className={styles.dashboard_campaign_text_limit}>
                    {values.name?.length}
                    /20
                  </Form.Text>
                </Col> */}
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
            <Row className="mt-2">
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
                  <Row className="text-muted">
                    <p>
                      Customers can get discounts on the products selected below
                    </p>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Check
                        inline
                        label="Best sellers"
                        onChange={(e) => handleChange(e)}
                        type="radio"
                        name="criteria"
                        isInvalid={touched.criteria && !!errors.criteria}
                        value="bestseller"
                        onClick={() => setValue('criteria', 'bestseller')}
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
                        onChange={(e) => handleChange(e)}
                        onClick={() => {
                          setdisableBtn(false);
                          setValue('criteria', 'custom');
                        }}
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
                  <ProductButton
                    disableBtn={disableBtn}
                  // totalProducts={(values.products?.length) ? values.products?.length : 0}
                  />
                  <Row className="mt-4 border-top">
                    <Col>
                      <h4 className="mt-3">
                        Allow customers to add products from your store
                        {' '}
                        {' '}
                        <InfoCircle />
                      </h4>
                    </Col>
                  </Row>
                  <Row>
                    <p>
                      Select the products that customers can add to
                      personalize their Groupshop
                    </p>
                  </Row>
                  <Row className="text-start">
                    <Col>
                      <AddProductButton />
                      {/* <WhiteButton onClick={handleAddProduct}>Add products</WhiteButton> */}
                    </Col>
                  </Row>
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
                  <Row>
                    <p>
                      When enabled, customers will be given the option to
                      join an existing Groupshop on the info pop-up.
                    </p>
                  </Row>
                  <Row>
                    {/* <Col xs={3} md={4}> </Col> */}
                    <Col xs={12} md={6} className="text-right">

                      <ToggleButtonGroup
                        type="radio"
                        name="joinExisting"
                      >
                        <ToggleButton
                          variant="outline-success"
                          className={styles.enablebtn}
                          id="joinExisting-e"
                          value={1}
                          checked={values.joinExisting === true}
                          onChange={(e) => handleChange(e)}
                        >
                          <Check2Circle className="fs-4" />
                          {' '}
                          Enable
                        </ToggleButton>

                        <ToggleButton
                          variant="outline-danger"
                          className={styles.disablebtn}
                          id="joinExisting-d"
                          value={0}
                          checked={values.joinExisting === false}
                          onChange={(e) => handleChange(e)}
                        >
                          <XCircle className="fs-5" />
                          {' '}
                          Disable
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
              campaignInitial={campaignInitial}
              setcampaignInitial={setcampaignInitial}
              editMax={editMax}
              editMin={editMin}
              setEditMax={setEditMax}
              setEditMin={setEditMin}
              handleForm={handleForm}
            />
          </Col>
        </Row>
        <Row>
          <Col><h3>Groupshop Design</h3></Col>
        </Row>
        <Row className="mt-2">
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
        <Col lg={9} className={[styles.dashboard_campaign__lightBg].join(' ')}>
          <h4>Save Campaign</h4>
          <p className={styles.dashboard_campaign__light_text}>
            Save & activate this Groupshop campaign, or just save and come back to it later.
          </p>
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

      </Form>
    </Container>
  );
}
