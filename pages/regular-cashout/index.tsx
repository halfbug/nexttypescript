import RegularRewardsStep1 from 'components/InfluencerRewardPortal/Step1/RegularRewardsStep1';
import RegularRewardsStep2 from 'components/InfluencerRewardPortal/Step2/RegularRewardsStep2';
import { NextPage } from 'next';
import React, { useState } from 'react';

const RegularRewardCashout: NextPage = () => {
  const [showStep1, setShowStep1] = useState(true);
  const [showStep2, setShowStep2] = useState(false);

  return (
    <div>
      {showStep1 && (<RegularRewardsStep1 />)}
      {showStep2 && (<RegularRewardsStep2 />)}
    </div>
  );
};

export default RegularRewardCashout;
