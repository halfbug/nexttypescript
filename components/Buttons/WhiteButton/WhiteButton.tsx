import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

interface IValues {
    text:string;
    // eslint-disable-next-line react/require-default-props
    onClick?: ()=>void;
}
const WhiteButton = ({
  text, onClick,
}:IValues) => (

  <ButtonGroup className="btn-group-sm">
    <Button
      size="sm"
      variant="light"
    //   style={{ width }}
      className="rounded-3 btn-outline-dark"
      onClick={onClick}
    >
      {text}
      {/* <a href={href} onClick={onClick} ref={ref}>{text}</a> */}
    </Button>
  </ButtonGroup>

);

export default WhiteButton;
