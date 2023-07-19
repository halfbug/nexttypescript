/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import React from 'react';
import styles from 'styles/Groupshop.module.scss';
import { Send } from 'react-bootstrap-icons';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import MyIcon from 'assets/images/Path.svg';

export type PopoverButtonProps ={
  popContent?: React.ReactNode | undefined;
  placement?: 'auto-start' | 'auto' | 'auto-end' | 'top-start' | 'top' | 'top-end' | 'right-start' | 'right' | 'right-end' | 'bottom-end' | 'bottom' | 'bottom-start' | 'left-end' | 'left' | 'left-start';
  className?: string;
  variant?: string;
  // displayIcon?: boolean;
  icon?: React.ReactNode | undefined;
  label?: string | undefined;
  popoverClassName?: string;
} & React.ComponentPropsWithoutRef<'button'>

const Popcomp = (content: React.ReactNode, className?: string) => (
  <Popover id="popover-basic" className={className}>
    <Popover.Body>
      {/* <MyIcon className={styles.groupshop_popupArrow} /> */}
      {content}
      {/* <CopyToClipboacrd value={copyValue} /> */}
    </Popover.Body>
  </Popover>
);

const PopoverButton = ({
  label, popContent, className, popoverClassName, icon, placement, disabled, onClick, variant,
}: PopoverButtonProps) => (
  <OverlayTrigger
    trigger="click"
    // delay={{ show: 250, hide: 400 }}
    rootClose
    placement={placement ?? 'bottom'}
    overlay={Popcomp(popContent, popoverClassName)}
  >
    <Button variant={variant} disabled={disabled} className={className} onClick={onClick}>
      {' '}
      {icon ?? ''}
      {' '}
      <span className={styles.groupshop__earn__label}>{label}</span>
    </Button>

  </OverlayTrigger>

);

PopoverButton.defaultProps = {
  className: undefined,
  icon: undefined,
  placement: 'auto',
  popContent: undefined,
  label: '',
  popoverClassName: undefined,
  variant: 'outline-primary',
};

export default PopoverButton;
