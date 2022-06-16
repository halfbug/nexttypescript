/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable quotes */
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
import {
  ICampaign, ICampaignForm, ICollection, IProduct,
} from 'types/store';
import ProductButton from 'components/Buttons/ProductButton';
import { useMutation } from '@apollo/client';
import { Check2Circle, InfoCircle, XCircle } from 'react-bootstrap-icons';
import { UPDATE_CAMPAIGN } from 'store/store.graphql';
import Router, { useRouter } from 'next/router';
import ToolTip from 'components/Buttons/ToolTip/ToolTip';

import WhiteButton from 'components/Buttons/WhiteButton/WhiteButton';
import Screen1 from 'components/Onboarding/Step2a/Screen1';
import useUtilityFunction from 'hooks/useUtilityFunction';
import useCampaign from 'hooks/useCampaign';
import AddProductButton from 'components/Buttons/AddProductButton';
import useDelay from 'hooks/useDelay';
import UpdateRewards from './UpdateRewards';
import DBSettings from './DBSettings';
import CampaignSocialMedia from './CampaignSocialMedia';

interface IProps {
  setHeading: any;
}
export default function UpdateCampaign({ setHeading }: IProps) {
  const { query: { campaignid, ins } } = useRouter();
  const [, setParams] = useQueryString();

  const [
    editCampaign,
    // eslint-disable-next-line no-unused-vars
    { data, loading, error },
  ] = useMutation<any, ICampaign | null>(UPDATE_CAMPAIGN);

  const { store, dispatch } = React.useContext(StoreContext);

  const [disableBtn, setdisableBtn] = React.useState(true);
  const [selectedProducts, setselectedProducts] = React.useState<IProduct[] | undefined>(undefined);
  const [selectedCollections, setselectedCollections] = React.useState<ICollection[] | undefined>(undefined);
  const [state, setstate] = React.useState<ICampaignForm>({
    id: '',
    criteria: '',
    joinExisting: 1,
    rewards: '',
    brandColor: '#3C3C3C',
    customColor: '',
    customBg: '',
    imageUrl: '',
    youtubeUrl: '',
    media: 'image',
    addableProducts: [],
    facebook: '',
    instagram: '',
    tiktok: '',
    pinterest: '',
    twitter: '',

  });
  const { findInArray } = useUtilityFunction();
  const {
    campaign, updateCampaign, updateStoreForEditCampaignId, deleteProductCollections,
  } = useCampaign();
  React.useEffect(() => {
    updateStoreForEditCampaignId(campaignid);
  }, [campaignid]);
  console.log(campaign, "campaign");

  const re = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;
  const validUrl = /^(https:\/\/?(www.)?instagram.com\/p\/([^/?#&/]+)).*/gm;

  React.useEffect(() => {
    if (campaign) {
      // updateStoreForEditCampaignId(campaignid);
      // const arr:ICampaign[] = [...campaign];
      if (campaign.criteria! === "custom") setdisableBtn(false);
      setHeading(campaign.name!);

      const newState:ICampaignForm = {
        criteria: campaign?.criteria!,
        joinExisting: campaign?.joinExisting!,
        rewards: campaign?.rewards!,
        brandColor: campaign?.settings?.brandColor!,
        customBg: campaign?.settings?.customBg!,
        imageUrl: campaign?.settings?.imageUrl!,
        youtubeUrl: campaign?.settings?.youtubeUrl!,
        media: campaign?.settings?.media!,
        products: campaign?.products,
        facebook: campaign?.socialLinks?.facebook ?? '',
        instagram: campaign?.socialLinks?.instagram ?? '',
        tiktok: campaign?.socialLinks?.tiktok ?? '',
        // pinterest: arr[0]?.socialLinks?.facebook,
        twitter: campaign?.socialLinks?.twitter ?? '',

      };
      setstate({ ...newState });
    }
  }, [store]);

  const validationSchema = yup.object({
    criteria: yup
      .string()
      .required('Select product options'),
    brandColor: yup
      .string()
      .required('Brand Color is required.'),
    facebook: yup.string().matches(re, 'URL is not valid'),
    instagram: yup.string().matches(re, 'Instagram url is not valid'),
    tiktok: yup.string().matches(re, 'URL is not valid'),
    twitter: yup.string().matches(re, 'URL is not valid'),

  });

  const {
    handleSubmit, values, handleChange, touched, errors, setFieldValue,
  }: FormikProps<ICampaignForm> = useFormik<ICampaignForm>({
    initialValues: state,
    validationSchema,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (valz, { validateForm }:FormikHelpers<ICampaignForm>) => {
      if (validateForm) validateForm(valz);
      const {
        criteria, joinExisting, products, brandColor, customColor, customBg,
        imageUrl, youtubeUrl, addableProducts,
        facebook, tiktok, instagram, twitter,
      } = valz;
      console.log({ valz });
      let { media } = valz;

      if (customBg) media = "";
      let customProducts: any[] = [];
      let customCollections: any[] = [];
      if (criteria === 'custom') {
        if (store?.newCampaign?.productsArray?.length) {
          customProducts = [...store?.newCampaign?.productsArray ?? []];
          customCollections = [...store?.newCampaign?.collectionsArray ?? []];
        } else {
          customProducts = [...campaign?.products ?? []];
          customCollections = [...campaign?.collections ?? []];
        }
      }

      const campObj:null | any = await editCampaign({
        variables: {
          updateCampaignInput: {
            storeId: store.id,
            id: campaignid,
            criteria,
            // eslint-disable-next-line radix
            joinExisting: Boolean(parseInt(joinExisting ?? 1)),
            socialLinks: {
              facebook,
              instagram,
              tiktok,
              twitter,
            },

            products: customProducts,
            collections: customCollections,
            addableProducts,
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
      // console.log({ campObj });
      const newObj = campObj.data.updateCampaign;

      const updatedCampaigns = store?.campaigns?.map((item:any) => {
        if (item.id === newObj.id) {
          return newObj;
        }
        return item;
      });
      dispatch({ type: 'UPDATE_CAMPAIGN', payload: { campaigns: updatedCampaigns } });
    },
  });

  React.useEffect(() => {
    if (ins === "2a" && campaign?.products) {
      if (campaign?.products) {
        setselectedProducts(findInArray(campaign?.products, store?.products || [], null, "id"));
      }
      if (campaign?.collections) {
        setselectedCollections(findInArray(campaign?.collections, store?.collections || [], null, "id"));
      }
    } else if (ins === "addproduct" && campaign?.addableProducts) {
      setselectedProducts(findInArray(campaign?.addableProducts, store?.products || [], null, "id"));
    }

    if (ins === '2') {
      if (store?.newCampaign?.productsArray?.length) {
        setFieldValue('products', store?.newCampaign?.productsArray);
        setFieldValue('collections', store?.newCampaign?.collections);
        setTimeout(handleSubmit, 2000);
      }
      if (store?.newCampaign?.addableProductsArray?.length) {
        setFieldValue('addableProducts', store?.newCampaign?.addableProductsArray);
        setTimeout(handleSubmit, 2000);
      }
      setParams({ ins: undefined });
    }
  }, [ins]);

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

    setFieldValue(field, value);

    handleSubmit();
  };
  const debouncedSubmit = useDelay(300);

  const handleForm = (field: string, value: string) => {
    setFieldValue(field, value);
    handleSubmit();
  };
  const handleAddProduct = () => {
    setParams({ ins: 'addproduct' });
  };
  const handleDeleteProduct = () => {
    dispatch({ type: 'NEW_CAMPAIGN', payload: { newCampaign: { products: [], collections: [], productsArray: [] } } });
    setFieldValue('products', []);
    setFieldValue('collections', []);

    const mycamp = deleteProductCollections(campaignid);
    dispatch({ type: 'UPDATE_CAMPAIGN', payload: { campaigns: mycamp } });
    handleSubmit();
  };
  const handleDeleteAddProduct = () => {
    dispatch({ type: 'NEW_CAMPAIGN', payload: { newCampaign: { addableProducts: [], addableCollections: [], addableProductsArray: [] } } });
    setFieldValue('addableProducts', []);
    const mycamp = updateCampaign(campaignid, 'addableProducts', []);
    dispatch({ type: 'UPDATE_CAMPAIGN', payload: { campaigns: mycamp } });
    handleSubmit();
  };
  return (
    <Container className={styles.dashboard_campaign}>
      <Screen1 show={ins === '2a' || ins === 'addproduct'} selectedProducts={selectedProducts || []} selectedCollections={selectedCollections || []} />
      <Row className="pt-4">
        <Col lg={7} className="gx-5">
          <Row>
            <Col>
              <h3>Groupshop Product</h3>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <Form noValidate onSubmit={handleSubmit}>
                <section className={styles.dashboard_campaign__box_1}>
                  <Row>
                    <h4>
                      Select and add products to Groupshop
                    </h4>
                  </Row>
                  <Row><p>Customers get cashback and discounts on the products selected below by default</p></Row>
                  <Row>
                    <Col>
                      <Form.Check
                        inline
                        label="Best sellers"
                        className={values.criteria === 'bestseller' ? styles.dashboard_campaign_active_radio_option : styles.dashboard_campaign_radio_label}
                        onChange={(e) => {
                          handleChange(e);
                          handleSubmit();
                        }}
                        type="radio"
                        name="criteria"
                        isInvalid={touched.criteria && !!errors.criteria}
                        value="bestseller"
                        checked={values.criteria === 'bestseller'}
                      />
                      <Form.Check
                        inline
                        onChange={(e) => {
                          handleChange(e);
                          handleSubmit();
                        }}
                        label="Newest products"
                        className={values.criteria === 'newest' ? styles.dashboard_campaign_active_radio_option : styles.dashboard_campaign_radio_label}
                        type="radio"
                        name="criteria"
                        value="newest"
                        isInvalid={touched.criteria && !!errors.criteria}
                        checked={values.criteria === 'newest'}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col>
                      <Form.Check
                        inline
                        label="Specific products/collections (up to 80 products)"
                        className={values.criteria === 'custom' ? styles.dashboard_campaign_active_radio_option : styles.dashboard_campaign_radio_label}
                        onChange={(e) => {
                          handleChange(e);
                          handleSubmit();
                        }}
                        onClick={() => {
                          setdisableBtn(false);
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
                    totalProducts={(values.products?.length) ? values.products?.length : 0}
                    handleDelete={handleDeleteProduct}
                  />
                  <hr />
                  <Row>
                    <Col>
                      <h4>
                        Allow customers to add products from your store
                        {' '}
                        <ToolTip
                          className={styles.dashboard_campaign__pop}
                          icon={<InfoCircle size={13} />}
                          popContent="You choose which products your customers will earn
                        cashback and discounts on. Use this feature to select which additional products
                        customers can add from your store to personalize their Groupshop."
                        />
                      </h4>
                    </Col>
                  </Row>
                  <Row className="text-muted"><p>Select the products that customers can add to personalize their Groupshop</p></Row>
                  <Row className="text-start">
                    <Col>
                      <AddProductButton
                        handleDelete={handleDeleteAddProduct}
                      />
                    </Col>
                  </Row>
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
                  <Row className="text-muted"><p>When enabled, customers can access discounts from existing Groupshop pages</p></Row>
                  <Row className="mt-2">

                    <Col xs={12} md={6} className="text-right">
                      <ToggleButtonGroup
                        type="radio"
                        name="joinExisting"
                      >
                        <ToggleButton
                          variant="outline-success"
                          className={values.joinExisting === true ? styles.enablebtn_dark : styles.enablebtn}
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
                          Enable
                        </ToggleButton>
                        <ToggleButton
                          variant="outline-danger"
                          className={values.joinExisting === false ? styles.disablebtn_dark : styles.disablebtn}
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
                          Disable
                        </ToggleButton>

                      </ToggleButtonGroup>
                    </Col>
                  </Row>
                </section>

              </Form>

            </Col>
          </Row>

        </Col>
        <Col lg={5} className="gx-5">
          <Container>
            <Row className="mb-2">
              <Col>
                <h3>Campaign Rewards</h3>
              </Col>
            </Row>
            <UpdateRewards />
          </Container>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col><h3>Groupshop Design</h3></Col>
      </Row>
      <Row className="mt-2">
        <Col lg={7}>
          <section>
            {/* <Settings isDB /> */}
            <DBSettings
              values={values}
              handleChange={handleChange}
              touched={touched}
              errors={errors}
              setFieldValue={setFieldValue}
              handleCustomBg={handleCustomBg}
              handleForm={handleForm}
              isEdit
            />
          </section>
          <Row className="mb-4" />
        </Col>
        <Col lg={5}>
          <Row />
          <section className={styles.dashboard_campaign__box_5}>
            <CampaignSocialMedia
              setFieldValue={setFieldValue}
              values={values}
              handleForm={handleForm}
              touched={touched}
              errors={errors}
            />
          </section>
        </Col>
      </Row>
    </Container>
  );
}
