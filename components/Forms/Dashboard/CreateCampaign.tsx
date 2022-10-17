import * as React from 'react';
import {
  Form, Row, Col, ToggleButtonGroup, ToggleButton, Container,
} from 'react-bootstrap';
import styles from 'styles/Campaign.module.scss';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { StoreContext } from 'store/store.context';
import { ICampaign, ICampaignForm } from 'types/store';
import ProductButton from 'components/Buttons/ProductButton';
import { useMutation, useQuery } from '@apollo/client';
import { Check2Circle, InfoCircle, XCircle } from 'react-bootstrap-icons';
import { CREATE_CAMPAIGN_DB, GET_SALES_TARGET } from 'store/store.graphql';
import ToolTip from 'components/Buttons/ToolTip/ToolTip';

import WhiteButton from 'components/Buttons/WhiteButton/WhiteButton';
import Screen1 from 'components/Onboarding/Step2a/Screen1';
import Router, { useRouter } from 'next/router';
import useQueryString from 'hooks/useQueryString';
import useCampaign from 'hooks/useCampaign';
import useUtilityFunction from 'hooks/useUtilityFunction';
import * as constant from 'configs/constant';
import AddProductButton from 'components/Buttons/AddProductButton';
import Bulb from 'assets/images/bulb.svg';
import Star from 'assets/images/star.svg';
import DBRewards from './DBRewards';

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
    maxDiscountVal: '',
    minDiscountVal: '',
    minDiscount: 0,
    maxDiscount: 0,
    isRewardEdit: false,

  });
  const { clearNewCampaign, setValue } = useCampaign();
  React.useEffect(() => {
    clearNewCampaign();
    dispatch({ type: 'SINGLE_CAMPAIGN', payload: { singleEditCampaignId: '' } });
  }, []);
  const {
    loading: appLodaing, data: { salesTarget } = { salesTarget: [] },
  } = useQuery(GET_SALES_TARGET);
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
    rewards: yup
      .string()
      .required('required.'),
    minDiscount: yup
      .number().typeError('you must specify a number')
      .min(5)
      .max(40)
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
            console.log('val', val);
            return true;
          }

          return false;
        }),
    maxDiscount: yup
      .number().typeError('you must specify a number')
      .moreThan(yup.ref('minDiscount'), constant.EDIT_REWARDS_MSG4)
      .max(50)
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
      if (validateForm) validateForm(valz);
      const {
        name, criteria, joinExisting, rewards, selectedTarget, isActive,
        customBg, addableProducts, minDiscount, maxDiscount, isRewardEdit,
      } = valz;
      // let { minDiscountVal, maxDiscountVal } = valz;
      const minDiscountVal = `${minDiscount}%`;
      const maxDiscountVal = `${maxDiscount}%`;
      console.log({ valz });
      let { media } = valz;
      if (customBg) media = '';
      const newSelectedTarget = { ...selectedTarget };

      if (isRewardEdit) {
        const baseline = minDiscount;
        const lowBaseline = 10;
        const avgBaseline = 15;
        const highBaseline = 20;
        const superBaseline = 25;

        if (baseline! <= lowBaseline) {
          newSelectedTarget.name = 'Low';
          selectedTarget.name = 'Low';
        } else if (baseline! > lowBaseline && baseline! <= avgBaseline) {
          newSelectedTarget.name = 'Average';
          selectedTarget.name = 'Average';
        } else if (baseline! >= highBaseline && baseline! < superBaseline) {
          newSelectedTarget.name = 'High';
          selectedTarget.name = 'High';
        } else if (baseline! >= superBaseline) {
          newSelectedTarget.name = 'Super-charged';
          selectedTarget.name = 'Super-charged';
        }
        const newAverage = multiple5((+minDiscount! + +maxDiscount!) / 2);
        // if (minDiscountVal && minDiscountVal[minDiscountVal.length - 1] !== '%') {
        //   minDiscountVal = `${minDiscountVal}%`;
        // }
        // if (maxDiscountVal && maxDiscountVal[maxDiscountVal.length - 1] !== '%') {
        //   maxDiscountVal = `${maxDiscountVal}%`;
        // }

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
            joinExisting: Boolean(parseInt(joinExisting ?? 1, 10)),
            isActive,
            products: store?.newCampaign?.productsArray,
            collections: store?.newCampaign?.collectionsArray,
            addableProducts,
            salesTarget: newSelectedTarget,

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

      setParams({ ins: undefined });
    }
  }, [ins]);

  const handleCustomBg = (field: string, value: string) => {
    if (field === 'customBg') {
      setFieldValue('imageUrl', '');
      setFieldValue('youtubeUrl', '');
      setFieldValue('customColor', '');
    } else {
      setFieldValue('customColor', '');
      setFieldValue('customBg', '');
    }

    setFieldValue(field, value);
  };
  const handleForm = (field: string, value: string) => {
    setFieldValue(field, value);
  };
  const handleAddProduct = () => {
    setParams({ ins: 'addproduct' });
  };
  const handleDeleteProduct = () => {
    dispatch({ type: 'NEW_CAMPAIGN', payload: { newCampaign: { products: [], collections: [], productsArray: [] } } });
    setFieldValue('products', []);
  };
  const handleDeleteAddProduct = () => {
    dispatch({ type: 'NEW_CAMPAIGN', payload: { newCampaign: { addableProducts: [], addableCollections: [], addableProductsArray: [] } } });
    setFieldValue('addableProducts', []);
  };

  const handleAfterUpdate = () => {
    console.log('create');
  };

  return (
    <Container className={styles.dashboard_campaign}>
      <Screen1 handleAfterUpdate={handleAfterUpdate} show={ins === '2a' || ins === 'addproduct'} />
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
                    <Form.Control.Feedback type="invalid" className={styles.dbrewards_error}>
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Text className={['col-3 mt-2 mx-2', styles.dashboard_campaign_text_limit].join(' ')}>
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
                      Customers get cashback and discounts on the products selected below by default
                    </p>
                  </Row>
                  <Row className="ms-3">
                    <Form.Check
                      inline
                      label="All products (Recommended)"
                      className={values.criteria === 'allproducts'
                        ? styles.dashboard_campaign_active_radio_option
                        : styles.dashboard_campaign_radio_label}
                      onChange={(e) => {
                        handleChange(e);
                        // handleSubmit();
                      }}
                      onClick={() => { setValue('criteria', 'allproducts'); setdisableBtn(true); }}
                      type="radio"
                      name="criteria"
                      isInvalid={touched.criteria && !!errors.criteria}
                      value="allproducts"
                      checked={values.criteria === 'allproducts'}
                    />
                    {/* <span className={styles.dashboard_campaign_badge}>Recommended</span> */}
                  </Row>
                  <Row className="row mb-2 ms-0"><p className="mb-0 mt-1 p-0"><strong>Or select as many collections as you want below:</strong></p></Row>
                  <Row className="ms-3">
                    <Col className="p-0">
                      <Form.Check
                        inline
                        label="Best sellers"
                        className={values.criteria === 'bestseller' ? styles.dashboard_campaign_active_radio_option : styles.dashboard_campaign_radio_label}
                        onChange={(e) => handleChange(e)}
                        type="radio"
                        name="criteria"
                        isInvalid={touched.criteria && !!errors.criteria}
                        value="bestseller"
                        onClick={() => { setValue('criteria', 'bestseller'); setdisableBtn(true); }}
                        checked={values.criteria === 'bestseller'}
                      />
                    </Col>
                  </Row>
                  <Row className="ms-3">
                    <Col className="p-0">
                      <Form.Check
                        inline
                        onChange={(e) => handleChange(e)}
                        label="Newest products"
                        className={values.criteria === 'newest' ? styles.dashboard_campaign_active_radio_option : styles.dashboard_campaign_radio_label}
                        type="radio"
                        name="criteria"
                        value="newest"
                        isInvalid={touched.criteria && !!errors.criteria}
                        onClick={() => { setValue('criteria', 'newest'); setdisableBtn(true); }}
                        checked={values.criteria === 'newest'}
                      />
                    </Col>
                  </Row>
                  <Row className="ms-3">
                    <Col className="p-0">
                      <Form.Check
                        inline
                        label="Specific products/collections (up to 80 products)"
                        className={values.criteria === 'custom' ? styles.dashboard_campaign_active_radio_option : styles.dashboard_campaign_radio_label}
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
                    handleDelete={handleDeleteProduct}
                  />
                  {/* <Row className="mt-4 border-top">
                    <Col>
                      <h4 className="mt-3">
                        Allow customers to add products from your store
                        {' '}
                        <ToolTip
                          className={styles.dashboard_campaign__pop}
                          icon={<InfoCircle size={13} />}
                          popContent="You choose which products your customers will earn
                        cashback and discounts on. Use this feature to select which
                         additional products
                        customers can add from your store to personalize their Groupshop."
                        />
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
                      <AddProductButton
                        handleDelete={handleDeleteAddProduct}
                      />

                    </Col>
                  </Row> */}
                </section>

                <section className={styles.dashboard_campaign__box_2}>
                  <Row>
                    <Col>
                      <h4>
                        Allow customers to join existing Groupshop pages
                        {' '}
                        <ToolTip
                          className={styles.dashboard_campaign__pop}
                          icon={<InfoCircle size={13} />}
                          popContent="When customers view the pre-purchase pop-up on your store
                          to learn about Groupshop, they can be given
                          the option to join an existing Groupshop. Enable this feature to display this option."
                        />
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
            <section className={['mt-2', styles.dbrewards, styles.dbrewards_box].join(' ')}>
              <Row><Col><h4>Set your rewards</h4></Col></Row>
              <Row className={styles.dbrewards_text_lg}>
                <p className="mt-1">
                  Set the discount and chashback percentages your customers will earn on their order
                  as they reach different milestones.
                </p>
              </Row>
              <Row><Col><h5>Select your desired sales volume:</h5></Col></Row>
              <Row className={styles.dbrewards_text_lg}>
                <p className="mt-1">
                  We’ll set your reward tiers based on our
                  recommendations.
                </p>
              </Row>
              <DBRewards
                values={values}
                handleChange={handleChange}
                errors={errors}
                setFieldValue={setFieldValue}
                setcampaignInitial={setcampaignInitial}
                editMax={editMax}
                editMin={editMin}
                setEditMax={setEditMax}
                setEditMin={setEditMin}
              />
              <div className="border-top mt-4 mb-1">
                <Row className=" mt-3 d-inline-flex justify-content-center">
                  <Col lg={1}>
                    <Bulb size={16} />
                  </Col>
                  <Col lg={10} className={['ms-1 px-0', styles.dbrewards_icon_text].join(' ')}>
                    Not sure what to set? Use the sales volume picker above and we’ll fill
                    these based on our recommendations.
                  </Col>
                </Row>
                <Row className="mt-2 d-inline-flex justify-content-center">
                  <Col lg={1} className={styles.dbrewards_icon_text}>
                    <Star size={16} />
                  </Col>
                  <Col lg={10} className={['ms-1 px-0', styles.dbrewards_icon_text].join(' ')}>
                    Be generous – reward your customers the same
                    way you reward Facebook or Google for finding
                    you leads. We’ll do the math to make sure you’re
                    always winning, and so are your customers.
                  </Col>
                </Row>
              </div>
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
            }}
          >
            Save for later
          </WhiteButton>
        </Col>
      </Form>
      <Row className="mb-5 pb-3" />
    </Container>
  );
}
