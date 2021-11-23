import React, { useCallback } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Step0 from 'components/Onboarding/Step0/step0';
import Step1 from 'components/Onboarding/Step1/step1';
import Step2 from 'components/Onboarding/Step2/step2';
import Screen1 from 'components/Onboarding/Step2a/Screen1';
import Step3 from 'components/Onboarding/Step3/step3';
import Step4 from 'components/Onboarding/Step4/step4';

const useInstallation = (ins: string | string[] | undefined) => {
  const installationDialogue = useCallback((): React.ReactNode => {
    switch (ins) {
      case '0':
        return (
          <Step0 show />
        );
      case '1':
        return (
          <Step1 show />
        );
      case '2':
        return (
          <Step2 show />
        );
      case '2a':
        return (
          <Screen1 show />
        );
      case '3':
        return (
          <Step3 show />
        );
      case '4':
        return (
          <Step4 show />
        );
      default:
        return (
          <></>
        );
    }
  }, [ins]);
  return { installationDialogue };
};
export default useInstallation;
