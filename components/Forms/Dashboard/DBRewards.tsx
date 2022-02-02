/* eslint-disable no-nested-ternary */
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
  initvalz: any;
}

export default function DBRewards({
  handleChange, values, setFieldValue, touched, errors, initvalz,
}: IProps) {
  const [, setParams] = useQueryString();

  const [minDiscount, setMinDiscount] = useState('');
  const [maxDiscount, setMaxDiscount] = useState('');

  const {
    loading: appLodaing, data: { salesTarget } = { salesTarget: [] },
  } = useQuery(GET_SALES_TARGET);

  const { store, dispatch } = React.useContext(StoreContext);

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

  useEffect(() => {
    if (values.selectedTarget !== '') {
      setMinDiscount(values.selectedTarget?.rewards[0].discount);
      setMaxDiscount(values.selectedTarget?.rewards[2].discount);
    }
  }, [values.selectedTarget]);

  const btns = [
    { text: 'Low', cssName: 'low_btn', id: '1' },
    { text: 'Average', cssName: 'avg_btn', id: '2' },
    { text: 'Hign', cssName: 'high_btn', id: '3' },
    { text: 'SuperCharged', cssName: 'super_btn', id: '4' },
  ];

  const btn1 = "low_btn";
  const btn2 = "avg_btn";
  const btn3 = "high_btn";
  const btn4 = "super_btn";

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

            </Button>
          ))}
        </Col>
      </Row>

      <Row className="mt-3">
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
