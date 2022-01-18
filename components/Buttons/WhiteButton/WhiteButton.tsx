import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import styles from 'styles/WhiteButton.module.scss';

// type IValues = {
//   // children: ReactNode;
// } & React.ComponentPropsWithoutRef<'button'>

const WhiteButton = ({
  children, ...rest
}:React.ComponentPropsWithoutRef<'button'>) => (
  <Button
    size="sm"
    variant="light"
    className={['rounded-3', 'btn-outline-dark', 'btn-group-sm', styles.whitebutton].join(' ')}
    {...rest}
  >
    {children}
  </Button>

);
// const WhiteButton.defaultProps = {
//   text: 'click me',
//   type: 'button',
// };

export default WhiteButton;
