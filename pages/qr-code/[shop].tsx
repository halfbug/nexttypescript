import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import QrCodeCommon from 'components/QrWithBrandName/QrCodeCommon';

const QrCodeBrandName: NextPage = () => (
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
    <QrCodeCommon />
  </>
);

export default QrCodeBrandName;
