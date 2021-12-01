/* eslint-disable max-len */
import * as React from 'react';
// import Color from 'color';

export interface IGradiantBoxProps {
    color : string;
    className: string;
    type: string;
}

export default function GradiantBox({ color, className, type }: IGradiantBoxProps) {
  // const setBackground = (bcolor:any, gtype: string) => {
  //   let background:any;
  //   switch (gtype) {
  //     case 'circle':
  //       background = `radial-gradient(ellipse at center, ${Color(bcolor).lighten(0.5)} 0%, ${bcolor} 100%)`;
  //       break;

  //     case 'horizontal':
  //       background = `linear-gradient(to right, ${Color(bcolor).lighten(0.5)} 0%, ${bcolor} 100%)`;
  //       break;

  //     case 'vertical':
  //       background = `linear-gradient(to bottom, ${Color(bcolor).lighten(0.5)} 0%, ${bcolor} 100%)`;
  //       break;

  //     case 'topDigonal':
  //       background = `linear-gradient((135deg, ${Color(bcolor).lighten(0.5)} 0%, ${bcolor} 100%)`;
  //       break;

  //     case 'bottomDigonal':
  //       background = `linear-gradient((45deg, ${Color(bcolor).lighten(0.5)} 0%, ${bcolor} 100%)`;
  //       break;

  //     default:
  //       background = { background: bcolor };
  //   }

  //   return { background, filter: `progid:DXImageTransform.Microsoft.gradient( startColorstr=${Color(bcolor).lighten(0.5)}, endColorstr=${bcolor}, GradientType=1 )` };
  // };

  return (
    <div className={className} style={{ background: color }} />
  );
}
