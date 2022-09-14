import { useRouter } from 'next/router';
import { useState, useContext, useEffect } from 'react';
import { GroupshopContext } from 'store/groupshop.context';
import useCode from './useCode';
import useSteps from './useSteps';

const useOwnerOnboarding = () => {
  const [modelStep, setModelStep] = useState<any>();
  const { gsctx } = useContext(GroupshopContext);
  const [step, setStep] = useState<string>('');
  const { stepModal } = useSteps(step);
  const Router = useRouter();
  const {
    shop, discountCode, ownerCode, stepNumber,
  } = useCode();

  useEffect(() => {
    if (gsctx?.id) {
      if (gsctx?.obSettings && 'step' in gsctx?.obSettings) {
        setModelStep(gsctx?.obSettings?.step!);
      } else {
        setModelStep(0);
      }
    }
  }, [gsctx]);

  useEffect(() => {
    if (gsctx?.obSettings?.ownerUrl === `/${shop}/deal/${discountCode}/owner&${ownerCode}` && modelStep >= 0 && modelStep < 2) {
      Router.push(`/${shop}/deal/${discountCode}/owner&${ownerCode}/step&${modelStep}`);
    }
  }, [modelStep]);

  useEffect(() => {
    if (stepNumber && (+stepNumber! >= 0 || +stepNumber! <= 2)) {
      setStep(stepNumber!);
    } else {
      setStep('');
    }
  }, [stepNumber]);

  const countTotalDiscount = () => {
    let totalDiscount = 0;
    // eslint-disable-next-line array-callback-return
    gsctx.members[0]?.lineItems?.map((item: any) => {
      if (item.discountedPrice) {
        totalDiscount += item.discountedPrice * item.quantity;
      } else {
        totalDiscount += item.price * item.quantity;
      }
    });
    return totalDiscount;
  };

  const isOwner = !!ownerCode;

  return { stepModal, countTotalDiscount, isOwner };
};

export default useOwnerOnboarding;
