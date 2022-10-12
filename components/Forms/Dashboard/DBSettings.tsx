/* eslint-disable max-len */
import * as React from 'react';
import {
  Form, Row, Col, InputGroup, ButtonGroup, ToggleButton, Container,
} from 'react-bootstrap';
import Button from 'components/Buttons/Button/Button';
import useQueryString from 'hooks/useQueryString';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { StoreContext } from 'store/store.context';
import { UPDATE_CAMPAIGN, UPDATE_STORE } from 'store/store.graphql';
import { IStore, ISettings } from 'types/store';
import styles from 'styles/Step4.module.scss';
import styles2 from 'styles/Campaign.module.scss';
import Image1 from 'assets/images/Ellipse1.png';
import Image2 from 'assets/images/Ellipse2.png';
import Image3 from 'assets/images/Ellipse3.png';
import Image4 from 'assets/images/Ellipse4.png';
import Image5 from 'assets/images/Ellipse5.png';
import custombg from 'assets/images/Rectangle499.png';
import uploadbtn from 'assets/images/Rectangle500.png';
import ColorPicker from 'components/Buttons/ColorPicker';
import GradiantBox from 'components/Buttons/gradiantBox';
import UploadButton from 'components/Buttons/UploadBtn';
import WhiteButton from 'components/Buttons/WhiteButton/WhiteButton';
import useCampaign from 'hooks/useCampaign';
import useUtilityFunction from 'hooks/useUtilityFunction';

interface IValues {
  settings?: ISettings;
}
  interface IProps {
    handleChange: any;
    values: any;
    setFieldValue: any;
    touched: any;
    errors: any;
    handleCustomBg: any;
    // eslint-disable-next-line react/require-default-props
    handleForm?: any;
    isEdit: boolean;
    }
export default function DBSettings({
  handleChange, values, setFieldValue, touched, errors, handleCustomBg, handleForm, isEdit,
}:IProps) {
  const [, setParams] = useQueryString();
  const front = React.useRef(null);

  const onButtonClick = (ref:any) => {
    // `current` points to the mounted text input element
    ref.current.click();
  };
  const { store, dispatch } = React.useContext(StoreContext);

  const radios = [
    // { name: 'solid', value: 'solid', component: <GradiantBox color={values.customColor} className={styles.ob_settings__thumbnail} type="circle" /> },
    { name: 'image1', value: 'image1', component: <img src={Image1.src} alt="imageone" /> },
    { name: 'image2', value: 'image2', component: <img src={Image2.src} alt="imageone" /> },
    { name: 'image3', value: 'image3', component: <img src={Image3.src} alt="imageone" /> },
    { name: 'image4', value: 'image4', component: <img src={Image4.src} alt="imageone" /> },
    { name: 'image5', value: 'image5', component: <img src={Image5.src} alt="imageone" /> },
  ];
  const { getKeyFromS3URL } = useUtilityFunction();
  // console.log('🚀 DBSettings.tsx', values);
  // if (isEdit) {
  //   const { settings } = values;
  //   // eslint-disable-next-line no-param-reassign
  //   values = { ...settings };
  // }
  return (

    <>
      <section className={[styles2.dashboard_campaign__box_4, '', ''].join(' ')}>
        <div className={styles2.dashboard_campaign__overlay}>
          <div className={styles2.dashboard_campaign__overlayText}>Coming Soon</div>
        </div>
        <Row>
          <h4 className="mb-0">Set your brand color</h4>
        </Row>
        <Form.Text>
          <p className="mt-0">You’ll want a color that stands out on a white background.</p>
        </Form.Text>
        <Row>
          <Col lg={12}>
            <Form.Group className="d-flex ">
              <span className={styles.ob_settings__brandcolor}>
                <Form.Label htmlFor="brandColor" className="m-0 py-1 px-3 pe-5">Click to pick</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    handleForm('settings.general.brandColor', e.currentTarget.value);
                  }}
                  type="color"
                  // id="brandColor"
                  name="brandColor"
                  id="brandColor"
                  isInvalid={touched.brandColor && !!errors.brandColor}
                  defaultValue="#3C3C3C"
                  title="Choose your color"
                  className="p-0 m-0 rounded-end"
                  bsPrefix="onboarding"
                  value={values.settings?.general?.brandColor}
                />
              </span>
              {' '}
              <Form.Control.Feedback type="invalid">
                {errors.brandColor}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
      </section>
      <section className={['mt-4', styles2.dashboard_campaign__box_3].join(' ')}>
        <Row>
          <Col>
            <h4>
              Select a banner background
              {' '}
              <span className={styles.badge}>Recommended</span>
            </h4>
            <Form.Text>
              <p className="mt-2 ">
                This will serve as the banner for your Groupshop page. Pick a banner that isn’t too
                distracting and adapts well to both mobile and desktop.
              </p>
              {' '}
            </Form.Text>
          </Col>
        </Row>
        <Row className=" px-1 py-3 pb-4 mx-1">
          <Col lg={12}>
            <div className="ms-3">
              {/* <h6 className="fs-6 fw-bolder lh-base ">
                Custom background
                <span className={styles.badge}>Recommended</span>
                {' '}
              </h6> */}
              <Row>
                <Col lg={6} className="d-line-flex text-nowrap align-middle border-end">
                  <Form.Check
                    inline
                    label="Image"
                    className={styles2.dashboard_campaign_radio_label}
                    name="media"
                    value="image"
                    type="radio"
                    checked={values.settings?.general?.media === 'image'}
                    onChange={(e) => {
                      handleCustomBg('settings.general.media', e.currentTarget.value);
                    }}
                  />
                  <Col className={values.settings?.general?.media === 'image' ? 'd-flex flex-wrap' : 'd-none'}>
                    <span className={styles.dot}>-</span>
                    <UploadButton
                      icon={(<WhiteButton><span className="mx-3">Upload</span></WhiteButton>)}
                      setFieldValue={setFieldValue}
                      field="settings.general.imageUrl"
                      className={styles.ob_settings__uploadbtn}
                      handleCustomBg={handleForm}
                      url={values.settings?.general?.imageUrl ? getKeyFromS3URL(values.settings?.general.imageUrl) : ''}
                    />
                  </Col>
                  <Row className={values.settings?.general?.media === 'image' ? 'd-flex' : 'd-none'}>
                    <Col className="d-flex  justify-content-center text-center">
                      <h6 className={styles.smallt}>
                        {' '}
                        (Formats: PNG, JPG, JPEG)
                        <br />
                        1440px x 500px
                      </h6>
                    </Col>
                  </Row>
                </Col>
                {/* <Col lg={6}>
                  <Form.Check
                    inline
                    label="Youtube video"
                    className={styles2.dashboard_campaign_radio_label}
                    name="media"
                    value="youtube"
                    type="radio"
                    checked={values.settings?.general?.media === 'youtube'}
                    onChange={(e) => {
                      handleCustomBg('settings.general.media', e.currentTarget.value);
                    }}

                  />
                  <Row>

                    <Col className={values.settings?.general?.media === 'youtube' ? 'd-block' : 'd-none'}>
                      <Form.Control
                        type="text"
                        name="youtubeUrl"
                        value={values.settings?.general?.youtubeUrl}
                        isValid={touched.youtubeUrl && !errors.youtubeUrl}
                        onChange={(e) => {
                          handleCustomBg('settings.general.youtubeUrl', e.currentTarget.value);
                        }}
                      />
                      <p className="text-muted">Please paste youtube video URL</p>
                    </Col>

                  </Row>
                </Col> */}
              </Row>

            </div>
          </Col>
        </Row>
      </section>
    </>

  );
}
