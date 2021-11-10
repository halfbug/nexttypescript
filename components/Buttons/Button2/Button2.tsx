import React from 'react';
import { Button } from 'react-bootstrap';
import styles from 'styles/Button2.module.scss';

export interface Button2Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: string;
    variant: string;
    onClick?: () => void;
}
const Button2 = ({
  // primary = false,
  // size = 'medium',
  type,
  children,
  variant,
  onClick,
  ...props
}: Button2Props) => (
  <Button
    variant={variant}
    type={type}
    onClick={onClick}
    className={styles.simpleBtn}
    {...props}
  >
    {children}
  </Button>
);
export default Button2;
