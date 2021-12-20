import React, { useEffect } from 'react';
import {
  Form, Row, Col, ButtonGroup, ToggleButton,
} from 'react-bootstrap';
import Button from 'components/Buttons/Button/Button';
import useQueryString from 'hooks/useQueryString';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { StoreContext } from 'store/store.context';
import { useMutation, useQuery } from '@apollo/client';
import { ICampaign } from 'types/store';
import styles from 'styles/Step3.module.scss';
import Placeholder from 'react-bootstrap/Placeholder';
import { GET_SALES_TARGET, UPDATE_CAMPAIGN } from 'store/store.graphql';

interface IValues {
  rewards: string;
  selectedTarget : any;
}

export default function Rewards() {
  const [, setParams] = useQueryString();
  const {
    loading: appLodaing, data: { salesTarget } = { salesTarget: [] },
  } = useQuery(GET_SALES_TARGET);
  console.log('🚀 ~ file: Rewards.tsx ~ line 22 ~ Rewards ~ appData', salesTarget);
  const [addReward] = useMutation<ICampaign>(UPDATE_CAMPAIGN);
  // if (error) return `Submission error! ${error.message}`;
  const { store, dispatch } = React.useContext(StoreContext);

  const validationSchema = yup.object({
    rewards: yup
      .string()
      .required('required.'),

  });

  const initvalz:IValues = {
    rewards: '',
    selectedTarget: '',
  };

  useEffect(() => {
    if (salesTarget.length > 0) {
      initvalz.rewards = salesTarget[3].id;

      // eslint-disable-next-line prefer-destructuring
      initvalz.selectedTarget = salesTarget[3];
    }
  }, [salesTarget, initvalz]);

  const {
    handleSubmit, values, setFieldValue,
  }: FormikProps<IValues> = useFormik<IValues>({
    initialValues: initvalz,
    validationSchema,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (valz, { validateForm }:FormikHelpers<IValues>) => {
      if (validateForm) validateForm(valz);
      const { rewards } = valz;

      const id = store?.newCampaign?.id;
      if (id) {
        await addReward({
          variables: {
            updateCampaignInput: {
              id,
              rewards,
            },
          },
        });
      }
      dispatch({ type: 'UPDATE_CAMPAIGN', payload: valz });
      setParams({ ins: 4 });
    },
  });
  console.log('🚀 ~ file: Rewards.tsx ~ line 66 ~ Rewards ~ values', values);

  if (appLodaing) {
    return (
      <Col className="text-sm-start" md={8}>
        <Row className="mt-3"><h4>Adjust your target sales volume</h4></Row>
        <Row className="text-muted"><h6>Choose one of our recommended options. You can adjust them later on in the Settings page.</h6></Row>
        <Row className="mt-2">
          <Col>
            <Placeholder animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
          </Col>
          <Col>
            <Placeholder animation="glow">
              <Placeholder xs={6} />
            </Placeholder>

          </Col>
          <Col>
            <Placeholder animation="glow">
              <Placeholder xs={7} />
              <Placeholder xs={4} />
              <Placeholder xs={4} />
              <Placeholder xs={6} />
              <Placeholder xs={8} />
            </Placeholder>

          </Col>

        </Row>
      </Col>
    );
  }
  const bars = [45, 77, 102, 125];
  const Icon = (idx:number, imgidex:number) => (idx === imgidex ? 'd-block' : 'd-none');

  return (
    <Col className={styles.rewards} md={8}>

      <Form noValidate onSubmit={handleSubmit}>
        <Row className="mt-3"><h4>Adjust your target sales volume</h4></Row>
        <Row className="text-muted"><h6>Choose one of our recommended options. You can adjust them later on in the Settings page.</h6></Row>
        <Row className="mt-2">
          <Col className="d-flex flex-row-reverse justify-content-center ">
            <ButtonGroup className={styles.rewards__group}>
              {salesTarget.map((starget: any, index:number) => (
                <ToggleButton
                  key={starget.id}
                  id={starget.id}
                  type="radio"
                  variant="outline"
                  name="salesTarget"
                  value={JSON.stringify(starget)}
                  checked={starget.id === values.rewards}
                  onChange={(e) => {
                    const selectedTarget = JSON.parse(e.currentTarget.value);
                    setFieldValue('rewards', selectedTarget.id);
                    setFieldValue('selectedTarget', { ...selectedTarget, idx: +index });
                  }}
                  className={styles.rewards__radio}
                  bsPrefix={styles.rewards_hide}
                  style={{ width: '22px' }}
                >
                  <div title={starget.name} className={styles.rewards__bars} style={{ height: bars[index], width: '19.75px' }}>
                    {' '}

                  </div>
                </ToggleButton>
              ))}
            </ButtonGroup>
          </Col>
          <Col>
            <Row>
              <Col xs={1} className="d-flex align-items-center">
                <span className={`fs-4 me-2 pt-1 ${Icon(values.selectedTarget.idx, 0)}`}>🐌</span>
                <span className={`fs-4 me-2 ${Icon(values.selectedTarget.idx, 1)}`}>⛅️</span>
                <span className={`fs-4 me-2 ${Icon(values.selectedTarget.idx, 2)}`}>🔥</span>
                <span className={`fs-4 me-2 ${Icon(values.selectedTarget.idx, 3)}`}>🦄</span>
              </Col>
              <Col>
                <h6 className="p-0 m-0">SALES VOLUME</h6>
                <h4 className="fs-bold">{values.selectedTarget.name}</h4>
              </Col>
            </Row>
            <Row>
              <Col className="p-2 m-1 border rounded-3 gradient-box w-75">
                <h6 className="p-0 m-0">ESTIMATED ROGS</h6>
                <h3 className="fs-bold ">
                  {values.selectedTarget.rogsMin}
                  x-
                  {values.selectedTarget.rogsMax}
                  x
                </h3>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row className="p-0 m-1 border rounded-3 shadow-sm">
              <h6 className="mt-2 text-center">CUSTOMER REWARDS</h6>
              { values.selectedTarget?.rewards?.map(({
                customerCount, discount, id,
              }: {
                // eslint-disable-next-line react/no-unused-prop-types
                customerCount: string; discount: string; id: string;
              }) => (
                <Row key={id}>

                  <Col className="p-1">
                    <h5 className="text-center">
                      {customerCount}
                      friends
                    </h5>
                  </Col>
                  <Col className="p-1">
                    <p className="mb-1 text-center shadow-sm">
                      {discount}
                      {' '}
                      OFF
                    </p>
                  </Col>
                </Row>
              ))}
            </Row>
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
            <Button type="submit"> Next </Button>
          </Col>
          {/* <Col xs={3} md={4}>&nbsp; </Col> */}
        </Row>

      </Form>
    </Col>
  );
}
