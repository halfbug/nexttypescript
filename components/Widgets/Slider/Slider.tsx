// import * as React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import styles from 'styles/Billing.module.scss';
import { StoreContext } from 'store/store.context';
import { useQuery } from '@apollo/client';
import { GET_STORE_DETAILS } from 'store/store.graphql';
import useUtilityFunction from 'hooks/useUtilityFunction';

export default function Slider() {
  const [value, setValue] = useState(0);
  const { store } = React.useContext(StoreContext);
  const [plan, setPlan] = useState(undefined);
  const [planIndex, setPlanIndex] = useState(0);
  // console.log({ store });
  const { findIndexInArray } = useUtilityFunction();
  const {
    data, refetch,
  } = useQuery(GET_STORE_DETAILS, {
    variables: { id: store.id },
  });

  useEffect(() => {
    refetch();
  }, []);

  const sliderDisplayCSS = [
    { text: 'Explore', display: styles.billing_first_tier, noDisplay: styles.billing_no_display },
    { text: 'Launch', display: styles.billing_second_tier, noDisplay: styles.billing_no_display },
    { text: 'Growth', display: styles.billing_third_tier, noDisplay: styles.billing_no_display },
    { text: 'Unicorn', display: styles.billing_fourth_tier, noDisplay: styles.billing_no_display },
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
      {/* <Row className="mt-4 mx-0 p-0">
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
      </Row> */}

      <div className={styles.billing}>
        <Row className="d-flex align-items-center">
          <Col lg={10} md={12} className="px-0">
            <div className={styles.billing__sliderWrapper}>
              <div className={styles.billing__slider}>
                <Form.Control
                  type="range"
                  min="1"
                  max="100"
                  defaultValue={30}
                  className={styles.billing__customSliderWrapper__customSlider}
                  id="myRange"
                />
              </div>
              <div className={styles.billing__tiles}>
                {sliderDisplayCSS.map((slider, index) => (
                  <div className={styles.billing__tierWrapper__tier}>
                    {/* {(index <= planIndex) ? ( */}
                    <div className={slider.display}>
                      <span>
                        {slider.text}
                      </span>
                    </div>
                    {/* ) : ''} */}

                  </div>
                ))}
              </div>
            </div>
          </Col>
          <Col lg={2} md={12}>
            <div className={styles.billing__customSliderWrapper__cost}>
              $296/mo
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
