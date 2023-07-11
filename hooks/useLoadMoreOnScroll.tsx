import React, {
  useCallback, useEffect, useState,
} from 'react';

const useLoadMoreOnScroll = (scroller:any, direction: 'vertical'|'horizontal'):[boolean, (v:boolean)=>void] => {
  const [isTimetoLoad, setisTimetoLoad] = useState(false);
  useEffect(() => {
    const currentbounding = scroller?.current?.getBoundingClientRect()?.toJSON();
    const scrollElement = scroller?.current;
    const scrollHandler = scrollElement?.addEventListener('scroll', (e: any) => {
      // console.log('pos', scroller?.current?.scrollLeft);
      // console.log('width', scroller?.current?.scrollWidth);
      // console.log('div', scroller?.current?.getBoundingClientRect().toJSON());
      const threequaterlength = ((scroller?.current?.scrollWidth / 4) * 3);
      const scrolledSoFar = currentbounding?.width + scroller?.current?.scrollLeft;
      if (threequaterlength < scrolledSoFar && !isTimetoLoad) { setisTimetoLoad(true); }
    });

    return () => {
      // console.log('scroll listener removed from element', scrollElement);
      scrollElement?.removeEventListener('scroll', scrollHandler);
    };
  }, [scroller]);

  return [isTimetoLoad, setisTimetoLoad];
};
export default useLoadMoreOnScroll;
