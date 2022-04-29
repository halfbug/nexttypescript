/* eslint-disable no-unused-vars */
import React from 'react';
import styles from 'styles/Groupshop.module.scss';
import { Send } from 'react-bootstrap-icons';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';

export type PopoverButtonProps ={
  popContent?: React.ReactNode | undefined;
  placement?: 'auto-start' | 'auto' | 'auto-end' | 'top-start' | 'top' | 'top-end' | 'right-start' | 'right' | 'right-end' | 'bottom-end' | 'bottom' | 'bottom-start' | 'left-end' | 'left' | 'left-start';
  className?: string;
  // displayIcon?: boolean;
  icon?: React.ReactNode | undefined;
  label?: string | undefined;
} & React.ComponentPropsWithoutRef<'button'>

const Popcomp = (content: React.ReactNode) => (
  <Popover id="popover-basic">
    {/* <Popover.Header as="h3">Popover right</Popover.Header> */}
    <Popover.Body>
      {content}
      {/* <CopyToClipboacrd value={copyValue} /> */}
    </Popover.Body>
  </Popover>
);

const PopoverButton = ({
  label, popContent, className, icon, placement, disabled, onClick,
}: PopoverButtonProps) => (
  <OverlayTrigger
    trigger="click"
    // delay={{ show: 250, hide: 400 }}
    rootClose
    placement={placement ?? 'bottom'}
    overlay={Popcomp(popContent)}
  >
    <Button variant="outline-primary" disabled={disabled} className={className} onClick={onClick}>
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
};

export default PopoverButton;
