import React, {
  useCallback, useEffect, useState,
} from 'react';

const useLoadMoreOnScroll = (scroller:any, direction: 'vertical'|'horizontal'):[boolean, (v:boolean)=>void] => {
  // get client IP
  // const [clientIP, setclientIP] = useState<string>('');
  const [isTimetoLoad, setisTimetoLoad] = useState(false);
  // const [scrollDirection, setScrollDirection] = useState('none');
  //   console.log(scroller);
  useEffect(() => {
    console.log('current ', scroller.current.getBoundingClientRect().toJSON());
    const currentbounding = scroller.current.getBoundingClientRect().toJSON();
    const scrollElement = scroller.current;
    // let previousScroll = 0;
    // console.log('scroll listener added to element', scrollElement);
    const scrollHandler = scrollElement.addEventListener('scroll', (e: any) => {
      //   setScrollTop(scrollElement.scrollTop);
      console.log('pos', scroller?.current?.scrollLeft);
      console.log('width', scroller?.current?.scrollWidth);
      console.log('div', scroller?.current?.getBoundingClientRect().toJSON());
      // if (previousScroll < scrollElement.scrollTop) {
      //   setScrollDirection('down');
      // } else {
      //   setScrollDirection('up');
      // }
      // previousScroll = scrollElement.scrollTop;
      const threequaterlength = ((scroller?.current?.scrollWidth / 4) * 3);
      const scrolledSoFar = currentbounding.width + scroller?.current?.scrollLeft;
      if (threequaterlength < scrolledSoFar && !isTimetoLoad) { setisTimetoLoad(true); }
      console.log('🚀 ~ file: useLoadMoreOnScroll.tsx:32 ~ useEffect ~ (currentbounding.scrollWidth / 2) === (currentbounding.width + scroller?.current?.scrollLeft):', scroller?.current?.scrollWidth, parseInt(scroller?.current?.scrollWidth, 10) / 2, currentbounding.width + scroller?.current?.scrollLeft, (currentbounding.scrollWidth / 2) === (currentbounding.width + scroller?.current?.scrollLeft));
      // scrollDemo.scrollLeft;
      // console.log('🚀 ~ file: useLoadMoreOnScroll.tsx:28 ~ scrollHandler ~ e:', e);
    });

    return () => {
      console.log('scroll listener removed from element', scrollElement);
      scrollElement.removeEventListener('scroll', scrollHandler);
    };
  }, [scroller]);

  return [isTimetoLoad, setisTimetoLoad];
};
export default useLoadMoreOnScroll;
