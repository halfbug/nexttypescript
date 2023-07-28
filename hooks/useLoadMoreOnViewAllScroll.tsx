import React, {
  useEffect, useState,
} from 'react';

const useLoadMoreOnViewAllScroll = (tragetReff:any, refid: string):[boolean, (v:boolean)=>void] => {
  const [isTimetoLoad, setIsTimetoLoad] = useState<boolean>(false);

  const isInViewport = () => {
    const divDimentions = tragetReff?.current?.getBoundingClientRect().toJSON();
    if (tragetReff?.current?.id === refid) {
      return (
        Math.abs(divDimentions.top) <= divDimentions.height - 180
      && divDimentions.top <= (window.innerHeight || document.documentElement.clientHeight)
      && divDimentions.bottom <= (
        (window.innerHeight || document.documentElement.clientHeight) + divDimentions.height)

      );
    }

    return false;
  };

  const handleScroll = () => {
    if (isInViewport() && !isTimetoLoad) { setIsTimetoLoad(true); }
  };

  useEffect(() => {
    const vas = document.getElementById('viewallscroll');
    vas?.addEventListener('scroll', handleScroll);

    return () => {
      vas?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return [isTimetoLoad, setIsTimetoLoad];
};
export default useLoadMoreOnViewAllScroll;
