import React, {
  useCallback, useEffect, useState,
} from 'react';

const useLoadMoreOnVisible = (tragetReff:any, refid: string):[boolean, (v:boolean)=>void] => {
  // get client IP
  const [isTimetoLoad, setIsTimetoLoad] = useState<boolean>(false);

  const isInViewport = () => {
    const divDimentions = tragetReff?.current?.getBoundingClientRect().toJSON();
    if (tragetReff?.current?.id === refid) {
      // console.log(':39 tragetReff?.current?.id:', tragetReff?.current?.id);
      // console.log('useLoadMoreOnScroll.tsx:38 divDimentions:', divDimentions);
      return (
        Math.abs(divDimentions.top) <= divDimentions.height - 180
      // && divDimentions.bottom >= 0
      && divDimentions.top <= (window.innerHeight || document.documentElement.clientHeight)
      && divDimentions.bottom <= (
        (window.innerHeight || document.documentElement.clientHeight) + divDimentions.height)

      );
    }

    return false;
  };

  useEffect(() => {
    const handleScroll = () => {
      // const messageText = isInViewport()
      //   ? 'The box is visible in the viewport'
      //   : 'not found yet';

      // console.log('useLoadMoreOnScroll.tsx:52 ~ handleScroll ~ messageText:', messageText);
      // const currentbounding = tragetReff?.current?.getBoundingClientRect().toJSON();
      // const threequaterlength = ((tragetReff?.current?.scrollHeight / 4) * 3);
      // const scrolledSoFar = currentbounding?.Height + tragetReff?.current?.scrollLeft;
      if (isInViewport() && !isTimetoLoad) { setIsTimetoLoad(true); }
    };
    window?.addEventListener('scroll', handleScroll);

    return () => {
      window?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return [isTimetoLoad, setIsTimetoLoad];
};
export default useLoadMoreOnVisible;
