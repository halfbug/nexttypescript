import React from 'react';
import 'styles/globals.scss';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from 'hooks/useApollo';
import { StoreContextProvider } from 'store/store.context';
import { useRouter } from 'next/router';
import { GroupshopContextProvider } from 'store/groupshop.context';
import { GroupshopPartnerContextProvider } from 'store/partner-groupshop.context';

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const apolloClient = useApollo(pageProps.initialApolloState);

  if (pathname.includes('/deal/')) {
    return (
      <ApolloProvider client={apolloClient}>
        <GroupshopContextProvider>
          <Component {...pageProps} />
        </GroupshopContextProvider>
      </ApolloProvider>
    );
  }
  if (pathname.includes('/partner-deal/')) {
    return (
      <ApolloProvider client={apolloClient}>
        <GroupshopPartnerContextProvider>
          <Component {...pageProps} />
        </GroupshopPartnerContextProvider>
      </ApolloProvider>
    );
  }

  if (pathname.includes('/qr-code/')) {
    return (
      <ApolloProvider client={apolloClient}>
        <StoreContextProvider>
          <Component {...pageProps} />
        </StoreContextProvider>
      </ApolloProvider>
    );
  }

  return (
    <ApolloProvider client={apolloClient}>
      <StoreContextProvider>
        <Component {...pageProps} />
      </StoreContextProvider>
    </ApolloProvider>
  );
}
export default MyApp;
