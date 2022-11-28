import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { IUser } from 'types/store';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from 'hooks/useApollo';

interface AuthContextType {
  user: IUser | undefined;
  error?: string;
  token: string | undefined;
//   verify()?: any;
}

const initialState: {user: IUser | undefined} = {
  user: undefined,

};

export const AuthContext = React.createContext<AuthContextType>(
  initialState as AuthContextType,
);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<IUser| undefined>(undefined);
  const [token, setToken] = useState<string| undefined>(undefined);
  const [error, setError] = useState<string| undefined>(undefined);
  const router = useRouter();
  console.log('🚀 ~ file: auth.context.tsx ~ line 30 ~ router', router);

  useEffect(() => { verify(); }, [router.asPath]);
  useEffect(() => { verify(); }, []);
  const verify = async () => {
    const res = await fetch('/api/verify');
    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      setToken(data.token);
    } else {
      setUser(undefined);
      router.push(data.redirectUrl ?? 'https://accounts.shopify.com/lookup');
    }
  };
  const apolloClient = useApollo(token);
  const ctx = useMemo(() => ({
    user, error, token,
  }), [error, token, user]);
  console.log('🚀 ~ file: auth.context.tsx ~ line 51 ~ user', user);
  return (
    <AuthContext.Provider value={ctx}>
      <ApolloProvider client={apolloClient}>
        {children}
      </ApolloProvider>
    </AuthContext.Provider>
  );
};
