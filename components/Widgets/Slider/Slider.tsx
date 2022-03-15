// import * as React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import styles from 'styles/Billing.module.scss';
import { StoreContext } from 'store/store.context';
import { useQuery } from '@apollo/client';
import { GET_STORE_DETAILS } from 'store/store.graphql';
import useUtilityFunction from 'hooks/useUtilityFunction';

interface SliderProps {
    // popContent : React.ReactNode;
    label: string | undefined;
  }

export default function Slider() {
  const [value, setValue] = useState(0);
  const { store, dispatch } = React.useContext(StoreContext);
  const [plan, setPlan] = useState(undefined);
  const [planIndex, setPlanIndex] = useState(0);
  // console.log({ store });
  const { findIndexInArray } = useUtilityFunction();
  const {
    loading, error, data, refetch,
  } = useQuery(GET_STORE_DETAILS, {
    variables: { id: store.id },
  });

  useEffect(() => {
    refetch();
  }, []);

  const sliderDisplayCSS = [
    { text: 'EXPLORE', display: styles.billing_second_tier, noDisplay: styles.billing_no_display },
    { text: 'LAUNCH', display: styles.billing_first_tier, noDisplay: styles.billing_no_display },
    { text: 'GROWTH', display: styles.billing_third_tier, noDisplay: styles.billing_no_display },
    { text: 'UNICORN', display: styles.billing_fourth_tier, noDisplay: styles.billing_no_display },
  ];
  useEffect(() => {
    if (data) {
      setPlan(data.store.plan);
      setPlanIndex(findIndexInArray(sliderDisplayCSS, 'text', data.store.plan));
    }
  }, [data]);
  // console.log({ data });
  // console.log({ plan });
  // console.log({ planIndex });

  return (
    <>
      <Row className="mt-4 mx-0 p-0">
        {sliderDisplayCSS.map((slider, index) => (
          <Col className="p-0">
            { (index <= planIndex)
              ? (
                <div className={slider.display}>
                  <span>
                    {slider.text}
                  </span>
                </div>
              ) : ''}
          </Col>
        ))}
      </Row>
    </>

  );
}
