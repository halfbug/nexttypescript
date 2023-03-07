import React, { useEffect, useState } from 'react';
import type { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import { Container } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import Router, { useRouter } from 'next/router';
import { GET_STORE_KLAVIYO_DETAILS } from 'store/store.graphql';
// import components

const KlaviyoForm: NextPage = () => {
  // eslint-disable-next-line
  const [dealLink, setdealLink] = useState('');
  const { query: { listId, shop } } = useRouter();
  const [klaviyopublicKey, setKlaviyoPublicKey] = useState('');
  const {
    data: storeData,
  } = useQuery(GET_STORE_KLAVIYO_DETAILS, {
    variables: { shop: `${shop}.myshopify.com`, skip: !shop },
  });

  useEffect(() => {
    if (storeData?.StoreKlaviyoDetail) {
      setKlaviyoPublicKey(storeData.StoreKlaviyoDetail.drops.klaviyo?.publicKey);
    }
  }, [storeData]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=${klaviyopublicKey}`;
    script.id = 'klaviyo';
    document.body.appendChild(script);
  }, [klaviyopublicKey]);

  return (
    <>
      <Head>
        <title>Groupshop - KlaviyoForm</title>
      </Head>
      <Container>
        <div className="w-100 align-items-center text-center justify-content-center my-4 mx-0">
          <div className="d-flex justify-content-center flex-column">
            {typeof listId !== 'undefined' && listId && (
              <>
                <div className={`klaviyo-form-${listId}`} />
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default KlaviyoForm;
