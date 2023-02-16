import { useMutation } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';
import { UPDATE_DROP_GROUPSHOP } from 'store/store.graphql';
import useAppContext from './useAppContext';
import useCode from './useCode';
import useUtilityFunction from './useUtilityFunction';

export default function useDrops() {
  const [showObPopup, setShowObPopup] = useState<boolean>(false);
  const { gsctx, dispatch } = useAppContext();
  const { ownerCode, shop, discountCode } = useCode();
  const { formatNumber } = useUtilityFunction();

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
      if (ownerOnboardingStep === 0
        && gsctx?.obSettings?.ownerUrl === `/${shop}/drops/${discountCode}/owner&${ownerCode}`) {
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
    }).then(() => {
      dispatch({
        type: 'UPDATE_GROUPSHOP',
        payload: {
          ...gsctx,
          obSettings: { ...gsctx.obSettings, step: 1 },
        },
      });
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

          return formatNumber(temp);
        }

        if (members.length === 2) {
          const temp = (((store?.drops?.rewards?.maximum - store?.drops?.rewards?.average)
            * parseFloat(getTotalFromIndex(0))) / 100)
            + (((store?.drops?.rewards?.maximum - store?.drops?.rewards?.average)
              * parseFloat(getTotalFromIndex(1))) / 100);

          return formatNumber(temp);
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

  const getChackback = useCallback(() => {
    const reward1 = +store?.drops?.rewards?.baseline!;
    const reward2 = +store?.drops?.rewards?.average!;
    const reward3 = +store?.drops?.rewards?.maximum!;
    const cashbackPercantage1 = reward2 - reward1;
    const cashbackPercantage2 = reward3 - reward2;

    if (!gsctx.id) {
      return '...';
    }

    if (members.length === 1) {
      const totalAmount = getTotalFromIndex(0);
      const cashback = (totalAmount * cashbackPercantage1) / 100;
      return formatNumber(cashback);
    }
    if (members.length === 2) {
      // CASHBACK OF FIRST MEMBER
      const totalAmount1 = getTotalFromIndex(0);
      const cashback1 = (totalAmount1 * cashbackPercantage1) / 100;

      // CASHBACK OF SECOND MEMBER
      const totalAmount2 = getTotalFromIndex(1);
      const cashback2 = (totalAmount2 * cashbackPercantage2) / 100;
      // CASHBACK OF FIRST MEMBER ON ARRIVING OF THIRD MEMBER
      const cashback3 = (totalAmount1 * cashbackPercantage2) / 100;
      // console.log('cashbacks', {
      //   cashback1, cashback2, cashback3,
      // });
      const totalCashback = +(cashback3 + cashback2 + cashback1);
      return formatNumber(totalCashback);
    }
    return 0;
  }, [gsctx, store]);

  const cartValueProgress = (cartValue: any) => {
    const baseValue = 50;
    const percantage = (+cartValue * 100) / baseValue;
    const remainedValue = baseValue - cartValue;
    const cart = {
      percantage,
      remainedValue: formatNumber(remainedValue),
    };
    return cart;
  };

  return {
    currentDropReward,
    nextDropReward,
    showObPopup,
    spotlightProducts,
    setShowObPopup,
    updateOnboarding,
    canBeUnlockedCB,
    getChackback,
    cartValueProgress,
  };
}
