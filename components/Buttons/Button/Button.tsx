/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
import React from 'react';
import styles from 'styles/Button.module.scss';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  children: string;
  onClick?: () => void;
}

const Button = ({
  type,
  children,
  onClick,
  className,
  ...props
}: ButtonProps) => (
  <button
    className={[styles.onboarding__button, className].join(' ')}
    {...props}
    onClick={onClick}
    type={type}
  >
    {children}
  </button>
);

Button.defaultProps = {
  primary: false,
  // backgroundColor: '',
  // size: 'small',
  onClick: null,
  // type: 'button',
};

export default Button;
