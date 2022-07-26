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
  appTrialEnd

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
    appTrialEnd
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

const CREATE_PARTNER_DB = gql`
  mutation createPartner($createPartnersInput: CreatePartnersInput!) {
    createPartner(createPartnersInput: $createPartnersInput) {
    id
    storeId
    campaignId
    url
    shortUrl
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
    partnerDetails{
      fname
      lname
      email
      shopifyCustomerId
    }
    partnerRewards{
      baseline
      average
      maximum
    }
    partnerCommission
    isActive
    createdAt
    }
  }
`;

const GET_ALL_PARTERS = gql`
query partnerGroupShops($storeId: String!) {
  partnerGroupshops(storeId: $storeId) {  
    id
    campaignId
    url
    shortUrl
    partnerCommission
    isActive  
    discountCode {
      title
      percentage
      priceRuleId  
    }
    partnerRewards {
      baseline
      average
      maximum
    }
    partnerDetails {
      fname
      lname
      email
      shopifyCustomerId 
    }
  }
}
`;

const UPDATE_PARTNER_GROUPSHOP = gql`
  mutation updatePartnerGroupshop(
    $updatePartnersInput: UpdatePartnersInput!
    ) {
    updatePartnerGroupshop(updatePartnersInput: $updatePartnersInput) {
    id
    isActive
    partnerCommission
    }
  }
`;

const EXIT_PARTNER_GROUPSHOP = gql`
query ExistPartnerGroupshop($email: String!, $storeId: String!) {
  existPartnerGroupshop(email: $email, storeId: $storeId) {    
    isActive
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
query Groupshop($code: String!, $status: String = "") {
  groupshop(code: $code, status: $status) {
    storeId
    id
    url
    shortUrl
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
        discountedPrice
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
    feeChargesGS
    totalCharges
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
query GetBillingByDate($storeId: String!, $month: String!, $year: String!) {
  getBillingByDate(storeId: $storeId, month: $month, year: $year) {
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
    store{
      appTrialEnd
      plan
    }
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

const CREATE_SIGNUP = gql`
  mutation createSignUp($createSignUpInput: CreateSignUpInput!) {
    createSignUp(createSignUpInput: $createSignUpInput) {
    email
    }
  }
