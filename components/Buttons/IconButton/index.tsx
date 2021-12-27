/* eslint-disable react/button-has-type */
import * as React from 'react';
import styles from 'styles/IconButton.module.scss';

export interface IIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: React.ReactNode;
}

export default function IconButton({ icon, children, ...props }: IIconButtonProps) {
  return (
    <button
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      className={[styles.iconButton, props.className].join(' ')}
    >

      {icon}
      {children}
    </button>
  );
}
