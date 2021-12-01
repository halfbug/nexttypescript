import * as React from 'react';
import {
  Form, Row, Col, InputGroup, ButtonGroup, ToggleButton,
} from 'react-bootstrap';
import Button from 'components/Buttons/Button/Button';
import useQueryString from 'hooks/useQueryString';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { StoreContext } from 'store/store.context';
import { UPDATE_STORE } from 'store/store.graphql';
import { IStore } from 'types/store';
import styles from 'styles/Step4.module.scss';
import Image1 from 'assets/images/image1.png';
import Image2 from 'assets/images/image2.png';
import Image3 from 'assets/images/image3.png';
import custombg from 'assets/images/Rectangle499.png';
import uploadbtn from 'assets/images/Rectangle500.png';
import { Plus } from 'react-bootstrap-icons';
import ColorPicker from 'components/Buttons/ColorPicker';
import GradiantBox from 'components/Buttons/gradiantBox';
import UploadButton from 'components/Buttons/UploadBtn';

interface IValues {
    brandColor: string;
    customColor: string;
    customBg: string;
    imageUrl: string;
    youtubeUrl: string;
    media: string;
  }

export default function Settings() {
  const [, setParams] = useQueryString();
  const front = React.useRef(null);
  const [color, setColor] = React.useState('#aabbcc');

  const onButtonClick = (ref:any) => {
    // `current` points to the mounted text input element
    ref.current.click();
  };
  const [addSet, { data, loading, error }] = useMutation<IStore>(UPDATE_STORE);
  // if (error) return `Submission error! ${error.message}`;
  const { store, dispatch } = React.useContext(StoreContext);

  const validationSchema = yup.object({
    brandColor: yup
      .string()
      .required('Brand Color is required.'),
  });
  const {
    handleSubmit, values, handleChange, touched, errors, setFieldValue,
  }: FormikProps<IValues> = useFormik<IValues>({
    initialValues: {
      brandColor: '',
      customColor: '#FFF199',
      customBg: '',
      imageUrl: '',
      youtubeUrl: '',
      media: 'image',
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (valz, { validateForm }:FormikHelpers<IValues>) => {
      if (validateForm) validateForm(valz);
      console.log('🚀 ~ file: Settings.tsx ~ line 67 ~ onSubmit: ~ valz', valz);
      const {
        brandColor, customColor, customBg, imageUrl, youtubeUrl,
      } = valz;

      await addSet({
        variables: {
          updateStoreInput: {
            id: store.id,
            settings: {
              brandColor,
              customColor,
              customBg,
              imageUrl,
              youtubeUrl,
            },
            installationStep: 5,
          },
        },
      });
      dispatch({ type: 'UPDATE_STORE_SETTINGS', payload: { settings: valz } });
      setParams({ ins: 5 });
      console.log('SETTINGS VALZ', valz);
      // setTimeout(() => resetForm(), 5000);
    },
  });
  const radios = [
    { name: 'solid', value: 'solid', component: <GradiantBox color={values.customColor} className={styles.ob_settings__thumbnail} type="circle" /> },
    { name: 'image1', value: 'image1', component: <img src={Image1.src} alt="imageone" /> },
    { name: 'image2', value: 'image2', component: <img src={Image2.src} alt="imageone" /> },
    { name: 'image3', value: 'image3', component: <img src={Image3.src} alt="imageone" /> },
  ];
  console.log('🚀 ~ file: Settings.tsx ~ line 87 ~ Settings ~ values', values);
  return (
    <Col className="text-sm-start" md={8}>
      <Form noValidate onSubmit={handleSubmit}>
        <Row><h5>Set your brand color</h5></Row>
        <Row>
          <Form.Text className="text-muted mt-0 fs-6">You’ll want a color that stands out on a white background</Form.Text>
        </Row>
        <Row className="mt-3">
          <Col xs={12}>
            <Form.Group className="d-flex ">
              <span className={styles.ob_settings__brandcolor}>
                <Form.Label htmlFor="brandColor" className="m-0 py-1 px-3 pe-5">Click to pick</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  type="color"
                  // id="brandColor"
                  name="brandColor"
                  defaultValue="#3C3C3C"
                  title="Choose your color"
                  className="p-0 m-0 rounded-end"
                  bsPrefix="onboarding"
                />
              </span>
              {' '}
              <Form.Control.Feedback type="invalid">
                {errors.brandColor}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-4"><h5>Select a banner background</h5></Row>
        <Row>
          <Form.Text className="text-muted mt-0 fs-6">This will serve as the banner for your Groupshop page </Form.Text>
        </Row>
        <div className="border rounded w-75 p-3">
          <Row className="mt-3">
            <Col xs={12} className="d-flex">
              <ColorPicker
                name="customColorPicker"
                className={styles.ob_settings__bannercolor}
                setFieldValue={setFieldValue}
              />

              <ButtonGroup className={['mb-2', styles.ob_settings__group].join(' ')}>
                {radios.map(({ name, component, value }) => (
                  <ToggleButton
                    key={name}
                    id={`radio-${name}`}
                    type="radio"
                    variant="none"
                    name="radio"
                    value={value}
                    checked={values.customBg === value}
                    onChange={(e) => setFieldValue('customBg', e.currentTarget.value)}
                    bsPrefix={styles.ob_settings_hide}
                    className={styles.ob_settings__radio}
                  >
                    {component}
                  </ToggleButton>
                ))}
              </ButtonGroup>

            </Col>
          </Row>
          <Row className="mt-2"><h6>Custom background</h6></Row>
          <Row>
            <Col xs={4} className="align-middle">
              <Form.Check
                label="Image"
                name="media"
                value="image"
                type="radio"
                checked={values.media === 'image'}
                onChange={(e) => setFieldValue('media', e.currentTarget.value)}
              />
              <Form.Check
                label="Youtube video"
                name="media"
                value="youtube"
                type="radio"
                checked={values.media === 'youtube'}
                onChange={(e) => setFieldValue('media', e.currentTarget.value)}
              />

            </Col>
            <Col xs={8} className={values.media === 'image' ? 'd-flex' : 'd-none'}>
              <Col className={[`${styles.imgbox}`, 'align-middle'].join(' ')}>
                <UploadButton
                  icon={(
                    <>
                      <Plus className="align-self-center" />
                      <Form.Label>Upload Image</Form.Label>
                    </>
)}
                  setFieldValue={setFieldValue}
                  field="imageUrl"
                  className={styles.ob_settings__uploadbtn}
                />
              </Col>
              <Col className="text-muted align-middle">
                Under 5mb (PNG, JPG, JPEG)
                <br />
                1440px x 500px
              </Col>
            </Col>
            <Col xs={8} className={values.media === 'youtube' ? 'd-block' : 'd-none'}>
              <Form.Control
                type="text"
                name="youtubeUrl"
                value={values.youtubeUrl}
                onChange={handleChange}
                isValid={touched.youtubeUrl && !errors.youtubeUrl}
              />
              <p className="text-muted">Please paste youtube video URL</p>
            </Col>
          </Row>
        </div>
        <Row />
        <Row className="mt-5">
          <Col xs={4}>
            <Button onClick={() => setParams({ ins: 3 })}>Previous</Button>
          </Col>
          <Col xs={4} className="text-center">
            <span className="text-muted">4/4</span>
          </Col>
          <Col xs={4} className="d-flex justify-content-end">
            <Button type="submit"> Publish </Button>
            {/* onClick={() => setParams({ ins: 3 })} */}
          </Col>
          {/* <Col xs={3} md={4}>&nbsp; </Col> */}
        </Row>

      </Form>
    </Col>
  );
}
