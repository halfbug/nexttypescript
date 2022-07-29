/* eslint-disable import/no-named-default */
import React, { useCallback } from 'react';
import { default as Step0 } from 'components/Groupshop/OnBoardingFlowRegular/OnBoardWelcomeRegular';
import { default as Step1 } from 'components/Groupshop/OnBoardingFlowRegular/OnBoardRewardRegular';
import { default as Step2 } from 'components/Groupshop/OnBoardingFlowRegular/OnBoardProfileRegular';
import { default as Step3 } from 'components/Groupshop/OnBoardingFlowRegular/OnBoardTimeToShine';

const useSteps = (stepCount: string | string[] | undefined) => {
  const stepModal = useCallback((): React.ReactNode => {
    switch (stepCount) {
      case '0':
        return (
          <Step0 open />
        );
      case '1':
        return (
          <Step1 open />
        );
      case '2':
        return (
          <Step2 open />
        );
      case '3':
        return (
          <Step3 open />
        );
      default:
        return (
          <></>
        );
    }
  }, [stepCount]);
  return { stepModal };
};
export default useSteps;
