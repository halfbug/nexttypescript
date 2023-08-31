import { DROPS_ALLPRODUCT, DROPS_SPOTLIGHT, DROPS_VAULT } from 'configs/constant';
import { useCallback } from 'react';

export default function useMergedVaultAndSpotlights() {
  const mergedVaultAndSpotlights = (dataForMearge: any, isForYou: boolean) => {
    const completedFY: string[] = [];
    const completed: string[] = [];

    const findShopifyId = (data: any, Index: number) => {
      if (Index !== -1) {
        const shopifyId = data[Index]?.shopifyId;
        return shopifyId;
      }
      return '';
    };

    const setAllProducts = (
      data: any,
      allProductElementIndex: number,
      replaceElementIndex: number,
      ForYou: boolean,
      CshopifyID: string,
      id: number,
      sectionName?: string,
    ) => {
      let products = data?.filter((item: { shopifyId: string; }) => (ForYou
        ? completedFY : completed).includes(item.shopifyId))
        .map((item: { products: any; }) => item.products)?.flat();
      if (!(isForYou
        ? completedFY : completed).includes(data[replaceElementIndex].shopifyId)) {
        products = [...products,
          ...data[replaceElementIndex]?.products];
      } else if (!(isForYou
        ? completedFY : completed).includes(data[allProductElementIndex].shopifyId)) {
        products = [...products,
          ...data[allProductElementIndex]?.products];
      }
      return {
        products,
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
      ForYou: boolean,
    ) => {
      let CshopifyID: any = csection?.shopifyId;

      const idsToCheck = [vaultShopifyId, spotlightShopifyId, allProductShopifyId];
      const completedIds = ForYou ? completedFY : completed;

      // eslint-disable-next-line no-restricted-syntax
      for (const id of idsToCheck) {
        if (id && !completedIds.includes(id)) {
          CshopifyID = id;
          break;
        }
      }

      return CshopifyID;
    };
    // Assuming your data is an array of elements
    const data = JSON.parse(JSON.stringify(isForYou ? dataForMearge?.sections : dataForMearge));

    // Find the index of the "All Products" element in the data
    const allProductElementIndex = data.findIndex(
      (element: { type: string; }) => element.type === DROPS_ALLPRODUCT,
    );

    if (allProductElementIndex !== -1) {
      // Find the indices of spotlight and vault elements

      const vaultElementIndex = data.findIndex(
        (element: { type: string; }) => element.type === DROPS_VAULT,
      );
      const spotlightElementIndex = data.findIndex(
        (element: { type: string; }) => element.type === DROPS_SPOTLIGHT,
      );

      if (spotlightElementIndex !== -1 || vaultElementIndex !== -1) {
        // Get shopifyIds for vault, spotlight, and all products elements
        const vaultShopifyId = findShopifyId(data, vaultElementIndex);
        const spotlightShopifyId = findShopifyId(data, spotlightElementIndex);
        const allProductShopifyId = findShopifyId(data, allProductElementIndex);
        const shopifyIds = [vaultShopifyId, spotlightShopifyId];

        data.forEach((section:any) => {
          if ((section?.pageInfo
            && !section?.pageInfo?.hasNextPage) || section.products.length < 10) {
            if (shopifyIds.includes(section.shopifyId)) {
              (isForYou ? completedFY : completed).push(section.shopifyId);
            }
          }
        });

        // find current section by shopifyId from data
        const csection = data.find((section: { shopifyId: any; }) => section.shopifyId === vaultShopifyId || (spotlightShopifyId || (allProductShopifyId || '')));
        if (csection?.pageInfo
            && !csection?.pageInfo?.hasNextPage) {
          if (!(isForYou ? completedFY : completed).includes(csection.shopifyId)) {
            (isForYou ? completedFY : completed).push(csection.shopifyId);
          }
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
        data[allProductElementIndex] = setAllProducts(
          data,
          allProductElementIndex,
          chosenElementIndex,
          isForYou,
          CshopifyID,
          dataForMearge?.id,
          dataForMearge?.name,
        );
        data.splice(chosenElementIndex, 1);
      } else {
        data[allProductElementIndex] = setAllProducts(
          data, allProductElementIndex,
          allProductElementIndex, isForYou, data[allProductElementIndex].shopifyId,
          dataForMearge?.id,
          dataForMearge?.name,
        );
      }
    }

    return data;
  };
  return {
    mergedVaultAndSpotlights,
  };
}