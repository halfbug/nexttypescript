import { useMutation } from '@apollo/client';
import HowShopDropVideoBox from 'components/Groupshop/HowShopDropBox/HowShopVideoDropBox';
import React, { useCallback, useEffect, useState } from 'react';
import { UPDATE_DROP_GROUPSHOP } from 'store/store.graphql';
import useAppContext from './useAppContext';
import useCode from './useCode';

export default function useDrops() {
  const [showObPopup, setShowObPopup] = useState<boolean>(false);
  const { gsctx, isDrops } = useAppContext();
  const { ownerCode } = useCode();

  const {
    milestones, store, members, spotlightProducts: sproducts,
  } = gsctx;
  const [updateDropGroupshop] = useMutation(UPDATE_DROP_GROUPSHOP);

  const [currentDropReward, setcurrentDropReward] = useState<String>('');
  const [nextDropReward, setnextDropReward] = useState<String | null>('');
  const [spotlightProducts, setspotlightProducts] = useState<String[]>([]);

  useEffect(() => {
    if (ownerCode && gsctx) {
      const ownerOnboardingStep = gsctx.obSettings?.step;
      if (ownerOnboardingStep === 0) {
        setShowObPopup(true);
      }
    }
  }, [ownerCode, gsctx]);

  useEffect(() => {
    if (milestones.length) {
      setcurrentDropReward(milestones[milestones.length - 1]?.discount);
    }

    if (store?.drops?.rewards?.baseline
      && store?.drops?.rewards?.average && store?.drops?.rewards?.maximum) {
      if (milestones[milestones.length - 1]?.discount
        === (store?.drops?.rewards?.baseline).toString()) {
        setnextDropReward((store?.drops?.rewards?.average).toString());
      } else if (milestones[milestones.length - 1]?.discount
        === (store?.drops?.rewards?.average).toString()) {
        setnextDropReward((store?.drops?.rewards?.maximum).toString());
      } else {
        setnextDropReward(null);
      }
    }
  }, [store?.drops, milestones]);

  const updateOnboarding = async () => {
    await updateDropGroupshop({
      variables: {
        updateDropsGroupshopInput: {
          id: gsctx.id,
          obSettings: {
            ...gsctx.obSettings,
            step: 1,
          },
        },
      },
    }).then((res) => {
      setShowObPopup(false);
    });
  };

  const canBeUnlockedCB = useCallback(
    () => {
      if (store?.drops?.rewards?.baseline
        && store?.drops?.rewards?.average && store?.drops?.rewards?.maximum && members.length) {
        if (members.length === 1) {
          const temp = (((store?.drops?.rewards?.average - store?.drops?.rewards?.baseline)
            * parseFloat(getTotalFromIndex(0))) / 100);

          return Number.isInteger(temp)
            ? temp
            : temp.toFixed(2);
        }

        if (members.length === 2) {
          const temp = (((store?.drops?.rewards?.maximum - store?.drops?.rewards?.average)
            * parseFloat(getTotalFromIndex(0))) / 100)
          + (((store?.drops?.rewards?.maximum - store?.drops?.rewards?.average)
          * parseFloat(getTotalFromIndex(1))) / 100);

          return Number.isInteger(temp)
            ? temp
            : temp.toFixed(2);
        }

        return 0;
      }

      return 0;
    },
    [store?.drops, members],
  );

  const getTotalFromIndex = (index: number) => members[index]?.lineItems
    ?.map((item: any) => +item.price * item.quantity)
    ?.reduce((total: any, curr: any) => total + curr, 0);

  useEffect(() => {
    if (sproducts) {
      const ids = sproducts?.map((p) => p.id);
      setspotlightProducts(ids);
    }
  }, [sproducts]);

  return {
    currentDropReward,
    nextDropReward,
    showObPopup,
    spotlightProducts,
    setShowObPopup,
    updateOnboarding,
    canBeUnlockedCB,
  };
}
