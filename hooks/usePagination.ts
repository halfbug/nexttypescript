/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */

import React, { useEffect, useCallback, useState } from 'react';
import { number } from 'yup/lib/locale';
import useDimensions from './useDimentions';

export type ScreensProps= { [key: string]: number } & {
  xs?: number,
  sm?: number,
  md?: number,
  lg?: number,
  xl?: number,
  xxl?: number,
}
type PaginationProps<T> = {
    dimensions : any;
    maxrows: number,
    screens: ScreensProps
    items: T[],
    siblingCount: number,
//   currentPage: number,
}

const usePagination = <T extends {}>({
  maxrows, screens, items, dimensions, siblingCount,
}:PaginationProps<T>) => {
  // const [ref, dimensions] = useDimensions();
  const [breakPoint, setBreakPoint] = useState<string>('sm');
  const [pageSize, setPageSize] = useState<number>(6);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [renderItems, setRenderItems] = useState<typeof items>(items);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (dimensions.width && items?.length > 0) {
      setVals(dimensions.width);
    }
  }, [dimensions, items, currentPage]);

  const breakpoints: { [char: string]: number } = {
    // xs: 0,
    // sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
  };
  const setVals = (currentWidth: number) => {
    let bPoint = 'sm';
    for (const key in breakpoints) {
      if (breakpoints[key] < currentWidth) { bPoint = key; } else { break; }
    }
    // bPoint = (bPoint === xs )
    setBreakPoint(bPoint);
    const pagesize = (12 / screens[bPoint]) * maxrows;
    setPageSize(pagesize);
    const totalpages = Math.ceil((items.length) / pagesize);
    setTotalPages(totalpages);

    const start = (currentPage > 1)
      ? (currentPage - 1) * pagesize : currentPage - 1;
    const end = (currentPage > 0)
      ? currentPage * pagesize : pagesize;
    setRenderItems(items.slice(start, end));
  };

  const range = (start: number, end: number) => Array(end - start + 1)
    .fill(0).map((_, idx) => start + idx);
  const getPageNumbers = useCallback(() => {
    let start : number = 1;
    let end : number = siblingCount;
    const pageLeft = totalPages - currentPage;

    if (currentPage - 1 >= 0 && pageLeft >= siblingCount - 2) {
      start = currentPage - 1 > 0 ? currentPage - 1 : 1;
      end = start + (siblingCount - 1);
    } else {
      start = totalPages - (siblingCount - 1);
      end = totalPages;
    }

    return range(start, end);
  }, [currentPage]);
  return {
    breakPoint, pageSize, totalPages, renderItems, currentPage, setCurrentPage, getPageNumbers,
  };
};

export default usePagination;
