import React, { useState, useRef } from 'react';
import {
  Overlay, Popover, Button,
} from 'react-bootstrap';
import IconButton from '../IconButton';

export interface IDeleteButtonProps {
    icon: React.ReactNode;
    handleDelete():any;
    message: string;
}

export default function DeleteButton({ icon, handleDelete, message }: IDeleteButtonProps) {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event: any) => {
    setShow(!show);
    setTarget(event.target);
  };

  return (
    <div ref={ref} className="d-inline">
      <IconButton icon={icon} onClick={handleClick} type="button" />

      <Overlay
        show={show}
        target={target}
        placement="right"
        container={ref}
        containerPadding={20}
      >
        <Popover id="popover-contained">
          {/* <Popover.Header as="h3">Popover bottom</Popover.Header> */}
          <Popover.Body>
            <p>{message}</p>
            {' '}
            <div>
              <Button className="me-2 auto-width-button" variant="outline-primary" onClick={() => { handleDelete(); setShow(false); }}>Yes</Button>
              <Button className="auto-width-button" variant="outline-primary" onClick={() => setShow(false)}>No</Button>
            </div>
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
}
