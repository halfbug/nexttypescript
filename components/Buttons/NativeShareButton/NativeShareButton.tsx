/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import {
  Button,
} from 'react-bootstrap';

type NativeShareButtonProps = {
  shareurl: string;
  label: string;
  icon?: React.ReactNode;
  text?: string;

}& React.ComponentPropsWithoutRef<'button'>

const NativeShareButton = ({
  label, className, onClick, shareurl, icon, text,
}: NativeShareButtonProps) => (
  <Button
    id="mobileBtn"
    variant="outline-primary"
    className={className}
    onClick={() => navigator?.share({
      title: 'Groupshop',
      text: `${text} ${shareurl}`,
    })}
  >
    {icon}
    {' '}
    {label}
  </Button>
);

NativeShareButton.defaultProps = {
  icon: '',
  text: '',
};

export default NativeShareButton;
