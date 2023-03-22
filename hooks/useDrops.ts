import { useMutation } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';
import { CREATE_ONBOARDING_DISCOUNT_CODE, UPDATE_DROP_GROUPSHOP } from 'store/store.graphql';
import useAppContext from './useAppContext';
import useCode from './useCode';
import useUtilityFunction from './useUtilityFunction';

export default function useDrops() {
  const [showObPopup, setShowObPopup] = useState<boolean>(false);
  const { gsctx, dispatch } = useAppContext();
  const { ownerCode, shop, discountCode } = useCode();
  const { formatNumber } = useUtilityFunction();

  const THE_VAULT_TITLE = 'The Vault';
  const SPOTLIGHT_SECTION_TITLE = 'Today’s Spotlight';

  const {
    milestones, store, members, spotlightProducts: sproducts, sections,
  } = gsctx;
  const [updateDropGroupshop] = useMutation(UPDATE_DROP_GROUPSHOP);
  const [createOnBoardingDiscountCode] = useMutation(CREATE_ONBOARDING_DISCOUNT_CODE);

  const [currentDropReward, setcurrentDropReward] = useState<String>('');
  const [nextDropReward, setnextDropReward] = useState<String | null>('');
  const [spotlightProducts, setspotlightProducts] = useState<String[]>([]);

  const [btnDisable, setbtnDisable] = useState<boolean>(false);

  useEffect(() => {
    if (gsctx) {
      const ownerOnboardingStep = gsctx.obSettings?.step;
      if (ownerOnboardingStep === 0) {
        setShowObPopup(true);
      }
    }
  }, [gsctx]);

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
    setbtnDisable(true);
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
    }).catch((err) => setbtnDisable(false));

    await createOnBoardingDiscountCode({
      variables: {
        gid: gsctx.id,
      },
    }).then((res) => {
      if (res?.data?.createOnBoardingDiscountCode) {
        const { data } = res;
        dispatch({
          type: 'UPDATE_GROUPSHOP',
          payload: {
            ...gsctx,
            discountCode: data?.createOnBoardingDiscountCode?.discountCode,
            expiredAt: data?.createOnBoardingDiscountCode?.expiredAt,
            obSettings: { ...gsctx.obSettings, step: 1 },
          },
        });
        setShowObPopup(false);
      }
    }).catch((err) => setbtnDisable(false));
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

  // useEffect(() => {
  //   if (sproducts) {
  //     const ids = sproducts?.map((p) => p.id);
  //     setspotlightProducts(ids);
  //   }
  // }, [sproducts]);

  useEffect(() => {
    if (sections) {
      const temp: any[] = [];
      const ids = sections
        .filter((c) => c.name === THE_VAULT_TITLE || c.name === SPOTLIGHT_SECTION_TITLE)
        ?.map((c) => c.products.map((p) => temp.push(p.id)));
      setspotlightProducts(temp);
    }
  }, [sections]);

  const VSPrice = useCallback((price: any) => (+(price)).toFixed(2).toString().replace('.00', ''), [gsctx]);

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
      percantage: (percantage >= 100 ? 100 : percantage),
      remainedValue: formatNumber(remainedValue),
    };
    return cart;
  };

  const updatePurhaseCount = useCallback((
    secondaryCount, purchaseCount,
  ) => (secondaryCount + purchaseCount), []);

  return {
    THE_VAULT_TITLE,
    SPOTLIGHT_SECTION_TITLE,
    currentDropReward,
    nextDropReward,
    showObPopup,
    spotlightProducts,
    btnDisable,
    setShowObPopup,
    updateOnboarding,
    canBeUnlockedCB,
    getChackback,
    cartValueProgress,
    updatePurhaseCount,
    VSPrice,
  };
}
