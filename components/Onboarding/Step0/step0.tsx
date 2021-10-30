import React from 'react';
import Dialogue from 'components/Layout/Dialogue/dialogue';
// import Button from '../../Buttons/Button/Button';

interface IStep0Props {
  show: boolean,
}

const Step0 = ({ show }:IStep0Props) => {
  console.log('welcome component');
  return (
    <Dialogue show={show}>
      <h1>Welcome Content</h1>
    </Dialogue>
  );
};

export default Step0;