`;

const GET_OVERVIEW_DATA = gql`
query overviews($storeId: String!) {
  overviews(storeId: $storeId) {
    id
    name
  }
}
`;

const GET_OVERVIEW_METRICS = gql`
query overviewMetric($storeId: String!, $startFrom: String!, $toDate: String!) {
  overviewMetrics(storeId: $storeId, startFrom: $startFrom, toDate: $toDate) {
    cashBack
    revenue   
  }
}
`;

const GET_OVERVIEW_METRICS_BY_CAMPAIGN_FILTER = gql`
query overviewCampaignMetric($storeId: String!, $startFrom: String!, $toDate: String!) {
  overviewCampaignMetric(storeId: $storeId, startFrom: $startFrom, toDate: $toDate) {
    cashBack
    revenue   
  }
}
`;

const GET_TOTAL_ORDERS = gql`
query getOrderCount($shop: String!) {
  getOrderCount(shop: $shop) {
    countTotalOrders
  }
}
`;

const GET_ORDERS_BY_GS = gql`
query getGsOrders($groupshopUrl: String!) {
  getGsOrders(groupshopUrl: $groupshopUrl) {    
    orderId
  }
}
`;

const GET_ORDER_DETAILS_BY_ID = gql`
query getOrderDetails($orderid: String!) {
  getOrderDetails(orderid: $orderid) {    
    orderId
  }
}
`;

const GET_TOTAL_UNIQUE_CLICKS_BY_ID = gql`
query getUniqueClicks($storeId: String!, $startFrom: String!, $toDate: String!) {
  getUniqueClicks(storeId: $storeId, startFrom: $startFrom, toDate: $toDate) {
    uniqueVisitors
    totalOrders
  }
}
`;

const GET_TOTAL_UNIQUE_CLICKS_BY_CAMPAIGN_FILTER = gql`
query getUniqueCampaignClicks($storeId: String!, $startFrom: String!, $toDate: String!) {
  getUniqueCampaignClicks(storeId: $storeId, startFrom: $startFrom, toDate: $toDate) {
    uniqueVisitors
    totalOrders
  }
}
`;

const GET_TOTAL_UNIQUE_CLICKS_BY_CAMPAIGN = gql`
query getCampaignUniqueClicks($campaignId: String!) {
  getCampaignUniqueClicks(campaignId: $campaignId) {
    uniqueVisitors
    totalOrders
  }
}
`;

const GET_CAMPAIGN_METRICS = gql`
query campaignMetric($storeId: String!, $campaignId: String!) {
  campaignMetric(storeId: $storeId,campaignId: $campaignId) {
    cashBack
    revenue    
  }
}
`;
const GET_PARTNER_GROUPSHOP = gql`
query PartnerGroupshop($code: String!) {
  partnerGroupshop(code: $code) {
    storeId
    id
    url
    shortUrl
    visitors
    members {
      orderId
      availedDiscount
      role
      products{
        id
        title
        price
        featuredImage
      }
    }
    partnerDetails {
      fname
      lname
      email
    }
    partnerRewards {
      baseline
      average
      maximum

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
      isInfluencer
    }
    discountCode{
      title
      percentage
      priceRuleId
      
    }
    createdAt
    totalProducts
    memberDetails{
      orderId
      lineItems{
        quantity
        price
        discountedPrice
        product{
          id
        }
        customer{
          firstName
          lastName
          email
          ip
        }
      }
        customerInfo{
          firstName
          lastName
          email
          phone
          ip
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
const ADD_DEAL_PRODUCT_PARTNER = gql`
  mutation AddDealProductPartner($updatePartnersInput: UpdatePartnersInput!) {
    addDealProductPartner(updatePartnersInput: $updatePartnersInput) {
    id
    dealProducts{
      productId
      customerIP
      addedBy
    }
      }
  }
`;

export {
  GET_STORE, UPDATE_STORE, TOTAL_PRODUCTS,
  GET_COLLECTIONS, CREATE_CAMPAIGN, GET_PRODUCTS,
  UPDATE_STORE_SETTINGS, UPDATE_CAMPAIGN, GET_APPSETTINGS,
  GET_SALES_TARGET, GET_PRODUCT_DETAIL, GET_GROUPSHOP,
  GET_CAMPAIGN_BY_ID, CREATE_CAMPAIGN_DB, ADD_DEAL_PRODUCT, GET_ALL_CAMPAIGNS,
  GET_ACTIVE_STORES, GET_QR_DEAL, CREATE_PARTNER_DB, GET_ALL_PARTERS,
  GET_STORE_DETAILS, GET_TOTAL_GS, GET_MONTHLY_GS, GET_TOTAL_REVENUE,
  GET_BILLING_BY_DATE, UPDATE_PARTNER_GROUPSHOP, EXIT_PARTNER_GROUPSHOP,
  GET_TOTAL_GS_MONTHLY, BILLING_SUBSCRIPTION, GET_TOTAL_GS_FROM_BILLING, CREATE_SIGNUP,
  GET_OVERVIEW_DATA, GET_OVERVIEW_METRICS, GET_TOTAL_ORDERS, GET_ORDERS_BY_GS,
  GET_ORDER_DETAILS_BY_ID, GET_TOTAL_UNIQUE_CLICKS_BY_ID, GET_TOTAL_UNIQUE_CLICKS_BY_CAMPAIGN,
  GET_CAMPAIGN_METRICS, GET_OVERVIEW_METRICS_BY_CAMPAIGN_FILTER,
  GET_TOTAL_UNIQUE_CLICKS_BY_CAMPAIGN_FILTER, GET_PARTNER_GROUPSHOP, ADD_DEAL_PRODUCT_PARTNER,
};
