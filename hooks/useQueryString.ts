import { useCallback } from 'react';
import { useRouter } from 'next/router';

export declare type TParams = {
    [param: string]: any;
};

export default function useQueryString() {
  const router = useRouter();

  const { pathname, query: params } = router;
  const setParams = useCallback((newQueryParams: TParams) => {
    router.push({
      pathname,
      query: { ...params, ...newQueryParams },
    });
  }, []);

  return [params, setParams] as const;
}
