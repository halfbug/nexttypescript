/* eslint-disable no-unused-vars */
import React from 'react';
import styles from 'styles/Groupshop.module.scss';
import Navbar from 'react-bootstrap/Navbar';
// import Button from 'components/Buttons/Button/Button';
import {
  Col, Row, Button, Container,
} from 'react-bootstrap';
import { ArrowDown, CaretDown, Eye } from 'react-bootstrap-icons';

interface CounterProps {
  expireDate : Date;
}

const Counter = ({
  expireDate,
}: CounterProps) => (
  <div className={styles.groupshop_counter_top}>
    <p>
      EXPIRES IN
      <span>7D</span>
      {' '}
      :
      <span>22H</span>
      {' '}
      :
      <span>10M</span>

    </p>
  </div>
);

// Counter.defaultProps = {
//   user: {},
// };

export default Counter;
