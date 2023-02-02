import React, { useState } from 'react';
import type { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import { Container } from 'react-bootstrap';
import Router, { useRouter } from 'next/router';
// import components

const KlaviyoForm: NextPage = () => {
  // eslint-disable-next-line
  const [dealLink, setdealLink] = useState('');
  const { query: { listId } } = useRouter();

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
        <script async type="text/javascript" src="https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=WqYz9Q" />
      </Container>
    </>
  );
};

export default KlaviyoForm;
