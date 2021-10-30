import React, { useCallback } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Step0 from 'components/Onboarding/Step0/step0';

const useInstallation = (ins:string | string[] | undefined) => {
  const installationDialogue = useCallback(():React.ReactNode => {
    switch (ins) {
      case '0':
        return (
          <Step0 show />
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
