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
  mutation UpdateStore($text: String!) {
    updateStore(text: $text) {
      id
      text
    }
  }
`;

export { GET_STORE, UPDATE_STORE };
