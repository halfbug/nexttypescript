import React, { useCallback } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Step0 from 'components/Onboarding/Step0/step0';
import Step1 from 'components/Onboarding/Step1/step1';

const useInstallation = (ins:string | string[] | undefined) => {
  const installationDialogue = useCallback(():React.ReactNode => {
    switch (ins) {
      case '0':
        return (
          <Step0 show />
        );
      case '1':
        return (
          <Step1 show />
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
