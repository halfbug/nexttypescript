/* eslint-disable jsx-quotes */
import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Page from 'components/Layout/Page/Page';
import {
  Row, Col,
  TabPane, TabContainer, Tab, Nav,
} from 'react-bootstrap';
import { FaStore, FaBullhorn } from 'react-icons/fa';
import { FiLayout } from 'react-icons/fi';
import styles from 'styles/DbSetting.module.scss';
import GeneralSettings from 'components/Forms/Dashboard/GeneralSettings';
import LayoutSettings from 'components/Forms/Dashboard/LayoutSettings';
import MarketingSettings from 'components/Forms/Dashboard/MarketingSettings';
import MarketingLogo from 'assets/images/marketing-tool.svg';
import MarketingTransparentLogo from 'assets/images/marketing-tools-transparent.svg';
import LayoutLogo from 'assets/images/layout.svg';
import LayoutTransparentLogo from 'assets/images/feather-layout.svg';
import GeneralLogo from 'assets/images/general.svg';
import GeneralTransparentLogo from 'assets/images/awesome-store.svg';
import { IStore, ISocialLink, ISettings } from 'types/store';
import { StoreContext } from 'store/store.context';
import { useMutation } from '@apollo/client';
import { UPDATE_STORE } from 'store/store.graphql';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import * as yup from 'yup';

interface IValues {
  brandName: string | undefined;
  industry: string | undefined;
  logoImage: string | undefined;
  settings?: ISettings;
  instagram?: string | undefined;
  pinterest?: string | undefined;
  tiktok?: string | undefined;
  twitter?: string | undefined;
  facebook?: string | undefined;
}

