import React from 'react';
import { ProgressBar } from 'react-bootstrap';

const GradientProgressBar = ({ progress }: any) => (
  <div>
    <style type="text/css">
      {`
            .bg-custom {
                background: linear-gradient(270deg, #FEE750 0%, #F4DEC4 45.31%, #CCB2F9 94.79%, #CCB2F9 100%) !important;
                border-radius: 7px;
            }
            .progress {
                height: 11px;
                margin: 0 15px;
            }
        `}
    </style>
    <ProgressBar now={progress} variant="custom" />
  </div>
);

export default GradientProgressBar;
