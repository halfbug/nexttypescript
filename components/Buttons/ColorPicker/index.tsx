/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import { Eyedropper } from 'react-bootstrap-icons';

export interface IColorPickerProps {
    className : string;
    setFieldValue(field: string, value: string): any;
    name: string;
}

export default function ColorPicker({ className, setFieldValue }: IColorPickerProps) {
  const [displayColorPicker, setdisplayColorPicker] = useState<boolean>(false);
  const [scolor, setscolor] = useState<string>('#F3F3F3 ');

  const handleClick = () => {
    setdisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setdisplayColorPicker(false);
  };
  const handleColorChange = (color:any) => {
    setscolor(color.hex);
    setFieldValue('customColor', color.hex);
    // setdisplayColorPicker(false);
  };

  return (
    <div className={className}>
      <button type="button" onClick={handleClick} style={{ backgroundColor: '#F3F3F3 ' }}>
        <Eyedropper />
        {' '}
        <span> Pick Color </span>
      </button>
      {displayColorPicker ? (
        <div style={{ position: 'absolute', zIndex: 4 }} onMouseLeave={() => setdisplayColorPicker(false)}>
          <div
            style={{
              position: 'fixed', top: '0px', right: '0px', left: '0px',
            }}
            onClick={handleClose}
            onKeyDown={handleClose}
            role="button"
            tabIndex={0}
            id="picker"
          />
          <ChromePicker
            color={scolor}
            onChange={handleColorChange}
          />
        </div>
      ) : null}

    </div>
  );
}
