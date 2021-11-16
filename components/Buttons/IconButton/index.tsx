/* eslint-disable react/button-has-type */
import * as React from 'react';
import styles from 'styles/IconButton.module.scss';

export interface IIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: React.ReactNode;
}

export default function IconButton({ icon, ...props }: IIconButtonProps) {
  return (
    <button
      className={styles.iconButton}
      {...props}
    >

      {icon}

    </button>
  );
}
