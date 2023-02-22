import { useEffect, useState } from 'react';
import useAppContext from './useAppContext';
import useDeal from './useDeal';

const useCountDown = () => {
  const { gsctx } = useAppContext();
  const { isExpired } = useDeal();
  const { expiredAt } = gsctx;
  const [countdownDate, setCountdownDate] = useState(0);
  const [count, setCount] = useState<any>(undefined);
  const [isCountdownOver, setisCountdownOver] = useState<boolean>(false);
  let pollit: any;

  const loading = {
    days: '..',
    hours: '..',
    minutes: '..',
    seconds: '..',
  };

  const expiredValues = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  useEffect(() => {
    if (countdownDate) {
      pollit = setInterval(() => setNewTime(), 1000);
    }
  }, [countdownDate]);

  useEffect(() => {
    if (expiredAt) {
      setCountdownDate(new Date(expiredAt).getTime());
    }
  }, [expiredAt]);

  const setNewTime = () => {
    if (countdownDate && !isExpired) {
      const currentTime = new Date().getTime();

      const distanceToDate = countdownDate - currentTime;

      let days = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      let minutes = Math.floor(
        (distanceToDate % (1000 * 60 * 60)) / (1000 * 60),
      );
      let seconds = Math.floor((distanceToDate % (1000 * 60)) / 1000);

      const numbersToAddZeroTo = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      days = +(`${days}`);
      if (numbersToAddZeroTo.includes(hours)) {
        hours = +(`0${hours}`);
      } else if (numbersToAddZeroTo.includes(minutes)) {
        minutes = +(`0${minutes}`);
      } else if (numbersToAddZeroTo.includes(seconds)) {
        seconds = +(`0${seconds}`);
      }

      if (days < 1
        && hours < 1
        && minutes < 1
        && seconds <= 0) {
        clearInterval(pollit);
        setisCountdownOver(true);
        return false;
      }

      setCount({
        days, hours, minutes, seconds,
      });
    }
    return false;
  };

  if (gsctx.id && count) {
    return { ...count, isCountdownOver };
  }
  if ((gsctx.id && isExpired) || isCountdownOver) {
    return { ...expiredValues };
  }
  return { ...loading };
};

export default useCountDown;
