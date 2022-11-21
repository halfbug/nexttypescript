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
          })(window, document, "clarity", "script", "ecbk8j0pnn");`,
          }}
        />
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '3371804206430685');`,
          }}
        />
        <noscript
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `<img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=3371804206430685&ev=PageView&noscript=1"
            />`,
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
          setShowStep1={setShowStep1}
          setShowStep2={setShowStep2}
          activeGroupshops={activeGroupshops}
          email={email}
        />
      )}
      {showStep3 && <QrStep3 setShowStep1={setShowStep1} setShowStep3={setShowStep3} />}
    </>
  );
};

export default QrCode;
