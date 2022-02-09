/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
import React from 'react';
import styles from 'styles/Button.module.scss';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  //  type?: ButtonHTMLAttributes<HTMLButtonElement>.type;
  /**
   * How large should the button be?
   */
  // size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  children: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
const Button = ({
  // primary = false,
  // size = 'medium',
  type,
  children,
  onClick,
  ...props
}: ButtonProps) => (
  <button
    // variant="outline-primary"
    className={styles.onboarding__button}
    // eslint-disable-next-line react/button-has-type
    // type={props.type}
    // type="button"
    // className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
    // style={{ backgroundColor }}
    {...props}
    onClick={onClick}
  >
    <span>
      <span className="fw-bold">
        {children}
      </span>
    </span>
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
