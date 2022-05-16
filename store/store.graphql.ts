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
  plan
  currencyCode

  settings{
    media
    brandColor
    customBg
    customColor
    imageUrl
    youtubeUrl
    bannerProductPage
    bannerCartPage
    bannerDesign
    bannerSummaryPage
  }
  campaigns{
    id
    name
    criteria
    storeId
    joinExisting
    rewards
    isActive
    settings{
      brandColor
      customBg
      customColor
      imageUrl
      youtubeUrl
      media
    }
    socialLinks{
      facebook
      instagram
      tiktok
      pinterest
      twitter       
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
    collections
    addableProducts

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
const GET_STORE_DETAILS = gql`
query store($id: String!) {
  store(id: $id) {
    id
    shop
    brandName
    plan
    totalGroupShop
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
    products
    collections
    addableProducts

    }
  }
`;
const CREATE_CAMPAIGN_DB = gql`
  mutation createCampaign($createCampaignInput: CreateCampaignInput!) {
    createCampaign(createCampaignInput: $createCampaignInput) {
    id
    status
    joinExisting
    criteria
    settings {
      media
      brandColor,
      customColor,
      customBg,
      imageUrl,
      youtubeUrl,
    }
    salesTarget {
      id
      name
      rewards{
        id
        discount
      }
    }
    socialLinks{
      instagram
      pinterest
      tiktok
      facebook
      twitter
    }
    products
    collections
    addableProducts

    }
  }
`;

const GET_PRODUCTS = gql`
query Products($productQueryInput: ProductQueryInput!) {
  products(productQueryInput: $productQueryInput) {
    id
    title
    createdAtShopify
    featuredImage
    description                             
    price
    options{
      id
      name
      values
      position
    }
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
    isActive
    settings {
      brandColor
      customColor
      customBg
      imageUrl
      youtubeUrl
      media
    }
    socialLinks{
      instagram
      pinterest
      tiktok
      facebook
      twitter
    }
    salesTarget {
      id
      name
      rogsMin
      rogsMax
      status
      rewards{
        customerCount
        discount
        id
      }
    }
    products
    collections
    addableProducts

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
    collections
    addableProducts
    }
  }
`;

const GET_GROUPSHOP = gql`
query Groupshop($code: String!) {
  groupshop(code: $code) {
    storeId
    id
    url
    milestones{
      discount
      activatedAt
    }
    bestSeller{
      featuredImage
      id
      title
      description
      price
      currencyCode
      outofstock
      options{
        id
        name
        values
        position
      }
      lineItems{
        product{
          id
        }
        price
      }
       
    }
    dealProducts{
      productId
      customerIP
      addedBy
      type
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
      lineItems{
        quantity
        price
      }
      refund{
        discount
        amount
      }
      orderDetail{
        customer{
          firstName
          lastName
          email
          phone
          ip
        }
        id
        currencyCode
        price
      }
      products{
        id
        title
        featuredImage
        description
        price
        options{
      id
      name
      values
      position
    }
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
      shop
      logoImage
      currencyCode
    }
  popularProducts{
    id
    featuredImage
    title
    description
    price
    options{
      id
      name
      values
      position
    }
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
    description
    price
    currencyCode
    purchaseCount
    outofstock
    options{
      id
      name
      values
      position
    }
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
      collections
      addableProducts
      socialLinks{
        instagram
        tiktok
        facebook
        twitter
      }
      settings{
        brandColor
        customColor
        customBg
        imageUrl
        youtubeUrl
        media
      }   
      salesTarget{
        id
        name
        rewards{
          id
          customerCount
          discount
        }    
      }
    } 
  }
}
`;

const ADD_DEAL_PRODUCT = gql`
  mutation AddDealProduct($updateGroupshopInput: UpdateGroupshopInput!) {
    addDealProduct(updateGroupshopInput: $updateGroupshopInput) {
        
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
          lastName
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
        lineItems{
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

const GET_ALL_CAMPAIGNS = gql`
query campaigns($storeId: String!) {
  campaigns(storeId: $storeId) {
    id
    name
    status
    joinExisting
    criteria
    isActive
    settings {
      media
      brandColor,
      customColor,
      customBg,
      imageUrl,
      youtubeUrl,
    }
    salesTarget {
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
    socialLinks{
      instagram
      pinterest
      tiktok
      facebook
      twitter
    }
    products
    collections
    addableProducts
    details{
      totalGroupshops
      totalRevenue
      totalCashback
    }

  }
}
`;

const GET_PRODUCT_DETAIL = gql`
 query ProductById($id: String!) {
  productById(id: $id) {
    id
    description
    images{
      id
      src
    }
    options{
      id
      name
      values
      position
    }
    variants{
      id
      title
      inventoryQuantity
      selectedOptions{
        name
        value
      }
      image{
        src
      }
      price
    }
   }
 }
`;

const GET_ACTIVE_STORES = gql`
query ACTIVE_STORES {
  activeStores{   
    shop
  }
}
`;

const GET_QR_DEAL = gql`
query GetQrDealLink($email: String!, $ordernumber: String!) {
  getQrDealLink(email: $email, ordernumber: $ordernumber) {    
    url, brandname
  }
}
`;
const GET_TOTAL_GS = gql`
query TotalGroupshops($storeId: String!) {
  totalGroupshops(storeId: $storeId) {
    id
    url
  }
}
`;
const GET_TOTAL_GS_FROM_BILLING = gql`
query FindTotalGS($storeId: String!) {
  findTotalGS(storeId: $storeId) {
    count
  }
}
`;

const GET_TOTAL_REVENUE = gql`
query FindTotalRevenue($storeId: String!) {
  findTotalRevenue(storeId: $storeId) {
    _id
    revenue
  }
}
`;
const GET_MONTHLY_GS = gql`
query GetMonthlyGSBilling($storeId: String!) {
  getMonthlyGSBilling(storeId: $storeId) {
    _id {
      year
      month
    }
    feeCharges
    cashBack
    revenue
    count
    totalGS
    }
}
`;
const GET_TOTAL_GS_MONTHLY = gql`
query FindTotalGSMonthly($storeId: String!) {
  findTotalGSMonthly(storeId: $storeId) {
    _id {
      year
      month
    }
    count
    }
}
`;
const GET_BILLING_BY_DATE = gql`
query GetBillingByDate($storeId: String!, $startDate: DateTime!, $endDate: DateTime!) {
  getBillingByDate(storeId: $storeId, startDate: $startDate, endDate: $endDate) {
    _id {
      date
      month
      year
    }
    revenue
    totalfeeByCashback
    totalfeeByGS
    totalCashback
    todaysTotalGS
    storeTotalGS
    storePlan
    feeformGroupshop{
       plan
      totalGS
      totalCharged
      }
    }
}
`;

const BILLING_SUBSCRIPTION = gql`
  mutation  BillingSubscription($shop: String!, $accessToken: String!){
  billingSubscription(shop:$shop, accessToken:$accessToken){
    redirectUrl
  }
}
`;

export {
  GET_STORE, UPDATE_STORE, TOTAL_PRODUCTS,
  GET_COLLECTIONS, CREATE_CAMPAIGN, GET_PRODUCTS,
  UPDATE_STORE_SETTINGS, UPDATE_CAMPAIGN, GET_APPSETTINGS,
  GET_SALES_TARGET, GET_PRODUCT_DETAIL, GET_GROUPSHOP,
  GET_CAMPAIGN_BY_ID, CREATE_CAMPAIGN_DB, ADD_DEAL_PRODUCT, GET_ALL_CAMPAIGNS,
  GET_ACTIVE_STORES, GET_QR_DEAL,
  GET_STORE_DETAILS, GET_TOTAL_GS, GET_MONTHLY_GS, GET_TOTAL_REVENUE,
  GET_BILLING_BY_DATE,
  GET_TOTAL_GS_MONTHLY, BILLING_SUBSCRIPTION, GET_TOTAL_GS_FROM_BILLING,
};
