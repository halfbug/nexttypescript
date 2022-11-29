import React, { useEffect } from 'react';
import styles from 'styles/Discovery.module.scss';
import {
  Col, Container, Form, Row, ToggleButton, ToggleButtonGroup,
} from 'react-bootstrap';
import { Check2Circle, XCircle } from 'react-bootstrap-icons';
import styles1 from 'styles/Step3.module.scss';
import Button from 'components/Buttons/Button/Button';
import useQueryString from 'hooks/useQueryString';
import { FormikHelpers, FormikProps, useFormik } from 'formik';
import * as yup from 'yup';
import { StoreContext } from 'store/store.context';
import { useMutation } from '@apollo/client';
import { DISCOVERYTOOLS_UPDATE } from 'store/store.graphql';
import { DiscoveryTools } from 'types/store';

interface BValues {
  status?: string;
}

const initVal: BValues = {
  status: '',
};

const DiscoveryOnBoarding = () => {
  const [, setParams] = useQueryString();

  const { store, dispatch } = React.useContext(StoreContext);

  const [discoveryToolsUpdate] = useMutation<DiscoveryTools>(DISCOVERYTOOLS_UPDATE);

  const validationSchema = yup.object({
    status: yup
      .string()
      .required('Discovery tools is required.'),
  });

  const {
    handleSubmit, values, handleChange, touched, errors, setFieldValue,
  }: FormikProps<BValues> = useFormik<BValues>({
    initialValues: initVal,
    validationSchema,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (valz, { validateForm }: FormikHelpers<BValues>) => {
      if (validateForm) validateForm(valz);
      const {
        status,
      } = valz;
      discoveryToolsUpdate({
        variables: {
          updateDiscoveryTools: {
            id: store?.id,
            discoveryTool: {
              matchingBrandName: [],
              status,
            },
          },
        },
      });
      dispatch({ type: 'UPDATE_DISCOVERYTOOLS', payload: { discoveryTool: { matchingBrandName: [], status } } });
      setParams({ ins: 4 });
    },
  });

  useEffect(() => {
    if (store.id && store.discoveryTool?.status) {
      setFieldValue('status', store.discoveryTool?.status);
    }
  }, [store]);

  return (
    <Form noValidate onSubmit={handleSubmit} className="mx-4">
      <Container fluid>
        <div className={styles.rightcontentwrap}>
          <Row>
            <Col className="">
              <Row className={styles.rightcontentwrap__body}>
                <div className={styles.Discovery}>
                  <Row>
                    <Col lg={12}>
                      <div>
                        <h4>Activate Discovery Tools</h4>
                        <span>
                          When this is on, we’ll feature your products on the Groupshop
                          pages of other
                          <br />
                          {' '}
                          partner brands with
                          similar audience demographics.
                        </span>
                        <Row className="mt-2">

                          <Col xs={12} md={6} className="text-right">
                            <ToggleButtonGroup
                              type="radio"
                              name="status"
                            >
                              <ToggleButton
                                variant="outline-success"
                                className={styles.Discovery_enablebtn}
                                id="joinExisting-e"
                                checked={values.status === 'Active'}
                                onChange={handleChange}
                                value="Active"
                              >
                                <Check2Circle className="fs-4" />
                                {' '}
                                Enable
                              </ToggleButton>
                              <ToggleButton
                                variant="outline-danger"
                                className={styles.Discovery_disablebtn}
                                id="joinExisting-d"
                                checked={values.status === 'InActive'}
                                onChange={handleChange}
                                value="InActive"
                              >
                                <XCircle className="fs-5" />
                                {' '}
                                Disable
                              </ToggleButton>

                            </ToggleButtonGroup>
                          </Col>
                        </Row>
                      </div>
                      <div style={{ color: 'red', marginTop: '10px' }}>
                        {errors.status}
                      </div>
                    </Col>
                  </Row>
                </div>
              </Row>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col xs={4}>
              <Button
                className={styles1.rewards_btn_pre}
                style={{ width: '143px' }}
                onClick={() => setParams({ ins: 3 })}
              >
                Previous
              </Button>
            </Col>
            <Col xs={4} className="text-center d-flex align-items-center justify-content-center">
              <span className="text-muted">4/5</span>
            </Col>
            <Col xs={4} className="d-flex justify-content-end">
              <Button style={{ width: '143px' }} type="submit"> Next </Button>
            </Col>
          </Row>
        </div>
      </Container>
    </Form>
  );
};

export default DiscoveryOnBoarding;
