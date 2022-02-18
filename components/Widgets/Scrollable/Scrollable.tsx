/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import styles from 'styles/Groupshop.module.scss';
import Navbar from 'react-bootstrap/Navbar';
import { RootProps } from 'types/store';
import { Placeholder } from 'react-bootstrap';
import IconButton from 'components/Buttons/IconButton';
import { ChevronRight, ChevronLeft } from 'react-bootstrap-icons';

type ScrollableProps = {
  width : string;
} & React.ComponentPropsWithoutRef<'div'> & RootProps

const Scrollable = ({
  width, pending = false, children,
}: ScrollableProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const handleClick = (event: any) => {
    console.log('test');
  };
  // console.log(ReviewsData);
  const scroll = (scrollOffset : number) => {
    if (scrollRef.current) scrollRef.current.scrollLeft += scrollOffset;
  };

  if (pending) {
    return (<Placeholder as="h1" bg="secondary" className="w-100" />);
  }
  return (
    <div className="d-flex">
      <IconButton icon={<ChevronLeft />} onClick={() => scroll(-200)} type="button" style={{ minWidth: 'auto' }} />
      <div ref={scrollRef} style={{ width, overflow: 'hidden', scrollBehavior: 'smooth' }}>
        {children}
      </div>
      <IconButton icon={<ChevronRight />} onClick={() => scroll(200)} type="button" style={{ minWidth: 'auto' }} />
    </div>
  );
};

// Scrollable.defaultProps = {
//   user: {},
// };

export default Scrollable;
