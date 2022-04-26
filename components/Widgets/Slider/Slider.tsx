// import * as React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import styles from 'styles/Billing.module.scss';
import { StoreContext } from 'store/store.context';
import { useQuery } from '@apollo/client';
import { GET_STORE_DETAILS } from 'store/store.graphql';
import useUtilityFunction from 'hooks/useUtilityFunction';
import { GS_PLAN1_END_COUNT, GS_PLAN2_END_COUNT, GS_PLAN3_END_COUNT } from 'configs/constant';

type SliderProp = {
  nooforder: number;
}
function Slider({ nooforder }: SliderProp) {
  const [value, setValue] = useState(0);
  const { store } = React.useContext(StoreContext);
  const [plan, setPlan] = useState('Explore');
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
  useEffect(() => {
    if (nooforder <= GS_PLAN1_END_COUNT) {
      setPlan('Explore');
    } else if (nooforder > GS_PLAN1_END_COUNT && nooforder <= GS_PLAN2_END_COUNT) {
      setPlan('Launch');
    } else if (nooforder > GS_PLAN2_END_COUNT && nooforder <= GS_PLAN3_END_COUNT) {
      setPlan('Growth');
    } else {
      setPlan('Unicorn');
    }
  }, [nooforder]);
  // console.log({ data });
  // console.log({ plan });
  // console.log({ planIndex });

  return (
    <>
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
                    {/* {(slider.text === plan) ? ( */}
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
// Slider.defaultProps = {
//   nooforder: 0,
// };

export default Slider;
