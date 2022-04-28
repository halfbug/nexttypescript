/* eslint-disable no-unused-vars */
import React from 'react';
import styles from 'styles/Groupshop.module.scss';
import { InfoCircle } from 'react-bootstrap-icons';
import IconButton from '../IconButton';

interface InfoButtonProps {
  handleClick():any;
    message?: string | undefined;
}

const InfoButton = ({
  handleClick, message,
}: InfoButtonProps) => (

  <IconButton
    icon={(
      <div className={styles.groupshop_infobutton}>
        {(message !== 'How it works') && (<InfoCircle />)}
        { message
        && (
        <span>
          {' '}
          {message}
        </span>
        )}
      </div>
)}
    onClick={handleClick}
    type="button"
  />

);

InfoButton.defaultProps = {
  message: undefined,
};

export default InfoButton;
