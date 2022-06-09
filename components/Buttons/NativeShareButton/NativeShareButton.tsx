/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import {
  Button,
} from 'react-bootstrap';

type NativeShareButtonProps = {
  shareurl: string;
  label: string;
  icon?: React.ReactNode;

}& React.ComponentPropsWithoutRef<'button'>

const NativeShareButton = ({
  label, className, onClick, shareurl, icon,
}: NativeShareButtonProps) => (
  <Button
    id="mobileBtn"
    variant="outline-primary"
    className={className}
    onClick={() => navigator?.share({
      title: 'Groupshop',
      text: `${label} ${shareurl ?? ''}`,
    })}
  >
    {icon}
    {' '}
    {label}
  </Button>
);

NativeShareButton.defaultProps = {
  icon: '',
};

export default NativeShareButton;
