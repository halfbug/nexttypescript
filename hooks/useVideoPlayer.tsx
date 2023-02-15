/* eslint-disable no-param-reassign */
import { useQuery } from '@apollo/client';
import {
  useEffect, useState,
} from 'react';
import { GET_ALL_VIDEOS } from 'store/store.graphql';
import useAppContext from './useAppContext';

interface controlType {
  autoPlay: boolean,
  mute: boolean,
  height: string,
  width: string,
  currentTime: number,
  endTime: number,
  loop: boolean,
  range: number,
}

const useVideoPlayer = (videoRef: any) => {
  const { gsctx, dispatch, isGroupshop } = useAppContext();

  const {
    data, refetch,
  } = useQuery(GET_ALL_VIDEOS, {
    variables: { storeId: gsctx.storeId },
  });

  const [source, setSource] = useState<any[]>([]);
  const [control, setControl] = useState<controlType>({
    autoPlay: true,
    mute: true,
    height: '207',
    width: '152',
    currentTime: 0,
    endTime: 0,
    loop: true,
    range: 0,
  });
  const [closeType, setCloseType] = useState<boolean>(false);
  const [type, setType] = useState<number>(1);
  const [display, setDisplay] = useState<string>('');
  const [videoNo, setVideoNo] = useState<number>(0);
  const [videoError, setVideoError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data?.videos?.length > 0) {
      const temp:any[] = [];
      const showVideos = data.videos.filter((el: any) => el.status === 'Active').sort((a: any, b: any) => a.orderId - b.orderId);
      showVideos.forEach((ele: any) => temp.push(ele.type));
      setSource(temp);
    }
  }, [data]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth > 475) {
        setDisplay('desktop');
      } else {
        setDisplay('mobile');
        setType(2);
        setCloseType(true);
      }
    }
  }, []);

  const updateTime = () => {
    setControl({ ...control, range: 0 });
    return '';
  };

  const handleChange = (e: any) => {
    if (control.height === '207' || type === 2) {
      if ((videoRef.current.duration < 5
        && e.target.currentTime === videoRef.current.duration) || e.target.currentTime > 5) {
        videoRef.current.currentTime = 0;
      }
    } else {
      if (e.target.currentTime >= videoRef.current.duration) {
        setVideoNo(source.length === videoNo + 1 ? 0 : videoNo + 1);
        setControl({ ...control, autoPlay: true });
      }
      setControl({
        ...control,
        range: (e.target.currentTime / videoRef.current.duration) * 100,
        currentTime: e.target.currentTime,
        endTime: videoRef.current.duration,
      });
    }
  };

  const handleClick = () => {
    if (display === 'desktop' && control.height === '207') {
      videoRef.current.currentTime = 0;
      setControl({
        ...control,
        height: '444',
        width: '250',
        mute: false,
        loop: !(source.length > 1),
      });
    } else if (display === 'mobile' && control.height === '207') {
      videoRef.current.currentTime = 0;
      videoRef.current.setAttribute('muted', '');
      setTimeout(() => {
        videoRef.current.play();
      }, 100);
      setControl({
        ...control,
        height: '318',
        width: '175',
        mute: false,
        loop: !(source.length > 1),
      });
    } else if (control.autoPlay) {
      setControl({ ...control, autoPlay: false });
      videoRef.current.pause();
    } else {
      setControl({ ...control, autoPlay: true });
      videoRef.current.play();
    }
  };

  const handleRangeUpdate = (e: any) => {
    const manualChange = Number(e.target.value);
    videoRef.current.currentTime = (videoRef.current.duration / 100) * manualChange;
    setControl({ ...control, range: manualChange });
  };

  const handleClose = () => {
    videoRef.current.currentTime = 0;
    if (control.height === '207') {
      setCloseType(true);
      setType(2);
    } else if ((control.height === '444' || control.height === '318') && !closeType) {
      setControl({
        ...control, height: '207', width: '152', mute: true, autoPlay: true,
      });
      videoRef.current.play();
    } else if ((control.height === '444' || control.height === '318') && closeType) {
      setType(2);
      setControl({
        ...control, mute: true,
      });
      videoRef.current.play();
    }
    setVideoNo(0);
  };

  const handleLiveClick = () => {
    setType(1);
    if (display === 'mobile') {
      videoRef.current.currentTime = 0;
      videoRef.current.setAttribute('muted', '');
      setTimeout(() => {
        videoRef.current.play();
      }, 100);
      setControl({
        ...control,
        height: '318',
        width: '175',
        mute: false,
        loop: !(source.length > 1),
        autoPlay: true,
      });
    } else {
      setControl({
        ...control, height: '444', width: '250', mute: false, autoPlay: true,
      });
    }
  };

  const handleError = () => {
    if (source.length === videoNo + 1) {
      setVideoError(true);
    } else {
      setVideoNo(videoNo + 1);
    }
  };

  const loadingStart = () => {
    setIsLoading(true);
    videoRef.current.pause();
    setControl({ ...control, autoPlay: false });
  };

  const loadingEnd = async () => {
    setIsLoading(false);
    videoRef.current.currentTime = 0;
    setControl({ ...control, autoPlay: true });
    if (type === 2) {
      videoRef.current.setAttribute('muted', '');
      setTimeout(() => {
        videoRef.current.play();
      }, 200);
    } else {
      await videoRef.current.play();
    }
  };

  const handleWaiting = () => {
    if (control.height === '444' || control.height === '318') {
      setIsLoading(true);
    }
  };

  const handlePlaying = () => {
    setIsLoading(false);
  };

  return {
    control,
    type,
    source,
    handleClose,
    handleLiveClick,
    handleRangeUpdate,
    handleClick,
    handleChange,
    display,
    videoNo,
    updateTime,
    videoError,
    handleError,
    loadingStart,
    loadingEnd,
    isLoading,
    handleWaiting,
    handlePlaying,
  };
};

export default useVideoPlayer;
