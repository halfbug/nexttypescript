/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable dot-notation */
/* eslint-disable quotes */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import {
  Form, Row, Col, ButtonGroup, ToggleButton, Button as MyButton,
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
  selectedTarget: any;
}

export default function Rewards() {
  const [, setParams] = useQueryString();

  const [minDiscount, setMinDiscount] = useState('');
  const [maxDiscount, setMaxDiscount] = useState('');

  const {
    loading: appLodaing, data: { salesTarget } = { salesTarget: [] },
  } = useQuery(GET_SALES_TARGET);

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
    /// initial value display
    if (salesTarget.length > 0) {
      initvalz.rewards = salesTarget[3].id;
      // eslint-disable-next-line prefer-destructuring
      initvalz.selectedTarget = salesTarget[3];
      if (minDiscount === '' && maxDiscount === '') {
        setMinDiscount(salesTarget[3].rewards[0].discount);
        setMaxDiscount(salesTarget[3].rewards[2].discount);
      }
    }
  }, [initvalz]);

  const {
    handleSubmit, values, setFieldValue,
  }: FormikProps<IValues> = useFormik<IValues>({
    initialValues: initvalz,
    validationSchema,
    // enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (valz, { validateForm }: FormikHelpers<IValues>) => {
      if (validateForm) validateForm(valz);
      const { rewards, selectedTarget } = valz;

      if (selectedTarget) {
        delete selectedTarget["__typename"];
        if (selectedTarget.rewards.length) {
          const newR = selectedTarget?.rewards.map((item: any) => {
            const { __typename, ...valWithoutTypename } = item;
            return valWithoutTypename;
          });
          selectedTarget.rewards = [...newR];
        }
      }

      const id = store?.newCampaign?.id;
      if (id) {
        await addReward({
          variables: {
            updateCampaignInput: {
              storeId: store.id,
              id: store?.newCampaign?.id,
              rewards,
              salesTarget: selectedTarget,

            },
          },
        });
      }
      dispatch({ type: 'UPDATE_CAMPAIGN_REWARDS', payload: { rewards: valz } });
      setParams({ ins: 4 });
    },
  });

  useEffect(() => {
    if (values.selectedTarget !== '') {
      setMinDiscount(values.selectedTarget?.rewards[0].discount);
      setMaxDiscount(values.selectedTarget?.rewards[2].discount);
    }
  }, [values.selectedTarget]);

  if (appLodaing) {
    return (
      <section className="text-sm-start">
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
      </section>
    );
  }
  const bars = [45, 77, 102, 125];
  const btns = [
    { text: 'Low', cssName: 'low_btn' },
    { text: 'Average', cssName: 'avg_btn' },
    { text: 'High', cssName: 'high_btn' },
    { text: 'SuperCharged', cssName: 'super_btn' },
  ];
  // const Icon = (idx: number, imgidex: number) => (idx === imgidex ? 'd-block' : 'd-none');

  console.log({ values });

  return (
    <section className={styles.rewards}>

      <Form noValidate onSubmit={handleSubmit} className="mx-4">
        <Row className="mt-5"><Col><h4>Adjust your target sales volume</h4></Col></Row>
        <Row className={styles.rewards_text_lg}>
          <Col className="text-muted">
            Choose one of our recommended options. You can
            {' '}
            <br />
            {' '}
            adjust them later on in the Settings page.
          </Col>
        </Row>
        <Row className="mt-2"><Col><h5>Select your desired sales volume:</h5></Col></Row>
        <Row className={styles.rewards_text_sm}>
          <Col className="text-muted">
            <h6>
              {' '}
              We’ll set your reward tiers based on our
              recommendations..

            </h6>
          </Col>
        </Row>
        <Row className="mt-2 mb-2">
          <Col className="text-start" id="rbtn">

            {salesTarget.map((starget: any, index: number) => (
              <MyButton
                key={starget.id}
                id={starget.id}
                variant="none"
                rounded-pill
                className={index === 0 ? styles.low_btn
                  : index === 1 ? styles.avg_btn
                    : index === 2 ? styles.high_btn
                      : index === 3 ? styles.super_btn : ''}
                onClick={(e) => {
                  const selectedTarget = starget;
                  setFieldValue('rewards', selectedTarget.id);
                  setFieldValue('selectedTarget', { ...selectedTarget });
                }}
              >
                {btns[index].text}

              </MyButton>
            ))}
          </Col>
        </Row>
        <Row className={styles.rewards__box2}>
          <Col lg={6}>
            <h4 className="fs-4">Baseline</h4>
            <div className={styles.rewards__percent_btn}>{minDiscount}</div>

          </Col>
          <Col lg={6}>
            <h4 className="fs-4">Maximum</h4>
            <div className={styles.rewards__percent_btn}>{maxDiscount}</div>
          </Col>

        </Row>

        <Row className="mt-3 ">
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
          <Col xs={4} className="text-center d-flex align-items-center justify-content-center">
            <span className="text-muted">3/4</span>
          </Col>
          <Col xs={4} className="d-flex justify-content-end">
            <Button type="submit"> Next </Button>
          </Col>
        </Row>
      </Form>
    </section>
  );
}
