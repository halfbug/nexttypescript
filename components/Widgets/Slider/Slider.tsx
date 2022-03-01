// import * as React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import styles from 'styles/Billing.module.scss';

interface SliderProps {
    // popContent : React.ReactNode;
    label: string | undefined;
  }

export default function Slider() {
  // return (
  //   <Form.Range value={25}
  //   />
  // );
  const [value, setValue] = useState(0);

  return (
    <>
      <Row>
        {/* <RangeSlider
          min={0}
          max={5000}
          data-slider-handle="square"
        // rangeHighlights = [{ "start": 0, "end": 100, "class": "category1" },
        // { "start": 101, "end": 1000, "class": "category2" },
        // { "start": 1001, "end": 2500 },
        // { "start": 2500, "end": 5000 }]
          value={value}
          onChange={(changeEvent) => setValue(+changeEvent.target.value)}
        /> */}
      </Row>
      <Row className="mt-4 mx-0 p-0">
        <Col>
          <div className={styles.billing_first_tier}><span>Launch</span></div>
        </Col>
        <Col>
          <div className={styles.billing_second_tier}><span>Explore</span></div>
        </Col>
        <Col>
          <div className={styles.billing_third_tier}><span>Growth</span></div>
        </Col>
      </Row>

    </>

  );
}
