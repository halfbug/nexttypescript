import React, {
  useCallback, useEffect, useState,
} from 'react';

const useLoadMoreOnVisible = (tragetReff:any, refid: string):[boolean, (v:boolean)=>void] => {
  // get client IP
  const [isTimetoLoad, setIsTimetoLoad] = useState<boolean>(false);

  const isInViewport = () => {
    const divDimentions = tragetReff.current.getBoundingClientRect().toJSON();
    if (tragetReff.current.id === refid) {
      console.log('🚀 ~ file: useLoadMoreOnScroll.tsx:39 ~ isInViewport ~ tragetReff.current.id:', tragetReff.current.id);
      console.log('🚀 ~ file: useLoadMoreOnScroll.tsx:38 ~ isInViewport ~ divDimentions:', divDimentions);
      console.log('window.innerHeight || document.documentElement.clientHeight + divDimentions.height:', (window.innerHeight || document.documentElement.clientHeight) + divDimentions.height);
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
    const prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const messageText = isInViewport()
        ? 'The box is visible in the viewport'
        : 'not found yet';
      // const currentScrollPos = window.scrollY;
      console.log('🚀 ~ file: useLoadMoreOnScroll.tsx:52 ~ handleScroll ~ messageText:', messageText);
      const currentbounding = tragetReff.current.getBoundingClientRect().toJSON();
      const threequaterlength = ((tragetReff?.current?.scrollHeight / 4) * 3);
      const scrolledSoFar = currentbounding.Height + tragetReff?.current?.scrollLeft;
      if (isInViewport() && !isTimetoLoad) { setIsTimetoLoad(true); }

      // const headerElement = headerRef.current;
      // if (!headerElement) {
      //   return;
      // }
      // if (prevScrollPos > currentScrollPos) {
      //   headerElement.style.transform = 'translateY(0)';
      // } else {
      //   headerElement.style.transform = 'translateY(-200px)';
      // }
      // prevScrollPos = currentScrollPos;
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return [isTimetoLoad, setIsTimetoLoad];
};
export default useLoadMoreOnVisible;
