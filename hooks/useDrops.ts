import { useMutation } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';
import {
  CREATE_ONBOARDING_DISCOUNT_CODE,
  ADD_FAVORITE_PRODUCT,
  REMOVE_FAVORITE_PRODUCT,
} from 'store/store.graphql';
import { DROPS_SPOTLIGHT, DROPS_VAULT } from 'configs/constant';
import { CartRewards } from 'types/store';
import useAppContext from './useAppContext';
import useUtilityFunction from './useUtilityFunction';

export default function useDrops() {
  // Check
  const [showObPopup, setShowObPopup] = useState<boolean>(false);
  const [rewardArr, setRewardArr] = useState<CartRewards[]>([]);
  const [favoriteProducts, setFavoriteProducts] = useState<string[]>([]);

  const { gsctx, dispatch } = useAppContext();
  const { formatNumber } = useUtilityFunction();

  const {
    milestones, store, members, sections,
  } = gsctx;
  const [createOnBoardingDiscountCode] = useMutation(CREATE_ONBOARDING_DISCOUNT_CODE);
  const [addProductToFav] = useMutation(ADD_FAVORITE_PRODUCT);
  const [removeProductToFav] = useMutation(REMOVE_FAVORITE_PRODUCT);

  const [currentDropReward, setcurrentDropReward] = useState<String>('');
  const [nextDropReward, setnextDropReward] = useState<String | null>('');
  const [spotlightProducts, setspotlightProducts] = useState<String[]>([]);

  const [btnDisable, setbtnDisable] = useState<boolean>(false);
  const [spinner, setspinner] = useState<boolean>(false);

  useEffect(() => {
    if (gsctx) {
      const ownerOnboardingStep = gsctx.obSettings?.step;
      if (ownerOnboardingStep === 0) {
        setShowObPopup(true);
      }
      const prods: string[] = gsctx.favorite?.map((ele) => ele.id) ?? [];
      setFavoriteProducts(prods);
    }
  }, [gsctx]);

  useEffect(() => {
    if (gsctx.id && store?.drops?.cartRewards && store?.drops?.cartRewards?.length) {
      const arr = store?.drops?.cartRewards;
      const cartRewards = arr.slice().sort((a, b) => (+a.rewardValue) - (+b.rewardValue));
      setRewardArr(cartRewards);
    }
  }, [store]);

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
    setspinner(true);

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
      // collecting vault and spotlight products
      const temp: any[] = [];
      const ids = sections
        .filter((c) => c.type === DROPS_VAULT || c.type === DROPS_SPOTLIGHT)
        ?.map((c) => c.products.map((p) => temp.push(p.id)));
      setspotlightProducts(temp);

      // disable onboarding button logic
      const nsections = sections.filter((c) => c.type !== DROPS_VAULT
        && c.type !== DROPS_SPOTLIGHT);
      if (nsections.length) {
        setbtnDisable(false);
      } else {
        setbtnDisable(true);
      }
    }
  }, [sections]);

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
      const discoutn = (totalAmount * (reward1 / 100));
      return formatNumber(cashback + discoutn);
    }
    if (members.length === 2) {
      // CASHBACK OF FIRST MEMBER
      const totalAmount1 = getTotalFromIndex(0);
      const discoutn1 = (totalAmount1 * (reward1 / 100));
      const cashback1 = (totalAmount1 * cashbackPercantage1) / 100;

      // CASHBACK OF SECOND MEMBER
      const totalAmount2 = getTotalFromIndex(1);
      const cashback2 = (totalAmount2 * cashbackPercantage2) / 100;
      const discoutn2 = (totalAmount2 * (reward2 / 100));

      // CASHBACK OF FIRST MEMBER ON ARRIVING OF THIRD MEMBER
      const cashback3 = (totalAmount1 * cashbackPercantage2) / 100;
      // console.log('cashbacks', {
      //   cashback1, cashback2, cashback3,
      // });
      console.log('🚀 ~ file: useDrops.ts:173 ~ getChackback ~ discoutn:', cashback2);
      const totalCashback = +(cashback3 + cashback2 + cashback1 + discoutn1 + discoutn2);
      return formatNumber(totalCashback);
    }
    return 0;
  }, [gsctx, store]);

  const cartValueProgress = (cartValue: any) => {
    // const baseValue = 50;
    const baseValue = store?.drops?.cartRewards
      ?.map((ele) => parseInt(ele.rewardValue, 10))
      .reduce((curr, next) => curr + next, 0) ?? 0;
    const percantage = (+cartValue * 100) / baseValue;
    const remainedValue = baseValue - cartValue;
    const cart = {
      percantage: (percantage >= 100 ? 100 : percantage),
      remainedValue: formatNumber(remainedValue),
    };
    return cart;
  };

  const totalRewardsValue = () => {
    const totalRewardValue = store?.drops?.cartRewards
      ?.map((ele) => parseInt(ele.rewardValue, 10))
      .reduce((curr, next) => curr + next, 0) ?? 0;
    const totalRewards = store?.drops?.cartRewards?.length;
    return {
      totalRewardValue,
      totalRewards,
    };
  };

  const updatePurhaseCount = useCallback((
    secondaryCount, purchaseCount,
  ) => (secondaryCount + purchaseCount), []);

  const addProductToFavorite = (dropsId: string, productId: string) => {
    setFavoriteProducts([...favoriteProducts, productId]);
    addProductToFav({
      variables: {
        dropsId,
        productId,
      },
    }).then((res) => {
      dispatch({
        type: 'UPDATE_GROUPSHOP',
        payload: {
          ...gsctx,
          favorite: res.data?.addFavoriteProduct?.favorite,
        },
      });
    });
  };

  const removeFavoriteProduct = (dropsId: string, productId: string) => {
    const temp = favoriteProducts.filter((ele) => ele !== productId);
    setFavoriteProducts(temp);
    removeProductToFav({
      variables: {
        dropsId,
        productId,
      },
    }).then((res) => {
      dispatch({
        type: 'UPDATE_GROUPSHOP',
        payload: {
          ...gsctx,
          favorite: res.data?.removeFavoriteProduct?.favorite,
        },
      });
    });
  };

  return {
    currentDropReward,
    nextDropReward,
    showObPopup,
    spotlightProducts,
    btnDisable,
    spinner,
    rewardArr,
    favoriteProducts,
    setShowObPopup,
    updateOnboarding,
    canBeUnlockedCB,
    getChackback,
    cartValueProgress,
    updatePurhaseCount,
    totalRewardsValue,
    addProductToFavorite,
    removeFavoriteProduct,
  };
}
