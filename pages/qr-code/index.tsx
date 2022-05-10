import React, { useState } from 'react';
import type { NextPage } from 'next';

// import components
import QrStep1 from 'components/QrStoreDetails/QrStep1';
import QrStep2 from 'components/QrStoreDetails/QrStep2';
import QrStep3 from 'components/QrStoreDetails/QrStep3';

const QrCode: NextPage = () => {
  const [showStep1, setShowStep1] = useState(true);
  const [showStep2, setShowStep2] = useState(false);
  const [showStep3, setShowStep3] = useState(false);
  const [dealLink, setdealLink] = useState('');
  const [brandLogo, setbrandLogo] = useState('');

  return (
    <>
      {showStep1 && (
        <QrStep1
          setShowStep1={setShowStep1}
          setShowStep2={setShowStep2}
          setShowStep3={setShowStep3}
          setdealLink={setdealLink}
          setbrandLogo={setbrandLogo}
        />
      )}
      {showStep2 && <QrStep2 brandLogo={brandLogo} />}
      {showStep3 && <QrStep3 dealLink={dealLink} brandLogo={brandLogo} />}
    </>
  );
};

export default QrCode;
