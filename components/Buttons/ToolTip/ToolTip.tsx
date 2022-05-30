/* eslint-disable no-unused-vars */
import React from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';

export type ToolTipProps ={
  popContent?: React.ReactNode | undefined;
  placement?: 'auto-start' | 'auto' | 'auto-end' | 'top-start' | 'top' | 'top-end' | 'right-start' | 'right' | 'right-end' | 'bottom-end' | 'bottom' | 'bottom-start' | 'left-end' | 'left' | 'left-start';
  className?: string;
  popoverClassName: string;
  // displayIcon?: boolean;
  icon?: React.ReactNode | undefined;
  label?: string | undefined;
} & React.ComponentPropsWithoutRef<'button'>

const Popcomp = (content: React.ReactNode, popoverClassName: string) => (
  <Popover className={popoverClassName} id="popover-basic">
    {/* <Popover.Header as="h3">Popover right</Popover.Header> */}
    <Popover.Body>
      {content}
      {/* <CopyToClipboacrd value={copyValue} /> */}
    </Popover.Body>
  </Popover>
);

const ToolTip = ({
  label, popContent, className, popoverClassName, icon, placement, disabled,
}: ToolTipProps) => (
  <OverlayTrigger
    trigger="click"
    // delay={{ show: 250, hide: 400 }}
    rootClose
    placement={placement ?? 'right'}
    overlay={Popcomp(popContent, popoverClassName)}
  >
    <div className={['d-inline-flex mx-0 px-0', className].join(' ')}>
      {icon ?? ''}
      {label}
    </div>

  </OverlayTrigger>

);

ToolTip.defaultProps = {
  className: undefined,
  popoverClassName: '',
  icon: undefined,
  placement: 'right',
  popContent: undefined,
  label: '',
};

export default ToolTip;
