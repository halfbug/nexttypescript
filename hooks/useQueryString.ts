import { useCallback } from 'react';
import { useRouter } from 'next/router';

export declare type TParams = {
    [param: string]: any;
};

export default function useQueryString() {
  const router = useRouter();

  const { pathname, query: params } = router;
  console.log('🚀 ~ file: useQueryString.ts ~ line 12 ~ useQueryString ~ pathname', pathname);
  console.log('🚀 ~ file: useQueryString.ts ~ line 12 ~ useQueryString ~ params', params);
  const setParams = useCallback((newQueryParams: TParams) => {
    router.push({
      pathname,
      query: { ...params, ...newQueryParams },
    });
  }, [router.query]);

  return [params, setParams] as const;
}
