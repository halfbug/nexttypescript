import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
// import components
import QrStep1 from 'components/QrStoreDetails/QrStep1';
import QrStep2 from 'components/QrStoreDetails/QrStep2';
import QrStep3 from 'components/QrStoreDetails/QrStep3';

const QrCode: NextPage = () => {
  const [showStep1, setShowStep1] = useState(true);
  const [showStep2, setShowStep2] = useState(false);
  const [showStep3, setShowStep3] = useState(false);
  // eslint-disable-next-line
  const [dealLink, setdealLink] = useState('');
  // eslint-disable-next-line
  const [brandLogo, setbrandLogo] = useState('');
  const [activeGroupshops, setactiveGroupshops] = useState([]);
  const [email, setEmail] = useState('');

  return (
    <>
      <Head>
        <title>Groupshop - QR code</title>
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "9j6d12pkzs");`,
          }}
        />
      </Head>
      {showStep1 && (
        <QrStep1
          setShowStep1={setShowStep1}
          setShowStep2={setShowStep2}
          setShowStep3={setShowStep3}
          setactiveGroupshops={setactiveGroupshops}
          setEmail={setEmail}
        />
      )}
      {showStep2 && (
        <QrStep2
          activeGroupshops={activeGroupshops}
          email={email}
        />
      )}
      {showStep3 && <QrStep3 />}
    </>
  );
};

export default QrCode;