const Settings: NextPage = () => {
  const [tab, setTab] = useState('General');
  const [updateBI, { data, loading, error }] = useMutation<IStore>(UPDATE_STORE);
  const { store, dispatch } = React.useContext(StoreContext);

  const newState = {
    brandName: store?.brandName ?? '',
    logoImage: store?.logoImage ?? '',
    industry: store?.industry ?? '',
    settings: {
      general: {
        brandColor: (store?.settings?.general?.brandColor) ? store?.settings?.general?.brandColor : '',
        customBg: (store?.settings?.general?.customBg) ? store?.settings?.general?.customBg : '',
        imageUrl: (store?.settings?.general?.imageUrl) ? store?.settings?.general?.imageUrl : '',
        media: (store?.settings?.general?.media) ? store?.settings?.general?.media : '',
        youtubeUrl: (store?.settings?.general?.youtubeUrl) ? store?.settings?.general?.youtubeUrl : '',
      },
      layout: {
        bannerProductPage: (store?.settings?.layout?.bannerProductPage) ? 1 : 0,
        bannerCartPage: (store?.settings?.layout?.bannerCartPage) ? 1 : 0,
        bannerStyle: (store?.settings?.layout?.bannerStyle ? store?.settings?.layout?.bannerStyle : ''),
        bannerDesign: (store?.settings?.layout?.bannerDesign ? store?.settings?.layout?.bannerDesign : ''),
        bannerCustomColor: (store?.settings?.layout?.bannerCustomColor ? store?.settings?.layout?.bannerCustomColor : ''),
        callToActionText: (store?.settings?.layout?.callToActionText ? store?.settings?.layout?.callToActionText : ''),
        bannerSummaryPage: (store?.settings?.layout?.bannerSummaryPage ? store?.settings?.layout?.bannerSummaryPage : ''),

      },
      marketing: {
        recoverAbandoned: (store?.settings?.marketing?.recoverAbandoned) ? 1 : 0,
        WhatsAppnotifications: (store?.settings?.marketing?.WhatsAppnotifications) ? 1 : 0,
        facebookPixels: (store?.settings?.marketing?.facebookPixels ? store?.settings?.marketing?.facebookPixels : ''),
        tiktokPixels: (store?.settings?.marketing?.tiktokPixels ? store?.settings?.marketing?.tiktokPixels : ''),
        googlePixels: (store?.settings?.marketing?.googlePixels ? store?.settings?.marketing?.googlePixels : ''),
      },
    },
    instagram: store?.social?.instagram ?? '',
    pinterest: store?.social?.pinterest ?? '',
    tiktok: store?.social?.tiktok ?? '',
    twitter: store?.social?.twitter ?? '',
    facebook: store?.social?.facebook ?? '',
  };

  const regex = {
    instagram: /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/igm,
    twitter: /(?:(?:http|https):\/\/)?(?:www.)?(?:twitter.com)\/(\w+)/igm,
    facebook: /(?:(?:http|https):\/\/)?(?:www.)?(?:facebook.com)\/(\w+)/igm,
    tiktok: /(?:(?:http|https):\/\/)?(?:www.)?(?:tiktok.com)\/(\w+)/igm,
  };

  const validationSchema = yup.object({
    brandName: yup
      .string()
      .required('Brand Name is required.')
      .min(5, 'Too Short please give least five characters')
      .max(20, 'Too Long !! only 20 characters allowed.'),

    // facebook: yup.string().matches(regex.facebook, 'URL is not valid'),
    // instagram: yup.string().matches(regex.instagram, 'URL is not valid'),
    // tiktok: yup.string().matches(regex.tiktok, 'URL is not valid'),
    // twitter: yup.string().matches(regex.twitter, 'URL is not valid'),
  });

  const {
    handleSubmit, values, handleChange, touched, errors, setFieldValue,
  }: FormikProps<IValues> = useFormik<IValues>({
    initialValues: newState,
    validationSchema,
    validateOnChange: false,
    enableReinitialize: true,
    validateOnBlur: false,
    onSubmit: async (valz, { validateForm }:FormikHelpers<IValues>) => {
      if (validateForm) validateForm(valz);
      const {
        brandName, industry, logoImage, facebook, twitter, tiktok, instagram,
      } = valz;
      // console.log('SUBMIT');
      // console.log({ valz });
      await updateBI({
        variables: {
          updateStoreInput: {
            id: store.id,
            shop: store.shop,
            brandName,
            industry,
            logoImage,
            settings: {
              general: {
                brandColor: valz?.settings?.general?.brandColor,
                customBg: valz?.settings?.general?.customBg,
                imageUrl: valz?.settings?.general?.imageUrl,
                media: valz?.settings?.general?.media,
                youtubeUrl: valz?.settings?.general?.youtubeUrl,
              },
              layout: {
                bannerProductPage: !!(valz?.settings?.layout?.bannerProductPage),
                bannerCartPage: !!(valz?.settings?.layout?.bannerCartPage),
                bannerStyle: valz?.settings?.layout?.bannerStyle,
                bannerDesign: valz?.settings?.layout?.bannerDesign,
                bannerCustomColor: valz?.settings?.layout?.bannerCustomColor,
                callToActionText: valz?.settings?.layout?.callToActionText,
                bannerSummaryPage: valz?.settings?.layout?.bannerSummaryPage,
              },
              marketing: {
                recoverAbandoned: !!(valz?.settings?.marketing?.recoverAbandoned),
                WhatsAppnotifications: !!(valz?.settings?.marketing?.WhatsAppnotifications),
                facebookPixels: (valz?.settings?.marketing?.facebookPixels!) ? valz?.settings?.marketing?.facebookPixels! : '',
                tiktokPixels: (valz?.settings?.marketing?.tiktokPixels!) ? valz?.settings?.marketing?.tiktokPixels! : '',
                googlePixels: (valz?.settings?.marketing?.googlePixels!) ? valz?.settings?.marketing?.googlePixels! : '',
              },
            },
            social: {
              instagram,
              pinterest: null,
              tiktok,
              twitter,
              facebook,
            },
          },
        },
      });
      dispatch({ type: 'UPDATE_STORE', payload: valz });
    },
  });

  return (
    <Page headingText="Settings" onLogin={() => { }} onLogout={() => { }} onCreateAccount={() => { }}>
      <Row className={styles.setting_tab}>
        <Tab.Container id="left-tabs-example" defaultActiveKey="General">
          <Row>
            <Col lg={12}>
              <Nav>
                <Nav.Item className='me-1'>
                  <Nav.Link eventKey="General">
                    <Row
                      onClick={() => setTab('General')}
                      className={tab === 'General' ? styles.setting_tab_general_active : styles.setting_tab_general}
                    >
                      <Col className='ps-0'>
                        {tab === 'General' ? <GeneralTransparentLogo /> : <GeneralLogo />}
                        <h4 className='pt-1'>
                          General
                        </h4>
                        <TabPane eventKey="General" title="General" />
                      </Col>
                    </Row>

                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className='mx-1'>
                  <Nav.Link eventKey="Layout">
                    <Row
                      onClick={() => setTab('Layout')}
                      className={tab === 'Layout' ? styles.setting_tab_layout_active : styles.setting_tab_layout}
                    >
                      <Col className='ps-0'>
                        {tab === 'Layout' ? <LayoutTransparentLogo /> : <LayoutLogo />}
                        <h4 className='pt-1'>
                          Banners
                        </h4>
                        <TabPane eventKey="Layout" title="Layout" />
                      </Col>
                    </Row>

                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className='mx-1'>
                  <Nav.Link eventKey="Marketing">
                    <Row
                      onClick={() => setTab('Marketing')}
                      className={tab === 'Marketing' ? styles.setting_tab_marketing_tool_active : styles.setting_tab_marketing_tool}
                    >
                      <Col className='ps-0'>
                        {tab === 'Marketing' ? <MarketingTransparentLogo /> : <MarketingLogo />}
                        <h4 className='pt-1'>
                          Marketing Tools
                        </h4>
                        <TabPane eventKey="Marketing" title="Marketing" />
                      </Col>
                    </Row>

                  </Nav.Link>
                </Nav.Item>

              </Nav>
            </Col>
          </Row>
          <Row className='ge-0'>
            <Col lg={12}>
              <Tab.Content>
                <Tab.Pane eventKey="General">
                  <GeneralSettings
                    setFieldValue={setFieldValue}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    errors={errors}
                    values={values}
                    touched={touched}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="Layout">
                  <LayoutSettings
                    setFieldValue={setFieldValue}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    errors={errors}
                    values={values}
                    touched={touched}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="Marketing">
                  <MarketingSettings
                    setFieldValue={setFieldValue}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    errors={errors}
                    values={values}
                    touched={touched}
                  />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Row>
    </Page>
    // <div className="grid">
    // eslint-disable-next-line max-len
    //   <Page headingText="Settings" onLogin={() => { }} onLogout={() => { }} onCreateAccount={() => { }}>
    //     <Row className={styles.setting_tab}>
    //       <TabContainer id="uncontrolled-tab-example">
    //         <div className="col-lg-3">
    //           <Col className={styles.setting_tab_general}>
    //             <FaStore size={24} color="#835CC6" />
    //             <h4>
    //               General
    //             </h4>
    //             <TabPane eventKey="General" title="General" />
    //           </Col>
    //         </div>
    //         <div className="col-lg-3">
    //           <Col className={styles.setting_tab_layout}>
    //             <TabPane eventKey="Layout" title="Layout" />
    //             <FiLayout size={24} color="#F7BC7D" />
    //             <h4>Layout</h4>
    //           </Col>
    //         </div>
    //         <div className="col-lg-3">
    //           <Col className={styles.setting_tab_marketing_tool}>
    //             <FaBullhorn size={24} color="#F28BF4" />
    //             <TabPane eventKey="Marketing Tools" title="Marketing Tools" />
    //             <h4>Marketing Tools</h4>
    //           </Col>
    //         </div>
    //       </TabContainer>
    //     </Row>
    //     <h3 className={styles.setting_tab_heading}>Brand Details</h3>
    //     <Row className={styles.setting_col}>
    //       <div className="col-lg-8">
    //         <Col className={styles.setting_col_purplebox}>
    //           <BrandInfo />
    //         </Col>
    //       </div>
    //       <div className="col-lg-4">
    //         <Col className={styles.setting_col_greenbox}>
    //           <h4 className={styles.setting_col_subheading}>Your Industry</h4>
    //           {' '}
    //           <select
    //             className="form-select"
    //             aria-label="Default select example"
    //             name="industry"
    //           >
    //             <option selected>Click to select</option>
    //             <option value="1">One</option>
    //             <option value="2">Two</option>
    //             <option value="3">Three</option>
    //           </select>
    //         </Col>
    //       </div>
    //     </Row>
    //   </Page>
    // </div>
  );
};

export default Settings;
