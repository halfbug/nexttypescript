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

export { GET_STORE, UPDATE_STORE };
