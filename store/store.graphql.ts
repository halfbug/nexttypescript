import { gql } from '@apollo/client';

const GET_STORE = gql`
query StoreName($shop: String!) {
  storeName(shop: $shop) {
    id
  shopifySessionId
  accessToken
  installationStep
  shop
  brandName
  industry
  logoImage
  settings{
    brandColor
    customBg
    customColor
    imageUrl
    youtubeUrl
  }
  campaigns{
    id
    name
    criteria
    storeId
    joinExisting
    rewards
    settings{
      brandColor
      customBg
      customColor
      imageUrl
      youtubeUrl
    }
 
    salesTarget{
      id
      name
      rewards {
        id
        discount
      }
    }
    products
  }
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
      price
      currencyCode
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
    criteria
    }
  }
`;

const GET_PRODUCTS = gql`
query Collections($productQueryInput: ProductQueryInput!) {
  products(productQueryInput: $productQueryInput) {
    id
    title
    createdAtShopify
    featuredImage
    price
    currencyCode
  }
}
`;

const UPDATE_STORE_SETTINGS = gql`
  mutation UpdateStore($updateStoreInput: UpdateStoreInput!) {
    updateStore(updateStoreInput: $updateStoreInput) {
      settings
      installationStep
}
  }
`;
const UPDATE_CAMPAIGN = gql`
  mutation updateCampaign(
    $updateCampaignInput: UpdateCampaignInput!
    ) {
    updateCampaign(updateCampaignInput: $updateCampaignInput) {
    id
    name
    joinExisting
    criteria
    rewards
    settings {
      brandColor
      customColor
      customBg
      imageUrl
      youtubeUrl
    }
    salesTarget {
      id
      name
      rewards{
        discount
      }
    }
    products
    }
  }
`;

const GET_APPSETTINGS = gql`
query Appsettings {
  appsettings{
    salestargets{
      id
      name
      rogsMin
      rogsMax
      rewards{
        customerCount
        discount
        id
      }
    }
  }
}
`;

const GET_SALES_TARGET = gql`
query SalesTarget {
  salesTarget{
    status
    rogsMin
    rogsMax
    name
    id
    rewards{
      id
      customerCount
      discount
    }
  }
}
`;
const GET_CAMPAIGN_BY_ID = gql`
  query Campaign($campaignid: String!){
    campaign(id: $campaignid) {
    id
    name
    joinExisting
    criteria
    products
    }
  }
`;

const GET_GROUPSHOP = gql`
query Groupshop($code: String!) {
  groupshop(code: $code) {
    storeId
    id
    dealProducts{
      productId
      customerIP
      addedBy
    }
    discountCode{
      title
      percentage
      priceRuleId
      
    }
    expiredAt
    createdAt
    totalProducts
    members{
      orderId
      availedDiscount
      role 
      orderDetail{
        customer{
          firstName
          LastName
          email
          phone
          ip
        }
        id
        currencyCode
        price
      }
      products{
        title
        featuredImage
        price
        orders{
          product{
            id
          }
          price
        }
      }
    }
    store{
      brandName
    }
  popularProducts{
    id
    featuredImage
    title
    price
    currencyCode
    orders{
      product{
        id
      }
      quantity
      price
    }
  }
  allProducts{
    featuredImage
    id
    title
    price
    currencyCode
    lineItems{
      product{
        id
      }
      price
    }
  }
    campaign{
      name
      products
    } 
  }
}
`;

export {
  GET_STORE, UPDATE_STORE, TOTAL_PRODUCTS,
  GET_COLLECTIONS, CREATE_CAMPAIGN, GET_PRODUCTS,
  UPDATE_STORE_SETTINGS, UPDATE_CAMPAIGN, GET_APPSETTINGS, GET_SALES_TARGET,
  GET_GROUPSHOP, GET_CAMPAIGN_BY_ID,
};
