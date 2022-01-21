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

interface IValues {
    brandColor: string;
    customColor: string;
    customBg: string;
    imageUrl: string;
    youtubeUrl: string;
    media: string;
  }
  interface IProps {
    handleChange: any;
    values: any;
    setFieldValue: any;
    touched: any;
    errors: any;
  }
export default function DBSettings({
  handleChange, values, setFieldValue, touched, errors,
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
  // console.log('🚀 ~ file: Settings.tsx ~ line 87 ~ Settings ~ values', values);
  return (
    <Container fluid>
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
                onChange={(e) => {
                  handleChange(e);
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
      <Row className="border rounded p-4">
        <Col xs={6} className="w-75">
          <h6>Pre-Set Themes</h6>
          <Row>
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
                  onChange={(e) => {
                    setFieldValue('customBg', e.currentTarget.value);
                  }}
                  bsPrefix={styles.ob_settings_hide}
                  className={styles.ob_settings__radio}
                >
                  {component}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </Row>
        </Col>
        <Col xs={6}>
          <Row className="mt-2"><h6>Custom background</h6></Row>
          <Row>
            <Col xs={12} className="align-middle mt-2">
              <Form.Check
                inline
                label="Image"
                name="media"
                value="image"
                type="radio"
                checked={values.media === 'image'}
                onChange={(e) => {
                  setFieldValue('media', e.currentTarget.value);
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
                  setFieldValue('media', e.currentTarget.value);
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
              />
            </Col>
            <Col className={values.media === 'youtube' ? 'd-block' : 'd-none'}>
              <Form.Control
                type="text"
                name="youtubeUrl"
                value={values.youtubeUrl}
                isValid={touched.youtubeUrl && !errors.youtubeUrl}
                onChange={(e) => {
                  setFieldValue('youtubeUrl', e.currentTarget.value);
                }}
              />
              <p className="text-muted">Please paste youtube video URL</p>
            </Col>
          </Row>
          <Row>
            <Col className="text-muted align-right text-end">
              Under 5mb (PNG, JPG, JPEG)
              <br />
              1440px x 500px
            </Col>
          </Row>

        </Col>
      </Row>
      <Row />
    </Container>
  );
}
