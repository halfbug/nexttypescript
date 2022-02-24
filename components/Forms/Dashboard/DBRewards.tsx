/* eslint-disable radix */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable dot-notation */
/* eslint-disable quotes */
/* eslint-disable max-len */
import React, {
  useEffect, useState, Dispatch, SetStateAction,
} from 'react';
import {
  Form, Row, Col, ButtonGroup, ToggleButton, Button,
} from 'react-bootstrap';
import useQueryString from 'hooks/useQueryString';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { StoreContext } from 'store/store.context';
import { useQuery } from '@apollo/client';
import styles from 'styles/Campaign.module.scss';
import { GET_SALES_TARGET, UPDATE_CAMPAIGN } from 'store/store.graphql';

interface IValues {
  rewards: string;
  selectedTarget: any;
}
interface IProps {
  handleChange: any;
  values: any;
  setFieldValue: any;
  touched: any;
  errors: any;
  campaignInitial: any;
  editMin: boolean;
  editMax: boolean;
  setEditMin: any;
  setEditMax: any;
  handleForm: any;
  setcampaignInitial: Dispatch<SetStateAction<any>>;
}

export default function DBRewards({
  handleChange, values, setFieldValue, touched, errors, campaignInitial,
  editMax, editMin, setEditMax, setEditMin, handleForm, setcampaignInitial,
}: IProps) {
  const [, setParams] = useQueryString();

  // const [minDiscount, setMinDiscount] = useState('');
  // const [maxDiscount, setMaxDiscount] = useState('');

  const {
    loading: appLodaing, data: { salesTarget } = { salesTarget: [] },
  } = useQuery(GET_SALES_TARGET);

  const { store, dispatch } = React.useContext(StoreContext);

  useEffect(() => {
    /// initial value display
    if (salesTarget.length > 0) {
      setcampaignInitial((prev: any) => {
        console.log({ prev });

        return {
          ...prev,
          name: values.name,
          products: store?.newCampaign?.productsArray || [],
          addableProducts: store?.newCampaign?.addableProductsArray || [],
          criteria: values.criteria,
          brandColor: values.brandColor,
          selectedTarget: values.selectedTarget,
          rewards: values.selectedTarget?.id,
          minDiscountVal: values.selectedTarget?.rewards[0].discount || '',
          maxDiscountVal: values.selectedTarget?.rewards[2].discount || '',
          minDiscount: values.selectedTarget?.rewards[0]?.discount ? parseInt(values.selectedTarget?.rewards[0]?.discount) : 0,
          maxDiscount: values.selectedTarget?.rewards[2]?.discount ? parseInt(values.selectedTarget?.rewards[2]?.discount) : 0,
          isRewardEdit: false,
        };
      });
    }
  }, [values.selectedTarget]);
  useEffect(() => {
    /// initial value display
    if (salesTarget.length > 0) {
      setcampaignInitial((prev: any) => {
        console.log({ prev });
        return {
          ...prev,
          name: values.name,
          products: store?.newCampaign?.productsArray || [],
          addableProducts: store?.newCampaign?.addableProductsArray || [],
          criteria: values.criteria,
          brandColor: values.brandColor,
          rewards: salesTarget[3].id,
          minDiscountVal: salesTarget[3].rewards[0].discount || '',
          maxDiscountVal: salesTarget[3].rewards[0].discount || '',
          selectedTarget: salesTarget[3],
          maxDiscount: salesTarget[3].rewards[2]?.discount ? parseInt(salesTarget[3].rewards[2]?.discount) : 0,
          minDiscount: salesTarget[3].rewards[0]?.discount ? parseInt(salesTarget[3].rewards[0]?.discount) : 0,
        };
      });
    }
  }, [salesTarget]);

  const btns = [
    { text: 'Low', light: styles.low_btn, dark: styles.low_btn_dark },
    { text: 'Average', light: styles.avg_btn, dark: styles.avg_btn_dark },
    { text: 'High', light: styles.high_btn, dark: styles.high_btn_dark },
    { text: 'SuperCharged', light: styles.super_btn, dark: styles.super_btn_dark },
  ];
  // console.log({ values });
  // console.log({ campaignInitial });
  // console.log(",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,");

  // const menuItems = ["Easy", "Medium", "Hard"];
  const [activeButton, setActiveButton] = useState("");
  return (
    <section className={[styles.dbrewards, styles.dbrewards_box].join(' ')}>

      <Row className="mt-1"><Col><h4>Set your rewards</h4></Col></Row>
      <Row className={styles.dbrewards_text_lg}>
        <Col className="text-muted">
          Set the discount and chashback percentages your customers will earn on their order
          as they reach different milestones.
        </Col>
      </Row>
      <Row className="mt-3"><Col><h5>Select your desired sales volume:</h5></Col></Row>
      <Row className={styles.dbrewards_text_lg}>
        <Col className="text-muted">
          We’ll set your reward tiers based on our
          recommendations...
        </Col>
      </Row>
      <Row className="mt-2">
        <Col className="text-start" id="rbtn">

          {salesTarget.map((starget: any, index: number) => (
            <Button
              key={starget.id}
              id={starget.id}
              variant="none"
              className={values?.selectedTarget?.name === starget.name ? btns[index].dark : btns[index].light}
              onClick={(e) => {
                const selectedTarget = starget;
                setFieldValue('rewards', selectedTarget.id);
                setFieldValue('selectedTarget', { ...selectedTarget });
              }}
            >
              {btns[index].text}

            </Button>
          ))}
        </Col>
      </Row>

      <Row className="mt-3">
        <Col sm={6}>
          <h4 className="fs-4">Baseline</h4>
          {!editMin && (
          <>
            <div className={styles.dbrewards__percent_btn}>{values.minDiscountVal}</div>
            <Button variant="link" onClick={() => setEditMin(!editMin)}>edit</Button>
          </>
          )}
          <div className={editMin ? 'd-block' : 'd-none'}>
            <Form.Control
              type="text"
              name="minDiscount"
              value={values.minDiscountVal}
              onChange={(e) => {
                setFieldValue('minDiscountVal', e.currentTarget.value);
                // eslint-disable-next-line radix
                setFieldValue('minDiscount', parseInt(e.currentTarget.value));
              }}
              className={styles.dbrewards_input}
              isInvalid={!!errors.minDiscount}
              placeholder="Enter %"
            />
            <Form.Control.Feedback type="invalid">
              {errors.minDiscount}
            </Form.Control.Feedback>

            <Button
              variant="link"
              onClick={() => {
                setEditMin(false);
                setFieldValue('isRewardEdit', true);
              }}
            >
              save

            </Button>
          </div>

        </Col>
        <Col sm={6}>
          {!editMax && (
          <>
            <h4 className="fs-4">Maximum</h4>
            <div className={styles.dbrewards__percent_btn}>{values.maxDiscountVal}</div>
            <Button variant="link" onClick={() => setEditMax(!editMax)}>edit</Button>
          </>
          )}
          <div className={editMax ? 'd-block' : 'd-none'}>
            <Form.Control
              type="text"
              name="maxDiscount"
              value={values.maxDiscountVal}
              onChange={(e) => {
                setFieldValue('maxDiscountVal', e.currentTarget.value);
                // eslint-disable-next-line radix
                setFieldValue('maxDiscount', parseInt(e.currentTarget.value));
              }}
              className={styles.dbrewards_input}
              isInvalid={!!errors.maxDiscount}
              placeholder="Enter %"
            />
            <Form.Control.Feedback type="invalid">
              {errors.maxDiscount}
            </Form.Control.Feedback>
            <Button
              variant="link"
              onClick={() => {
                setEditMax(false);
                setFieldValue('isRewardEdit', true);
              }}
            >
              save

            </Button>
            {/* <span className={styles.dbrewards_rewardBtn}>save</span> */}
          </div>

        </Col>
      </Row>

      <Row className="mt-3 ">
        <Col>
          💡 Not sure what to set? Use the sales volume picker above and we’ll fill these based on our recommendations.
          {' '}
        </Col>
      </Row>
      <Row className="mt-3">
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
    </section>
  );
}
