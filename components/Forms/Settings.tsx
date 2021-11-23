import * as React from 'react';
import {
  Form, Row, Col, InputGroup,
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
import bannerbg from 'assets/images/image10.png';
import custombg from 'assets/images/Rectangle499.png';
import uploadbtn from 'assets/images/Rectangle500.png';
import { Eyedropper } from 'react-bootstrap-icons';

interface IValues {
    brandName: string;
    industry: string;
    logoImage: string;
    // setFieldValue: ()=>void;
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
    brandName: yup
      .string()
      .required('Brand Name is required.')
      .min(5, 'Too Short please give least five characters')
      .max(20, 'Too Long !! only 20 characters allowed.'),

  });
  const {
    handleSubmit, values, handleChange, touched, errors, setFieldValue,
  }: FormikProps<IValues> = useFormik<IValues>({
    initialValues: {
      brandName: '',
      industry: '',
      logoImage: '',
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (valz, { validateForm }:FormikHelpers<IValues>) => {
      if (validateForm) validateForm(valz);
      const { brandName, industry, logoImage } = valz;

      // await addSet({
      //   variables: {
      //     updateStoreInput: {
      //       id: store.id,
      //       shop: store.shop,
      //       brandName,
      //       industry,
      //       logoImage,
      //       installationStep: 2,
      //     },
      //   },
      // });
      // dispatch({ type: 'UPDATE_STORE', payload: valz });
      setParams({ ins: 2 });
      // console.log(valz);
      // setTimeout(() => resetForm(), 5000);
    },
  });
  return (
    <Col className="text-sm-start" md={8}>
      <Form noValidate onSubmit={handleSubmit}>
        <Row><h5>Set your brand color</h5></Row>
        <Row>
          <Form.Text className="text-muted mt-0">You’ll want a color that stands out on a white background</Form.Text>
        </Row>
        <Row className="mt-3">
          <Col xs={12}>
            <Form.Group className="form-inline" controlId="brandNamevalidation">
              <Form.Label htmlFor="exampleColorInput"><span className={[`${styles.input_click}`, 'py-2', 'px-2', 'text-left'].join(' ')}>Click to pick</span></Form.Label>
              <Form.Control
                // className={styles.display}
                type="color"
                id="exampleColorInput"
                name="colorPicker"
                defaultValue="#000000"
                title="Choose your color"
              />
              {' '}
              <Form.Control.Feedback type="invalid">
                {errors.brandName}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-4"><h5>Select a banner background</h5></Row>
        <Row>
          <Form.Text className="text-muted mt-0">This will serve as the banner for your Groupshop page </Form.Text>
        </Row>
        <div className="border w-75 p-3">
          <Row className="mt-3">
            <Col xs={12}>
              <Form.Group className={styles.display} controlId="brandNamevalidation" onClick={() => onButtonClick(front)}>
                {/* <span className={[`${styles.custom_text}`, 'text-left', 'p-0'].join(' ')}> */}
                <Form.Control
                  className="d-none"
                  type="color"
                  id="customBgColor"
                  name="customBgColor"
                  defaultValue="#000000"
                  title="Choose your color"
                  ref={front}
                />
                <span className={styles.imgbox}>
                  <img src={custombg.src} alt="cc" />
                  <div className={styles.centered}>
                    <Eyedropper />
                    Custom color
                  </div>
                </span>
              </Form.Group>
              <Form.Group className={styles.display} controlId="bgBanner">
                <img src={bannerbg.src} alt="cc" />
                <Form.Control.Feedback type="invalid">
                  {errors.brandName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-2"><h6>Custom background</h6></Row>
          <Row>
            <Col className="align-middle">
              <Form.Check
                label="Image"
                name="group1"
                type="radio"
                id="cusimage"
              />
              <Form.Check
                label="Youtube video"
                name="group1"
                type="radio"
                id="youtube"
              />

            </Col>
            <Col className={[`${styles.imgbox}`, 'align-middle'].join(' ')}>
              <img src={uploadbtn.src} alt="btn" />
              <div className={styles.centered}>
                +
                <br />
                Upload
              </div>
            </Col>
            <Col className="text-muted align-middle">
              Under 5mb (PNG, JPG, JPEG)
              <br />
              1440px x 500px
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
            <Button type="submit"> Next </Button>
            {/* onClick={() => setParams({ ins: 3 })} */}
          </Col>
          {/* <Col xs={3} md={4}>&nbsp; </Col> */}
        </Row>

      </Form>
    </Col>
  );
}
