import React from 'react';
import styles from 'styles/RBButton.module.scss';

export interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  // type?: ButtonHTMLAttributes<HTMLButtonElement>.type;
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
   // eslint-disable-next-line no-unused-vars
   onChange?: (arg0: any) => void;
  }

/**
 * Primary UI component for user interaction
 */
const RBButton = ({
  // primary = false,
  // size = 'medium',
  // type = 'button',
  children,
  onClick,
  onChange,
  ...props
}: ButtonProps) => (
  <button
      // variant="outline-primary"
    className={styles.rb__button}
      // eslint-disable-next-line react/button-has-type
    type="button"
      // type="button"
      // className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
      // style={{ backgroundColor }}
    {...props}
    onClick={onClick}
    onChange={onChange}
  >
    <span>
      <span>
        {children}
      </span>
    </span>
  </button>
);

RBButton.defaultProps = {
  primary: false,
  // backgroundColor: '',
  // size: 'small',
  onClick: null,
  // type: 'button',
};

export default RBButton;
