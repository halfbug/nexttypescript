/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/media-has-caption */
import useVideoPlayer from 'hooks/useVideoPlayer';
import React, { useRef } from 'react';

import CloseIcon from 'assets/images/close.png';
import PauseIcon from 'assets/images/pause.png';
import PlayIcon from 'assets/images/play.png';
import styles from 'styles/VideoWidget.module.scss';

const VideoWidget = () => {
  const videoRef = useRef<any>(null);

  const {
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
    mobileViewClick,
    updateTime,
    videoError,
    handleError,
  } = useVideoPlayer(videoRef);

  return (
    <div
      className={styles.videoWidget__box}
    >
      {display === 'mobile' && type === 1 && source.length > 0 && !videoError
        ? (
          <>
            <div
              className="t-control"
              style={{
                position: 'absolute', width: '90%', transform: 'translate(-50%)', left: '50%', top: '10px', zIndex: 5, alignItems: 'center',
              }}
            >
              <div className={styles.videoWidget__closeBox}>
                <img
                  className={styles.videoWidget__closeBox__icon}
                  src={CloseIcon.src}
                  alt="close"
                  onClick={() => handleClose()}
                />
              </div>
            </div>

            <div className={styles.videoWidget__barBox}>
              {(control.height === '350' && videoRef && videoRef.current && videoRef.current.currentTime)
                ? (
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {source.length > 1 ? source.map((ele: any, i: number) => (
                      <progress
                        max="100"
                        value={videoNo === i
                          ? (control.range === 100 ? updateTime()
                            : control.range) : (videoNo > i ? 100 : 0)}
                        onChange={(e) => handleRangeUpdate(e)}
                        className={styles.videoWidget__barBox__progress}
                        style={{ width: 160 / source.length }}
                      />
                      // <input
                      //   type="range"
                      //   min="0"
                      //   max="100"
                      //   value={videoNo === i
                      //     ? (control.range === 100 ? updateTime()
                      //       : control.range) : (videoNo > i ? 100 : 0)}
                      //   onChange={(e) => handleRangeUpdate(e)}
                      //   style={{ width: 200 / source.length }}
                      //   disabled={videoNo > i}
                      // />
                    )) : ''}
                  </div>
                ) : ''}
            </div>
            {control.height === '350' ? (
              <div
                className={styles.videoWidget__playBox}
              >
                <img
                  className={styles.videoWidget__playBox__icon}
                  src={control.autoPlay ? PauseIcon.src : PlayIcon.src}
                  alt=""
                />
              </div>
            ) : ''}
            <div className={styles.videoWidget__barBox__bottom}>
              {(control.height === '350' && videoRef && videoRef.current
              && videoRef.current.currentTime) && (
                <>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={control.range}
                    style={{ zIndex: 1000, width: '160px' }}
                    onChange={(e) => handleRangeUpdate(e)}
                    className={styles.videoWidget__barBox__range}
                  />
                  <div className={styles.videoWidget__barBox__bottom__time}>
                    <div>
                      {Math.floor(videoRef.current.currentTime / 60) < 10
                        ? `0${Math.floor(videoRef.current.currentTime / 60)}`
                        : Math.floor(videoRef.current.currentTime / 60)}
                      :
                      {Math.floor(videoRef.current.currentTime % 60) < 10
                        ? `0${Math.floor(videoRef.current.currentTime % 60)}`
                        : Math.floor(videoRef.current.currentTime % 60)}
                    </div>
                    <div>
                      {Math.floor(videoRef.current.duration / 60) < 10
                        ? `0${Math.floor(videoRef.current.duration / 60)}`
                        : Math.floor(videoRef.current.duration / 60)}
                      :
                      {Math.floor(videoRef.current.duration % 60) < 10
                        ? `0${Math.floor(videoRef.current.duration % 60)}`
                        : Math.floor(videoRef.current.duration % 60)}
                    </div>
                  </div>
                </>
              )}
            </div>
            <video
              key={source[videoNo]}
              ref={videoRef}
              style={{ objectFit: 'fill', borderRadius: '15px' }}
              height={control.height}
              width={control.width}
              src={source[videoNo]}
              autoPlay={control.autoPlay}
              muted={control.mute}
              loop={control.loop}
              onTimeUpdate={(e) => handleChange(e)}
              onClick={() => handleClick()}
              onError={() => handleError()}
            />
            {control.height !== '350' ? (
              <div
                className={styles.videoWidget__howToBox}
              >
                <img
                  src={PlayIcon.src}
                  alt=""
                />
                <p>How To Use</p>
              </div>
            ) : ''}
          </>
        ) : ''}
      {display === 'mobile' && type === 2 && source.length > 0 && !videoError ? (
        <div onClick={() => handleLiveClick()} style={{ display: 'flex' }}>
          <video
            key={source[videoNo]}
            ref={videoRef}
            style={{ objectFit: 'fill', borderRadius: '15px' }}
            height={30}
            width={150}
            src={source[videoNo]}
            autoPlay={control.autoPlay}
            muted={control.mute}
            loop={control.loop}
            onClick={() => mobileViewClick()}
            onTimeUpdate={(e) => handleChange(e)}
            onError={() => handleError()}
          />
          <div
            className={styles.videoWidget__howToBox}
          >
            <img
              src={PlayIcon.src}
              alt=""
            />
            <p>How To Use</p>
          </div>
        </div>
      ) : ''}
      {display === 'desktop' && type === 1 && source.length > 0 && !videoError
        ? (
          <>
            <div
              className="t-control"
              style={{
                position: 'absolute', width: '90%', transform: 'translate(-50%)', left: '50%', top: '10px', zIndex: 5, alignItems: 'center',
              }}
            >
              {control.height === '350' ? (
                <div className={styles.videoWidget__closeBox}>
                  <img
                    className={styles.videoWidget__closeBox__icon}
                    src={CloseIcon.src}
                    alt="close"
                    onClick={() => handleClose()}
                  />
                </div>
              ) : ''}
            </div>

            <div className={styles.videoWidget__barBox}>
              {(control.height === '350' && videoRef && videoRef.current && videoRef.current.currentTime)
                ? (
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {source.length > 1 ? source.map((ele: any, i: number) => (
                      <progress
                        max="100"
                        value={videoNo === i
                          ? (control.range === 100 ? updateTime()
                            : control.range) : (videoNo > i ? 100 : 0)}
                        onChange={(e) => handleRangeUpdate(e)}
                        className={styles.videoWidget__barBox__progress}
                        style={{ width: 160 / source.length }}
                      />
                      // <input
                      //   type="range"
                      //   min="0"
                      //   max="100"
                      //   value={videoNo === i
                      //     ? (control.range === 100 ? updateTime()
                      //       : control.range) : (videoNo > i ? 100 : 0)}
                      //   onChange={(e) => handleRangeUpdate(e)}
                      //   className={styles.videoWidget__barBox__range}
                      //   style={{ width: 160 / source.length }}
                      //   disabled={videoNo !== i}
                      // />
                    )) : ''}
                  </div>
                ) : ''}
            </div>
            {control.height === '350' ? (
              <div
                className={styles.videoWidget__playBox}
              >
                <img
                  className={styles.videoWidget__playBox__icon}
                  src={control.autoPlay ? PauseIcon.src : PlayIcon.src}
                  alt=""
                />
              </div>
            ) : ''}

            <div className={styles.videoWidget__barBox__bottom}>
              {(control.height === '350' && videoRef && videoRef.current
                && videoRef.current.currentTime) ? (
                  <>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={control.range}
                      style={{ zIndex: 1000, width: '160px' }}
                      onChange={(e) => handleRangeUpdate(e)}
                      className={styles.videoWidget__barBox__range}
                    />
                    <div className={styles.videoWidget__barBox__bottom__time}>
                      <div>
                        {Math.floor(videoRef.current.currentTime / 60) < 10
                          ? `0${Math.floor(videoRef.current.currentTime / 60)}`
                          : Math.floor(videoRef.current.currentTime / 60)}
                        :
                        {Math.floor(videoRef.current.currentTime % 60) < 10
                          ? `0${Math.floor(videoRef.current.currentTime % 60)}`
                          : Math.floor(videoRef.current.currentTime % 60)}
                      </div>
                      <div>
                        {Math.floor(videoRef.current.duration / 60) < 10
                          ? `0${Math.floor(videoRef.current.duration / 60)}`
                          : Math.floor(videoRef.current.duration / 60)}
                        :
                        {Math.floor(videoRef.current.duration % 60) < 10
                          ? `0${Math.floor(videoRef.current.duration % 60)}`
                          : Math.floor(videoRef.current.duration % 60)}
                      </div>
                    </div>
                  </>
                ) : ''}
            </div>
            <video
              key={source[videoNo]}
              ref={videoRef}
              style={{ objectFit: 'fill', borderRadius: '15px' }}
              height={control.height}
              width={control.width}
              src={source[videoNo]}
              autoPlay={control.autoPlay}
              muted={control.mute}
              loop={control.loop}
              onTimeUpdate={(e) => handleChange(e)}
              onClick={() => handleClick()}
              onError={() => handleError()}
            />
            {control.height !== '350' ? (
              <div
                className={styles.videoWidget__howToBox}
              >
                <img
                  src={PlayIcon.src}
                  alt=""
                />
                <p>How To Use</p>
              </div>
            ) : ''}
          </>
        ) : ''}
    </div>
  );
};
export default VideoWidget;
