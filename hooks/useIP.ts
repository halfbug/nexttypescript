import {
  useCallback, useEffect, useState,
} from 'react';

const useIP = ():[string, ()=>void] => {
  // get client IP
  const [clientIP, setclientIP] = useState<string>('');

  useEffect(() => {
    getClientIP();
  }, []);

  const getClientIP = useCallback(() => {
    fetch('https://geolocation-db.com/json/3a2b5be0-75a0-11ec-acd1-89ce18e6dbfe')
      .then((response) => response.json())
      .then((data) => setclientIP(data.IPv4))
      .catch((err) => console.log({ err }));
  }, [clientIP]);

  return [clientIP, getClientIP];
};
export default useIP;
