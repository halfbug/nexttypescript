import React from 'react';
import 'styles/globals.scss';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from 'hooks/useApollo';
import { StoreContextProvider } from 'store/store.context';
import { useRouter } from 'next/router';
import { GroupshopContextProvider } from 'store/groupshop.context';
import { GroupshopPartnerContextProvider } from 'store/partner-groupshop.context';
import { AuthContextProvider } from 'store/auth.context';
import axios from 'axios';

function MyApp({ Component, pageProps }: AppProps) {
  console.log('🚀 ~ file: _app.tsx ~ line 13 ~ MyApp ~ pageProps', pageProps);
  const { pathname } = useRouter();
  const apolloClient = useApollo(pageProps);

  // const instance = axios.create({
  //   headers: {
  //     post: { // can be common or any other method
  //       header1: 'value1',
  //     },
  //   },
  // });

  // // - or after instance has been created
  // instance.defaults.headers.post.header1 = 'value';

  // // - or before a request is made
  // // using Interceptors
  // instance.interceptors.request.use((config) => {
  //   config.headers.post.header1 = 'value';
  //   return config;
  // });

  if (['/deal/', '/partner-deal/', '/qr-code/'].includes(pathname)) {
    return (
      <ApolloProvider client={apolloClient}>
        <GroupshopContextProvider>
          <Component {...pageProps} />
        </GroupshopContextProvider>
      </ApolloProvider>
    );
  }
  // if (pathname.includes('/partner-deal/')) {
  //   return (
  //     <ApolloProvider client={apolloClient}>
  //       <GroupshopPartnerContextProvider>
  //         <Component {...pageProps} />
  //       </GroupshopPartnerContextProvider>
  //     </ApolloProvider>
  //   );
  // }

  return (
  // <ApolloProvider client={apolloClient}>
    <AuthContextProvider>

      <StoreContextProvider>
        <Component {...pageProps} />
      </StoreContextProvider>
    </AuthContextProvider>

  // </ApolloProvider>
  );
}
export default MyApp;
