/* eslint-disable no-unused-vars */
import React from 'react';
import styles from 'styles/Groupshop.module.scss';
import { Send } from 'react-bootstrap-icons';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import IconButton from '../IconButton';
import CopyToClipboard from '../CopyToClipboard/CopyToClipboard';

interface EarnButtonProps {
  popContent : React.ReactNode;
  // handleClick():any;
  className?: string;
  displayIcon?: boolean;
  label: string | undefined;
}

const Popcomp = (content: React.ReactNode) => (
  <Popover id="popover-basic">
    {/* <Popover.Header as="h3">Popover right</Popover.Header> */}
    <Popover.Body>
      {content}
      {/* <CopyToClipboacrd value={copyValue} /> */}
    </Popover.Body>
  </Popover>
);

const EarnButton = ({
  label, popContent, className, displayIcon,
}: EarnButtonProps) => (
  <OverlayTrigger
    trigger="click"
    // delay={{ show: 250, hide: 400 }}
    rootClose
    placement="bottom"
    overlay={Popcomp(popContent)}
  >
    <Button variant="outline-primary" className={[styles.groupshop__earn, className].join(' ')}>
      {' '}
      {displayIcon && <Send className="fs-4" />}
      {' '}
      {label}
    </Button>

  </OverlayTrigger>

);

EarnButton.defaultProps = {
  className: undefined,
  displayIcon: true,
};

export default EarnButton;
