/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styles from 'styles/Groupshop.module.scss';
import { CopyToClipboard as CopyButton } from 'react-copy-to-clipboard';
import { Button } from 'react-bootstrap';

interface CopyToClipboardProps {
  value : string;
}

const CopyToClipboard = ({
  value,
}: CopyToClipboardProps) => {
  const [copied, setCopied] = useState<Boolean>(false);
  return (
    <div className={styles.groupshop_copy2clipboard}>
      <span>{value}</span>
      <CopyButton
        // options={{ debug: props.debug, message: "" }}
        text={value}
        onCopy={() => setCopied(!copied)}
      >
        <Button variant="secondary">{copied ? 'Copied' : 'Copy'}</Button>
      </CopyButton>
    </div>
  );
};

// CopyToClipboard.defaultProps = {
//   user: {},
// };

export default CopyToClipboard;
