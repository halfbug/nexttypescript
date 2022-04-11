import React, { useCallback } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';

function useDelay(delay: any) {
  const debouncedFn = useCallback((callback) => {
    _.debounce(() => callback(), delay);
    // will recreate if delay changes
  }, [delay]);
  return debouncedFn;
}

export default useDelay;
