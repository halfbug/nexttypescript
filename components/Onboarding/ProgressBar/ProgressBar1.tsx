import Logo from 'assets/images/Logo.svg';
import React from 'react';

const ProgressBar1 = ({ progressWidth }:any) => (
  <div>
    <div
      style={{
        marginTop: '2.5vw',
        // marginLeft: "-3vw",
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
        width: '85vw',
        backgroundColor: '#E3E3E3',
      }}
    >
      <span
        style={{
          background:
              'linear-gradient(270deg, #FEE750 0%, #F4DEC4 15.31%, #CCB2F9 24.79%, #CCB2F9 33%, #FEE750 45%, #F4DEC4 48.31%, #CCB2F9 54.79%, #CCB2F9 66%, #FEE750 75%, #F4DEC4 82.31%, #CCB2F9 94.79%, #CCB2F9 100%)',
          width: progressWidth,
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {[1, 2, 3, 4].map((i:number) => (
          <>
            <span
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'row',
                paddingTop: '0.4vw',
                paddingBottom: '0.4vw',
              }}
            >
              <Logo />
              <Logo />
            </span>
          </>
        ))}
      </span>
    </div>
  </div>
);

export default ProgressBar1;
