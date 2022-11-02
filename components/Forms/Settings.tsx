/* eslint-disable quotes */
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
import { IStore } from 'types/store';
import styles from 'styles/Step4.module.scss';
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
    brandColor?: string;
    customBg?: string;
    imageUrl?: string;
    youtubeUrl?: string;
    media?: string;
  }
  interface IProps {
    isDB: boolean;
  }
export default function Settings({ isDB }: IProps) {
  const [, setParams] = useQueryString();
  const front = React.useRef(null);

  const [settingsState, setstate] = React.useState({
    brandColor: '#3C3C3C',
    customBg: '',
    imageUrl: '',
    youtubeUrl: '',
    media: 'image',
  });

  const { store, dispatch } = React.useContext(StoreContext);

  React.useEffect(() => {
    if (store?.campaigns && isDB) {
      const arr:any = store.campaigns.filter((item:any) => item.id === store.singleEditCampaignId);
      const {
        settings: {
          brandColor, customBg, imageUrl, youtubeUrl, media,
        },
      } = arr[0];
      setstate({
        brandColor, customBg, imageUrl, youtubeUrl, media,
      });
      // console.log("🚀 ~ file: Settings.tsx ~ settingsState", settingsState);
    }
  }, []);
  // React.useEffect(() => {
  //   if(values.imageUrl){

  //   }
  // },[values.imageUrl]

  const onButtonClick = (ref:any) => {
    // `current` points to the mounted text input element
    ref.current.click();
  };
  // const [addSet, { data, loading, error }] = useMutation<IStore>(UPDATE_CAMPAIGN);
  const [updateStore] = useMutation<IStore>(UPDATE_STORE);
  // if (error) return `Submission error! ${error.message}`;
  // console.log(store);
  const validationSchema = yup.object({
    brandColor: yup
      .string()
      .required('Brand Color is required.'),
  });
  const {
    handleSubmit, values, handleChange, touched, errors, setFieldValue,
  }: FormikProps<IValues> = useFormik<IValues>({
    initialValues: settingsState,
    validationSchema,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (valz, { validateForm }:FormikHelpers<IValues>) => {
      if (validateForm) validateForm(valz);
      // console.log('🚀 ~ file: Settings.tsx ~ line 67 ~ onSubmit: ~ valz', valz);
      const {
        brandColor, customBg, imageUrl, youtubeUrl, media,
      } = valz;
      // const campID = store.newCampaign?.id;

      // const campSettings:null | any = await addSet({
      //   variables: {
      //     updateCampaignInput: {
      //       storeId: store.id,
      //       id: campID,
      //       settings: {
      //         brandColor,
      //         customBg,
      //         imageUrl,
      //         youtubeUrl,
      //         media,
      //       },
      //       // installationStep: isDB ? null : 5,
      //     },
      //   },
      // });
      // const updatedCampaigns = store?.campaigns?.map((item:any) => {
      //   if (item.id === campSettings.id) {
      //     return campSettings;
      //   }
      //   return item;
      // });
      // dispatch({ type: 'UPDATE_CAMPAIGN', payload: { campaigns: updatedCampaigns } });

      // update store. progress installationStep if its onboarding
      await updateStore({
        variables: {
          updateStoreInput: {
            id: store.id,
            settings: {
              general: {
                brandColor,
                customBg,
                imageUrl,
                youtubeUrl,
                media,
              },
              layout: {
                bannerProductPage: true,
                bannerCartPage: true,
                bannerStyle: '0',
                bannerDesign: '001',
                bannerCustomColor: '',
                callToActionText: '1',
                bannerSummaryPage: 'Both',
              },
              marketing: {
                recoverAbandoned: true,
                WhatsAppnotifications: true,
                facebookPixels: '',
                tiktokPixels: '',
                googlePixels: '',
                snapchatPixels: '',
              },
            },
            installationStep: 5,
          },
        },
      });
      dispatch({ type: 'UPDATE_STORE', payload: valz });
      setParams({ ins: 5 });
    },
  });

  const handleCustomBg = (field: string, value: string) => {
    // empty other bg and keep only one
    if (field === 'customBg') {
      setFieldValue('imageUrl', '');
      setFieldValue('youtubeUrl', '');
    } else {
      setFieldValue('customBg', '');
    }
    setFieldValue(field, value);
  };
  const { getKeyFromS3URL } = useUtilityFunction();

  const radios = [
    // { name: 'solid', value: 'solid', component: <GradiantBox color={values.customColor} className={styles.ob_settings__thumbnail} type="circle" /> },
    { name: 'image1', value: 'image1', component: <img src={Image1.src} alt="imageone" /> },
    { name: 'image2', value: 'image2', component: <img src={Image2.src} alt="imageone" /> },
    { name: 'image3', value: 'image3', component: <img src={Image3.src} alt="imageone" /> },
    { name: 'image4', value: 'image4', component: <img src={Image4.src} alt="imageone" /> },
    { name: 'image5', value: 'image5', component: <img src={Image5.src} alt="imageone" /> },
  ];
  console.log({ values });

  return (

    <Form noValidate onSubmit={handleSubmit} className="mx-4">
      <Row><h4>Set your brand color</h4></Row>
      <Row>
        <Form.Text className={styles.ob_settings_detail}>You’ll want a color that stands out on a white background</Form.Text>
      </Row>
      <Row className="mt-2">
        <Col lg={12}>
          <Form.Group className="d-flex ">
            <span className={styles.ob_settings__brandcolor}>
              <Form.Label htmlFor="brandColor" className="m-0 py-1 px-3 pe-5">Click to pick</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setFieldValue('brandColor', e.currentTarget.value);
                }}
                type="color"
                  // id="brandColor"
                name="brandColor"
                id="brandColor"
                isInvalid={touched.brandColor && !!errors.brandColor}
                // defaultValue={values.brandColor}
                title="Choose your color"
                className="p-0 m-0 rounded-end"
                bsPrefix="onboarding"
                value={values.brandColor}
              />
            </span>
            {' '}
            <Form.Control.Feedback type="invalid">
              {errors.brandColor}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-4"><h4>Select a banner background</h4></Row>
      <Row>
        <Col>
          <Form.Text className={styles.ob_settings_detail}>This will serve as the banner for your Groupshop page </Form.Text>
        </Col>
      </Row>
      <Row className=" border rounded px-1 py-3 my-1 mx-1 mt-2">
        {/* <Col md={6}>
          <div className={styles.ob_settings_preSet}>Pre-Set Themes</div>
          <ButtonGroup className={["mb-2 d-block mx-0 p-0", styles.ob_settings__group].join(' ')}>
            {radios.map(({ name, component, value }) => (
              <ToggleButton
                key={name}
                id={`radio-${name}`}
                type="radio"
                variant="none"
                name="radio"
                value={value}
                checked={values.customBg === value}
                onChange={(e) => {
                  handleCustomBg('customBg', e.currentTarget.value);
                }}
                bsPrefix={styles.ob_settings_hide}
                className={styles.ob_settings__radio}
              >
                {component}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Col> */ }
        <Col md={12} className={styles.vertical}>
          <Row>
            <div className={styles.ob_settings_preSet}>
              Custom background
              <span className={styles.badge}>Recommended</span>
            </div>

          </Row>
          <Row>
            <Col lg={12} className="align-middle mt-2">
              <Form.Check
                inline
                label="Image"
                name="media"
                value="image"
                type="radio"
                checked={values.media === 'image'}
                onChange={(e) => {
                  handleCustomBg('media', e.currentTarget.value);
                }}
              />
              <Form.Check
                inline
                label="Youtube video"
                name="media"
                value="youtube"
                type="radio"
                checked={values.media === 'youtube'}
                onChange={(e) => {
                  handleCustomBg('media', e.currentTarget.value);
                }}
              />

            </Col>
          </Row>
          <Row className="">
            <Col className={values.media === 'image' ? 'd-flex' : 'd-none'}>
              <UploadButton
                icon={(<WhiteButton>Upload</WhiteButton>)}
                setFieldValue={setFieldValue}
                field="imageUrl"
                className={styles.ob_settings__uploadbtn}
                handleCustomBg={handleCustomBg}
                url={getKeyFromS3URL(values.imageUrl)}
              />
            </Col>
            <Col className={values.media === 'youtube' ? 'd-block' : 'd-none'}>
              <Form.Control
                type="text"
                name="youtubeUrl"
                value={values.youtubeUrl}
                isValid={touched.youtubeUrl && !errors.youtubeUrl}
                onChange={(e) => {
                  handleCustomBg('youtubeUrl', e.currentTarget.value);
                }}
              />
              <p className="text-muted">Please paste youtube video URL</p>
            </Col>
            <Row className={values.media === 'image' ? 'd-flex' : 'd-none'}>
              <Col className="text-muted align-right text-end">
                <div className={styles.smallt}> Under 3MB (Formats: PNG, JPG, JPEG)</div>
                <div className={styles.smallt}> 1440px x 500px</div>
              </Col>
            </Row>
          </Row>
        </Col>
      </Row>
      <Row />
      {!isDB
        && (
        <Row className="mt-5">
          <Col xs={4}>
            <Button onClick={() => setParams({ ins: 3 })}>Previous</Button>
          </Col>
          <Col xs={4} className="text-center d-flex align-items-center justify-content-center">
            <span className="text-muted">4/4</span>
          </Col>
          <Col xs={4} className="d-flex justify-content-end">
            <Button type="submit"> Publish </Button>
            {/* onClick={() => setParams({ ins: 3 })} */}
          </Col>
          {/* <Col xs={3} md={4}>&nbsp; </Col> */}
        </Row>
        )}

    </Form>

  );
}