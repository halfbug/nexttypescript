/* eslint-disable no-param-reassign */
/* eslint-disable dot-notation */
/* eslint-disable quotes */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import {
  Form, Row, Col, ButtonGroup, ToggleButton, Button,
} from 'react-bootstrap';
import useQueryString from 'hooks/useQueryString';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { StoreContext } from 'store/store.context';
import { useMutation, useQuery } from '@apollo/client';
import { ICampaign } from 'types/store';
import styles from 'styles/Campaign.module.scss';
import Placeholder from 'react-bootstrap/Placeholder';
import { GET_SALES_TARGET, UPDATE_CAMPAIGN } from 'store/store.graphql';

interface IValues {
  rewards: string;
  selectedTarget: any;
}

export default function UpdateRewards() {
  const [, setParams] = useQueryString();

  const [minDiscount, setMinDiscount] = useState('');
  const [maxDiscount, setMaxDiscount] = useState('');

  const {
    loading: appLodaing, data: { salesTarget } = { salesTarget: [] },
  } = useQuery(GET_SALES_TARGET);
  const [addReward] = useMutation<ICampaign>(UPDATE_CAMPAIGN);
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
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (valz, { validateForm }: FormikHelpers<IValues>) => {
      if (validateForm) validateForm(valz);
      const { rewards, selectedTarget } = valz;
      console.log("🚀 ~ file: UpdateRewards.tsx ~ line 70 ~ onSubmit: ~ valz", valz);
      selectedTarget.rewards.map((item:any) => (delete item["__typename"]));
      delete selectedTarget["__typename"];
      const campRew:null | any = await addReward({
        variables: {
          updateCampaignInput: {
            storeId: store.id,
            id: store.singleEditCampaignId,
            rewards,
            salesTarget: selectedTarget,
          },
        },
      });
      const updatedCampaigns = store?.campaigns?.map((item:any) => {
        if (item.id === campRew.id) {
          return campRew;
        }
        return item;
      });
      dispatch({ type: 'UPDATE_CAMPAIGN', payload: { campaigns: updatedCampaigns } });
    },
  });
  useEffect(() => {
    if (values.selectedTarget !== '') {
      setMinDiscount(values.selectedTarget?.rewards[0].discount);
      setMaxDiscount(values.selectedTarget?.rewards[2].discount);
    }
  }, [values.selectedTarget]);

  const btns = [
    { text: 'Low', cssName: 'low_btn' },
    { text: 'Average', cssName: 'avg_btn' },
    { text: 'Hign', cssName: 'high_btn' },
    { text: 'SuperCharged', cssName: 'super_btn' },
  ];
  console.log({ values });

  return (
    <section className={[styles.dbrewards, styles.dbrewards_box].join(' ')}>

      <Form noValidate onSubmit={handleSubmit}>
        <Row className="mt-1"><Col><h4>Set your rewards</h4></Col></Row>
        <Row className={styles.dbrewards_text_lg}>
          <Col className="text-muted">
            Set the discount and chashback percentages
            your customers will earn on their order
            as they reach different milestones.
          </Col>
        </Row>
        <Row className="mt-3"><Col><h5>Select your desired sales volume:</h5></Col></Row>
        <Row className={styles.dbrewards_text_lg}>
          <Col className="text-muted">
            We’ll set your reward tiers based on our
            recommendations..
          </Col>
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
                    setFieldValue('selectedTarget', { ...selectedTarget });
                    handleSubmit();
                  }}
                  className={`${styles.dbrewards}__${btns[index].cssName}`}
                  // bsPrefix={styles.rewards_hide}
                //   style={{ width: '66px' }}
                >
                  {btns[index].text}
                  {/* <span className={btns[index].cssName}>
                    <button type="button">{btns[index].text}</button>
                  </span> */}
                </ToggleButton>

              ))}
            </ButtonGroup>
          </Col>
        </Row>

        {/* <Row className={styles.dbrewards__box2}> */}
        <Row>
          <Col sm={6}>
            <h4 className="fs-4">Baseline</h4>
            <div className={styles.dbrewards__percent_btn}>{minDiscount}</div>

          </Col>
          <Col sm={6}>
            <h4 className="fs-4">Maximum</h4>
            <div className={styles.dbrewards__percent_btn}>{maxDiscount}</div>
          </Col>
        </Row>

        <Row className="mt-3 ">
          <Col>
            💡 Not sure what to set? Use the sales volume picker above and we’ll fill these based on our recommendations.
            {' '}
          </Col>
        </Row>
        <Row className="mt-3 ">
          <Col>
            🌟 Be generous – reward your customers the same
            {' '}
            <br />
            way you reward Facebook or Google for finding
            {' '}
            <br />
            you leads. We’ll do the math to make sure you’re
            {' '}
            <br />
            always winning, and so are your customers.
          </Col>
        </Row>

      </Form>
    </section>
  );
}
