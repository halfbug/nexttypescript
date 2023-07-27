import { useCallback } from 'react';

export default function useLocalStorage(storage: string) {
  const setStorage = useCallback((values) => {
    if (values?.length > 0) localStorage.setItem(storage, JSON.stringify(values));
  }, [storage]);

  const getStorage = useCallback(() => {
    if (localStorage.getItem(storage)) return JSON.parse(localStorage.getItem(storage) ?? '');
    return null;
  }, [storage]);

  const removeStorage = useCallback(() => {
    if (localStorage[storage]) return localStorage.removeItem(storage);
    return null;
  }, [storage]);

  const addToStorage = useCallback((values) => {
    const vals = getStorage();
    setStorage({ ...vals, ...values });
  }, [getStorage, setStorage]);

  const existStorage = useCallback(() => (!!localStorage.getItem(storage)), [storage]);

  return {
    setStorage,
    addToStorage,
    getStorage,
    removeStorage,
    existStorage,
  };
}
