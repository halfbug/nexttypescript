import React, { useState, useEffect } from 'react';
import styles from 'styles/Groupshop.module.scss';
import { CopyToClipboard as CopyButton } from 'react-copy-to-clipboard';
import { Button } from 'react-bootstrap';
import useGtm from 'hooks/useGtm';

interface CopyToClipboardProps {
  value : string;
}

const CopyToClipboard = ({
  value,
}: CopyToClipboardProps) => {
  const [copied, setCopied] = useState<Boolean>(false);
  const { googleButtonCode } = useGtm();
  useEffect(() => {
    if (copied) { googleButtonCode('product-share-copy'); }
  }, [copied]);

  return (
    <div className={styles.groupshop_copy2clipboard}>
      <span>{value}</span>
      <CopyButton
        // options={{ debug: props.debug, message: "" }}
        text={value}
        onCopy={() => setCopied(!copied)}
      >
        <Button variant="outline" className={[' rounded-3 float-end', styles.groupshop_copy2clipboard_copybtn].join(' ')}>{copied ? 'Copied' : 'Copy'}</Button>
      </CopyButton>
    </div>
  );
};

// CopyToClipboard.defaultProps = {
//   user: {},
// };

export default CopyToClipboard;
