import { DROPS_ALLPRODUCT, DROPS_SPOTLIGHT, DROPS_VAULT } from 'configs/constant';
import { useCallback } from 'react';

export default function useMergedVaultAndSpotlights() {
  const completedFY: string[] = [];
  const completed: string[] = [];

  const findShopifyId = (data: any, Index: number) => {
    if (Index !== -1) {
      return data[Index]?.shopifyId;
    }
    return '';
  };

  const setAllProducts = (
    data: any,
    allProductElementIndex: number,
    replaceElementIndex: number,
    isForYou: boolean,
    CshopifyID: string,
    id: number,
    sectionName?: string,
  ) => {
    const shopifyId = findShopifyId(data, replaceElementIndex);
    return {
      products: (shopifyId && (isForYou
        ? completedFY : completed).includes(shopifyId))
        ? [...data[replaceElementIndex]?.products,
          ...data[allProductElementIndex]?.products]
        : data[replaceElementIndex]?.products,
      name: isForYou ? sectionName : 'All products',
      shopifyId: CshopifyID,
      type: isForYou ? 'forYou' : DROPS_ALLPRODUCT,
      pageInfo: null,
      id: isForYou ? id : '',
    };
  };

  const getUpdatedShopifyID = (
    csection: any,
    vaultShopifyId: any,
    spotlightShopifyId: any,
    allProductShopifyId: any,
    isForYou: boolean,
  ) => {
    let CshopifyID: any = csection?.shopifyId;

    const idsToCheck = [vaultShopifyId, spotlightShopifyId, allProductShopifyId];
    const completedIds = isForYou ? completedFY : completed;

    // eslint-disable-next-line no-restricted-syntax
    for (const id of idsToCheck) {
      if (id && !completedIds.includes(id)) {
        CshopifyID = id;
        break;
      }
    }

    return CshopifyID;
  };

  const mergedVaultAndSpotlights = (dataForMearge: any, isForYou: boolean) => {
    // Assuming your data is an array of elements
    const data = JSON.parse(JSON.stringify(isForYou ? dataForMearge?.sections : dataForMearge));

    // Find the index of the "All Products" element in the data
    const allProductElementIndex = data.findIndex(
      (element: { type: string; }) => element.type === DROPS_ALLPRODUCT,
    );

    if (allProductElementIndex !== -1) {
      // Find the indices of spotlight and vault elements
      const spotlightElementIndex = data.findIndex(
        (element: { type: string; }) => element.type === DROPS_SPOTLIGHT,
      );
      const vaultElementIndex = data.findIndex(
        (element: { type: string; }) => element.type === DROPS_VAULT,
      );

      if (spotlightElementIndex !== -1 || vaultElementIndex !== -1) {
        // Get shopifyIds for vault, spotlight, and all products elements
        const vaultShopifyId = findShopifyId(data, vaultElementIndex);
        const spotlightShopifyId = findShopifyId(data, spotlightElementIndex);
        const allProductShopifyId = findShopifyId(data, allProductElementIndex);

        // find current section by shopifyId from data
        const csection = data.find((section: { shopifyId: any; }) => section.shopifyId === vaultShopifyId || (spotlightShopifyId || (allProductShopifyId || '')));
        if (csection?.pageInfo
            && !csection?.pageInfo?.hasNextPage) {
          (isForYou ? completedFY : completed).push(csection.shopifyId);
        }

        // find current shopifyId from data by Completed section in pagination
        // if has in completed section then update current shopifyId with new shopify
        // Get the updated shopifyId using the common function
        const CshopifyID: any = getUpdatedShopifyID(
          csection, vaultShopifyId, spotlightShopifyId, allProductShopifyId, isForYou,
        );

        // Update the "All Products" element based on the found element's index
        const indexesToCheck = [vaultElementIndex, spotlightElementIndex, allProductElementIndex];
        const chosenElementIndex = indexesToCheck.find((index) => index !== -1);
        const indexValueMap = {
          '-1': 3,
          [vaultElementIndex]: 1,
          [spotlightElementIndex]: 2,
        };
        const chosenValue = indexValueMap[chosenElementIndex];
        data[allProductElementIndex] = setAllProducts(
          data,
          allProductElementIndex,
          chosenElementIndex,
          isForYou,
          CshopifyID,
          chosenValue,
          dataForMearge?.name,
        );
        data.splice(chosenElementIndex, 1);
      } else {
        data[allProductElementIndex] = setAllProducts(
          data, allProductElementIndex,
          allProductElementIndex, isForYou, data[allProductElementIndex].shopifyId, 4,
          dataForMearge?.name,
        );
      }
    }

    return data;
  };
  return {
    mergedVaultAndSpotlights,
    findShopifyId,
    setAllProducts,
  };
}
