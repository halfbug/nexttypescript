import * as React from 'react';
import {
  Form, Row, Col,
} from 'react-bootstrap';
import Button from 'components/Buttons/Button/Button';
import useQueryString from 'hooks/useQueryString';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { StoreContext } from 'store/store.context';
import { useMutation } from '@apollo/client';
import { IStore } from 'types/store';
import { UPDATE_STORE } from 'store/store.graphql';

interface IValues {
  rewards: string;
}

export default function Rewards() {
  const [, setParams] = useQueryString();
  const [addReward, { data, loading, error }] = useMutation<IStore>(UPDATE_STORE);
  // if (error) return `Submission error! ${error.message}`;
  const { store, dispatch } = React.useContext(StoreContext);

  const validationSchema = yup.object({
    rewards: yup
      .string()
      .required('required.'),

  });

  const {
    handleSubmit, values, handleChange, touched, errors, setFieldValue,
  }: FormikProps<IValues> = useFormik<IValues>({
    initialValues: {
      rewards: '',
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (valz, { validateForm }:FormikHelpers<IValues>) => {
      if (validateForm) validateForm(valz);
      const { rewards } = valz;
      console.log(valz);

      await addReward({
        variables: {
          updateStoreInput: {
            id: store.id,
            rewards,
            installationStep: 4,
          },
        },
      });
      dispatch({ type: 'UPDATE_STORE_REWARDS', payload: valz });
      setParams({ ins: 4 });
    },
  });

  return (
    <Col className="text-sm-start" md={8}>

      <Form noValidate onSubmit={handleSubmit}>
        <Row className="mt-3"><h4>Adjust your target sales volume</h4></Row>
        <Row className="text-muted"><h6>Choose one of our recommended options. You can adjust them later on in the Settings page.</h6></Row>
        <Row className="mt-2">
          <Col>
            <Form.Check
              inline
              label="Reward1"
              onChange={handleChange}
              type="radio"
              name="rewards"
              isInvalid={touched.rewards && !!errors.rewards}
              value="reward-1"
            />

          </Col>
          <Col>
            <Form.Check
              inline
              label="Reward1"
              onChange={handleChange}
              type="radio"
              name="rewards"
              isInvalid={touched.rewards && !!errors.rewards}
              value="reward-2"
            />

          </Col>
          <Col>
            <Form.Check
              inline
              label="Reward1"
              onChange={handleChange}
              type="radio"
              name="rewards"
              isInvalid={touched.rewards && !!errors.rewards}
              value="reward-3"
            />

          </Col>
        </Row>
        <Row className="mt-5">
          <Col xs={4}>
            <Button onClick={() => setParams({ ins: 2 })}>Previous</Button>
          </Col>
          <Col xs={4} className="text-center">
            <span className="text-muted">2/4</span>
          </Col>
          <Col xs={4} className="d-flex justify-content-end">
            <Button onClick={() => setParams({ ins: 4 })}> Next </Button>
          </Col>
          {/* <Col xs={3} md={4}>&nbsp; </Col> */}
        </Row>

      </Form>
    </Col>
  );
}
