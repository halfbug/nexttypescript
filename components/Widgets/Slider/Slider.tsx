import * as React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

interface SliderProps {
    // popContent : React.ReactNode;
    // handleClick():any;
    // className?: string;
    // displayIcon?: boolean;
    label: string | undefined;
  }

export default function Slider({ label }: SliderProps) {
  return (
    <Form.Range value={10} />
  );
}
