/* eslint-disable max-len */
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
import MyButton from 'components/Buttons/MyButton';

interface IValues {
  rewards: string;
  selectedTarget: any;
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

  const initvalz: IValues = {
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
    onSubmit: async (valz, { validateForm }: FormikHelpers<IValues>) => {
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
  const btns = [
    { text: 'Low', cssName: 'low_btn' },
    { text: 'Average', cssName: 'avg_btn' },
    { text: 'Hign', cssName: 'high_btn' },
    { text: 'SuperCharged', cssName: 'super_btn' },
  ];
  const Icon = (idx: number, imgidex: number) => (idx === imgidex ? 'd-block' : 'd-none');

  return (
    <Col className={styles.rewards} md={8}>

      <Form noValidate onSubmit={handleSubmit}>
        <Row className="mt-5"><h4>Adjust your target sales volume</h4></Row>
        <Row className="text-muted">
          <h6>
            Choose one of our recommended options. You can
            {' '}
            <br />
            {' '}
            adjust them later on in the Settings page.
          </h6>
        </Row>
        <Row className="mt-3"><h4>Select your desired sales volume:</h4></Row>
        <Row className="text-muted">
          <h6>
            We’ll set your reward tiers based on our
            {' '}
            <br />
            {' '}
            recommendations..
          </h6>
        </Row>
        <Row className="m-0">
          <Col className="text-start">
            <ButtonGroup>
              {salesTarget.map((starget: any, index: number) => (
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
                  // className={styles.rewards__radio}
                  // bsPrefix={styles.rewards_hide}
                  style={{ width: '66px' }}
                >
                  <MyButton text={btns[index].text} cssName={btns[index].cssName} />
                  {/* <div title={starget.name} className={styles.rewards__bars} style={{ height: bars[index], width: '19.75px' }}>
                    {' '}

                  </div> */}
                </ToggleButton>

              ))}
            </ButtonGroup>
          </Col>
        </Row>
        <Row className={styles.box}>
          <Col sm={6}>
            <h4 className="fs-4">Baseline</h4>
            <div className={styles.percent_btn}>{values.selectedTarget.rogsMin}</div>

          </Col>
          <Col sm={6}>
            <h4 className="fs-4">Maximum</h4>
            <div className={styles.percent_btn}>{values.selectedTarget.rogsMax}</div>
          </Col>

        </Row>

        <Row className="mt-3 w-75">
          <Col>
            🌟 Be generous – reward your customers the same way you reward Facebook or Google
            for finding you leads.
            We’ll do the math to make sure you’re always winning, and so are your customers.
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
