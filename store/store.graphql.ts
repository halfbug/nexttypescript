import { gql } from '@apollo/client';

const GET_STORE = gql`
query StoreName($shop: String!) {
  storeName(shop: $shop) {
    id
    shop
    installationStep
  }
}
`;

const UPDATE_STORE = gql`
  mutation UpdateStore($updateStoreInput: UpdateStoreInput!) {
    updateStore(updateStoreInput: $updateStoreInput) {
    id
    shop
    brandName
    installationStep
    }
  }
`;

const TOTAL_PRODUCTS = gql`
query TotalProducts($shop: String!) {
  TotalProducts(shop: $shop) {
    count
  }
}
`;

const GET_COLLECTIONS = gql`
query Collections($shop: String!) {
  collections(shop: $shop) {
    title
    id
    productsCount
    products{
      id
      title
      featuredImage
    }
  }
}
`;
const CREATE_CAMPAIGN = gql`
  mutation createCampaign($createCampaignInput: CreateCampaignInput!) {
    createCampaign(createCampaignInput: $createCampaignInput) {
    id
    status
    joinExisting
    productSelectionCriteria
    }
  }
`;

export {
  GET_STORE, UPDATE_STORE, TOTAL_PRODUCTS, GET_COLLECTIONS, CREATE_CAMPAIGN,
};
