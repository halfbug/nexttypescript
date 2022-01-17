import React, { useCallback } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';
import { IProduct } from 'types/store';

function useDebounce(callback: (arg: any) => any, delay: any, products: IProduct[]) {
  const debouncedFn = useCallback(
    _.debounce((args) => callback(args), delay),
    [delay, products], // will recreate if delay changes
  );
  return debouncedFn;
}

export default useDebounce;
