import React from 'react';
import { Row, Button, ButtonGroup } from 'react-bootstrap';
import styles from 'styles/Step3.module.scss';

interface IButtonProps {
  text: string,
  cssName: string
}

const MyButton = ({ text, cssName }: IButtonProps) => (
  <Button variant="light" className={styles[cssName]} size="sm">{text}</Button>
);

export default MyButton;
