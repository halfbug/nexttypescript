import {
  useRef, useState, useLayoutEffect, useEffect,
} from 'react';

export default function useDimensions() {
  const ref = useRef<any>();
  const [dimensions, setDimensions] = useState<any>({});

  // Run the first time renders to set the initial dimensions
  // useLayoutEffect(() => {
  useEffect(() => {
    setDimensions(ref.current.getBoundingClientRect().toJSON());
  }, []);

  // Update the dimensions when the window resizes.
  // useLayoutEffect(() => {
  useEffect(() => {
    const handleResize = () => {
      setDimensions(ref.current.getBoundingClientRect().toJSON());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setDimensions, ref]);
  return [ref, dimensions];
}
