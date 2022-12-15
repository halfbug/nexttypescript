import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import QrCodeCommon from 'components/QrWithBrandName/QrCodeCommon';

const QrCodeBrandName: NextPage = () => (
  <>
    <Head>
      <title>Groupshop - QR code</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
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
    <QrCodeCommon />
  </>
);

export default QrCodeBrandName;
