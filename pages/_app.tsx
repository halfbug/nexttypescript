import React from 'react';
import 'styles/globals.scss';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from 'hooks/useApollo';
import { StoreContextProvider } from 'store/store.context';

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <StoreContextProvider>
        <Component {...pageProps} />
      </StoreContextProvider>
    </ApolloProvider>
  );
}
export default MyApp;
