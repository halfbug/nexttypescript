import { gql } from '@apollo/client';

const GET_STORE = gql`
query StoreName($shop: String!) {
  storeName(shop: $shop) {
    id
  installationStep
  shop
  brandName
  industry
  logoImage
  plan
  currencyCode
  appTrialEnd
  discoveryTool{
    status
    matchingBrandName{
      id
      brandName
    },
  }
  retentiontool{
    status
    updatedAt    
  }
  settings{
    general{
      media
      brandColor
      customBg
      imageUrl
      youtubeUrl
    }
    layout{
      bannerProductPage
      bannerCartPage
      bannerStyle
      bannerDesign
      bannerCustomColor
      callToActionText
      bannerSummaryPage
    }
    marketing{
      recoverAbandoned
      WhatsAppnotifications
      facebookPixels
      tiktokPixels
      googlePixels
      snapchatPixels   
    }
  }
  social{
    facebook
    instagram
    tiktok
    pinterest
    twitter       
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
  tier
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
    retentiontool{
      status
      updatedAt    
    }
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
    revenue
    comissionAmount
    lineitemsCount
    purchases 
    visitors
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
    orders{
      id
      name
      shopifyCreatedAt
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
    partnerRewards {
      baseline
      average
      maximum
    }
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
    purchaseCount
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
    exipredShortLink
    ownerDeals{
      id
      title
      featuredImage
      featuredVideo
      description
      purchaseCount
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
    milestones{
      discount
      activatedAt
    }
    bestSeller{
      id
      title
      featuredImage
      featuredVideo
      description
      purchaseCount
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
    ownerDealsProducts{
      productId
      customerIP
      addedBy
      type
    }
    refferalDealsProducts{
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
        featuredVideo
        description
        price
        outofstock
        purchaseCount
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
      settings{
        general{
          brandColor
          imageUrl
          youtubeUrl
          media
        }
        marketing{
          facebookPixels
          tiktokPixels
          googlePixels
          snapchatPixels          
        }
      }
      social{
        facebook
        instagram
        tiktok
        pinterest
        twitter       
      }
      discoveryTool{
        status
        matchingBrandName{
          id
          brandName
        },
      }
    }
  popularProducts{
    id
    title
    featuredImage
    featuredVideo
    description
    purchaseCount
    price
    outofstock
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
    id
    title
    featuredImage
    featuredVideo
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
    
    obSettings{ 
      ownerUrl
      allowEmails
      allowTexts
      mobileNumber
      shopHeader
      instagramLink
      pinteresrLink
      tiktokLink
      twitterLink
      themeBanner
      step
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
    purchaseCount
    outofstock
    images{
      id
      src
    }
    videos{
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
      inventoryPolicy
      inventoryManagement
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
query GetQrDealLink($email: String!) {
  getQrDealLink(email: $email) {    
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
const GET_TOTAL_PARTNER_REVENUE = gql`
query FindPartnerTotalRevenue($storeId: String!) {
  getPartnerRevenue(storeId: $storeId) {
    _id
    revenue
  }
}
`;
const GET_MONTH_COUNT = gql`
query GetStoreMonthsCount($storeId: String!) {
  getStoreMonthsCount(storeId: $storeId) {
    count
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
const GET_CUSTOM_MONTHLY_GS = gql`
query GetCustomMonthlyGSBilling($storeId: String!) {
  getCustomBilling(storeId: $storeId) {
    _id
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
const GET_CUSTOM_BILLING_BY_DATE = gql`
query GetCustomBillingByDate($storeId: String!, $sdate: String!) {
  getCustomBillingByDate(storeId: $storeId, sdate: $sdate) {
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
  mutation  BillingSubscription{
  billingSubscription{
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
    feeCharges
    revenue   
  }
}
`;

const GET_PARTNER_OVERVIEW_METRICS = gql`
query overviewPartnerMetric($storeId: String!, $startFrom: String!, $toDate: String!) {
  overviewPartnerMetric(storeId: $storeId, startFrom: $startFrom, toDate: $toDate) {
    cashBack
    feeCharges
    revenue   
  }
}
`;

const GET_OVERVIEW_METRICS_BY_CAMPAIGN_FILTER = gql`
query overviewCampaignMetric($storeId: String!, $startFrom: String!, $toDate: String!) {
  overviewCampaignMetric(storeId: $storeId, startFrom: $startFrom, toDate: $toDate) {
    cashBack
    feeCharges
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

const GET_PARTNER_UNIQUE_CLICKS_BY_ID = gql`
query getPartnerUniqueClicks($storeId: String!, $startFrom: String!, $toDate: String!) {
  getPartnerUniqueClicks(storeId: $storeId, startFrom: $startFrom, toDate: $toDate) {
    uniqueVisitors
    totalOrders
  }
}
`;

const GET_ACTIVE_GROUPSHOP_BY_SHOP = gql`
query getActiveGroupshop($storeId: String!) {
  getActiveGroupshop(storeId: $storeId) {
    shortUrl
    url    
  }
}
`;

const GET_ACTIVE_GROUPSHOPS_BY_EMAIL = gql`
query getActiveGroupshops($email: String!) {
  getActiveGroupshops(email: $email) {
    name
    isExpired
    refundDetail{
      amount
    }
    customer {
      firstName
      lastName
    }
    groupshop{
      expiredAt
      url
      members {
        role
      }
    }
    shop {
      logoImage
      brandName
    }
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
    feeCharges
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
    partnerCommission
    isActive
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
    influencerProducts{
      id
      featuredImage
      purchaseCount
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

    }
    refferalProducts{
      id
      featuredImage
      title
      description
      purchaseCount
      price
      options{
        id
        name
        values
        position
      }
      currencyCode
    }
      partnerDetails {
      fname
      lname
      email
      shopifyCustomerId
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
      settings{
        general{
          brandColor
          imageUrl
          youtubeUrl
          media
        }
        marketing{
          facebookPixels
          tiktokPixels
          googlePixels
          snapchatPixels          
        }
      }
    }
  popularProducts{
    id
    featuredImage
    title
    description
    purchaseCount
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

const ADD_DEAL_PRODUCT_CHANNEL = gql`
  mutation updateChannelGroupshop($updateChannelGroupshopInput: UpdateChannelGroupshopInput!) {
    updateChannelGroupshop(updateChannelGroupshopInput: $updateChannelGroupshopInput) {
    id
    dealProducts{
      productId
      customerIP
      addedBy
    }
      }
  }
`;

const SYNC_STORE_CUSTOMERS = gql`
query syncStoreCustomers($storeId: String!) {
  syncStoreCustomers(storeId: $storeId) {
    status        
  }
}
`;

const FIND_PENDING_GROUPSHOP = gql`
query findpendinggroupshop($shop: String!, $startDate: String!, $endDate: String!, $minOrderValue: String!) {
  findpendinggroupshop(shop: $shop, startDate: $startDate, endDate: $endDate, minOrderValue: $minOrderValue) {
    name
    id  
    createDate
    price
    haveGroupshop
    shopifyCreateAt
    customer{
      firstName
      lastName
      email
    }      
  }
}
`;

const CREATE_PAST_GROUPSHOP_LOG = gql`
  mutation createRetentiontool($createRetentiontoolInput: CreateRetentiontoolInput!) {
    createRetentiontool(createRetentiontoolInput: $createRetentiontoolInput) {
      status   
    }
  }
`;

const GET_ACTIVE_CAMPAIGN = gql`
query getActiveCampaign($storeId: String!) {
  getActiveCampaign(storeId: $storeId) {
    id
  }
}
`;

const GET_RETENTION_LOGS = gql`
query retentiontools($storeId: String!) {
  retentiontools(storeId: $storeId) {
    id 
    groupshopsCreated
    startDate
    endDate 
    minOrderValue
    createdAt
    progress    
  }
}
`;

const GET_RETENTION_ANALYTICS = gql`
query retentionanalytics($id: String!) {
  retentionanalytics(id: $id) {
    name
    id  
    shopifyCreateAt
    price 
    customer{
      firstName
      lastName
      email
    }   
  }
}
`;

const RETENTION_GROUPSHOP_PROGRESS = gql`
query retentionGroupshopPrgress($storeId: String!) {
  retentionGroupshopPrgress(storeId: $storeId) {
    progress        
  }
}
`;

const GET_MOST_VIRAL_PRODUCTS = gql`
query mostViralProducts($shop: String!, $startDate: String!, $endDate: String!) {
  mostViralProducts(shop: $shop, startDate: $startDate, endDate: $endDate) {
    _id
    purchaseCount
    revenue
    productDetails{
      title
      featuredImage
    }  
  }
}
`;

const GET_PARTNER_MOST_VIRAL_PRODUCTS = gql`
query partnerMostViralProducts($shop: String!, $startDate: String!, $endDate: String!) {
  partnerMostViralProducts(shop: $shop, startDate: $startDate, endDate: $endDate) {
    _id
    purchaseCount
    revenue
    productDetails{
      title
      featuredImage
    }  
  }
}
`;

const GET_MOST_VIRAL_PRODUCTS_BY_CAMPAIGN = gql`
query mostCampaignViralProducts($campaignId: String!) {
  mostCampaignViralProducts(campaignId: $campaignId) {
    _id
    purchaseCount
    revenue
    productDetails{
      title
      featuredImage
    }  
  }
}
`;

const GET_MOST_VIRAL_CUSTOMERS = gql`
query mostViralCustomers($storeId: String!, $startDate: String!, $endDate: String!) {
  mostViralCustomers(storeId: $storeId, startDate: $startDate, endDate: $endDate) {
    _id
    url
    shortUrl
    uniqueClicks
    numMembers
    lineItemsCount
    refund
    revenue
    members{
      id
      name
      createdAt      
      shop
      price 
      totalDiscounts
      customer{
        firstName
        lastName
        email
        phone
        ip
      }  
    }     
  }
}
`;

const GET_PARTNER_MOST_VIRAL_CUSTOMERS = gql`
query partnerViralCustomers($storeId: String!, $startDate: String!, $endDate: String!) {
  partnerViralCustomers(storeId: $storeId, startDate: $startDate, endDate: $endDate) {
    _id
    url
    shortUrl
    partnerCommission
    uniqueClicks
    numMembers
    lineItemsCount
    refund
    storeId  
    revenue
    createdAt
    discountCode{
      percentage
    }
    partnerDetails{
      fname
      email
    }
    members{
      groupshopId
      orderId
      orderAmount
      comissionAmount
      customerInfo{
        firstName
        lastName
        email      
      }  
    }
    orderName{
      id
      name
      createdAt
      price
      totalDiscounts       
    }     
  }
}
`;

const GET_MOST_VIRAL_CUSTOMERS_BY_CAMPAIGN = gql`
query mostCampaignViralCustomers($campaignId: String!) {
  mostCampaignViralCustomers(campaignId: $campaignId) {
    _id
    url
    shortUrl
    uniqueClicks
    numMembers
    lineItemsCount
    refund
    revenue
    members{
      id
      name
      createdAt      
      shop
      price 
      totalDiscounts
      customer{
        firstName
        lastName
        email
        phone
        ip
      }  
    }     
  }
}
`;

const GET_ORDER_LINEITEMS = gql`
query orderLineItems($parentId: String!) {
  orderLineItems(parentId: $parentId) {
    _id
    price
    discountedPrice
    quantity
    totalDiscounts
    product{
      title
      featuredImage
    }     
  }
}
`;

const GET_ALL_VIDEOS = gql`
  query videos($storeId: String!) {
    videos(storeId: $storeId) {
    _id
    name
    type
    status
    storeId
    orderId
    createdAt
    updatedAt
  }
}
`;

const GET_GRAPH_REVENUE = gql`
query GetGraphRevenue($storeId: String!) {
  getGraphRevenue(storeId: $storeId) {
    _id { 
      month
      year
    }    
    revenue
    }
}
`;

const GET_GRAPH_PARTNER_REVENUE = gql`
query graphPartnerRevenue($storeId: String!) {
  graphPartnerRevenue(storeId: $storeId) {
    _id { 
      month
      year
    }    
    revenue
    }
}
`;

const GET_GRAPH_REVENUE_BY_CAMPAIGN = gql`
query GetGraphRevenueByCampaign($storeId: String!, $campaignId: String!) {
  getGraphRevenueByCampaign(storeId: $storeId, campaignId: $campaignId) {
    _id { 
      month
      year
    }    
    revenue
    }
}
`;

const GET_GRAPH_REVENUE_BY_DATE = gql`
query GetGraphRevenueByDate($storeId: String!, $startDate: String!, $endDate: String!) {
  getGraphRevenueByDate(storeId: $storeId, startDate: $startDate, endDate: $endDate) {
    _id { 
      day
      month
      year
    }               
      revenue
      graphView
    }
}`;

const GET_GRAPH__PARTNER_REVENUE_BY_DATE = gql`
query getGraphPartnerRevenueByDate($storeId: String!, $startDate: String!, $endDate: String!) {
  getGraphPartnerRevenueByDate(storeId: $storeId, startDate: $startDate, endDate: $endDate) {
    _id { 
      day
      month
      year
    }               
      revenue
      graphView
    }
}`;

const GET_MATCHING_GS = gql`
  query MatchingGS($storeId: [String!]!) {
    matchingGS(storeId: $storeId) {
      id
      installationStep
      shop
      brandName
      industry
      logoImage
      plan
      currencyCode
      appTrialEnd
      discoveryTool{
        status
        matchingBrandName{
          id
          brandName
        },
      }
      settings{
        general{
          media
          brandColor
          customBg
          imageUrl
          youtubeUrl
        }
        layout{
          bannerProductPage
          bannerCartPage
          bannerStyle
          bannerDesign
          bannerCustomColor
          callToActionText
          bannerSummaryPage
        }
        marketing{
          recoverAbandoned
          WhatsAppnotifications
          facebookPixels
          tiktokPixels
          googlePixels
          snapchatPixels   
        }
      }
      groupshops{
        id
        createdAt
        campaignId
        storeId
        totalProducts
        url
        shortUrl
        exipredShortLink
        expiredAt
        obSettings{
          ownerUrl
          allowEmails
          allowTexts
          mobileNumber
          shopHeader
          instagramLink
          pinteresrLink
          tiktokLink
          twitterLink
          themeBanner
          step
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
        featuredVideo
        description
        price
        outofstock
        purchaseCount
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
        milestones{
          discount
          activatedAt
        }
      }
      campaign{
        id
        name
        criteria
        storeId
        joinExisting
        rewards
        isActive
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
      tier
      bestSeller{
        id
        title
        featuredImage
        description
        purchaseCount
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
      popularProducts{
        id
        title
        featuredImage
        description
        purchaseCount
        price
        outofstock
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
      members{
        orderId
        availedDiscount
        role
        lineItems{
          quantity
          price
          discountedPrice
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
          featuredVideo
          description
          price
          outofstock
          purchaseCount
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
      }
    }
`;

const DISCOVERYTOOLS_UPDATE = gql`
  mutation UpdateDiscoveryTools($updateDiscoveryTools: UpdateStoreInput!) {
    updateDiscoveryTools(UpdateDiscoveryTools: $updateDiscoveryTools) {
      id
      status
      discoveryTool{
        status
        matchingBrandName{
          id
          brandName
        }
      }
      createdAt
  }
}
`;
const GET_PARTNER_INFO = gql`
query GetAllPartnerTiersInfo($storeId: String!) {
  getAllPartnerTiersInfo(storeId: $storeId) {
    count
    tierName
    tierCharges
    tierLimit
    currentTierName
    currentTierCharges
    currentTierLimit
    allTiersInfo {
      staticName
      index
      name
      fee
      limit
      switchStartCount
    }
    switchCount

    }
}
`;

const GET_ACTIVE_CAMPAIGN_PRODUCTS = gql`
query activeCampaignWithProducts($shop: String!){
  activeCampaignWithProducts(shop: $shop) {
    allProducts{
      id
      title
      createdAtShopify
      purchaseCount
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
}
`;

const CREATE_CHANNEL_GROUPSHOP = gql`
mutation createChannelGroupshop($createChannelGroupshopInput: CreateChannelGroupshopInput!) {
  createChannelGroupshop(createChannelGroupshopInput: $createChannelGroupshopInput) {
    id
    storeId
    campaignId
    url
    shortUrl
    discountCode{
      title
      percentage
      priceRuleId
    }
  }
}
`;

const GET_CHANNEL_BY_NAME = gql`
query getChannelByName ($getChannelByName: GetChannelByName!) {
  getChannelByName(getChannelByName: $getChannelByName) {
    id
    name
    rewards {
      baseline
      maximum
      commission 
    }
    isActive
    storeId
  }
}`;

const CREATE_CHANNEL_DB = gql`
  mutation createChannel($createChannelInput: CreateChannelInput!) {
    createChannel(createChannelInput: $createChannelInput) {
    id
    storeId
    name
    slugName    
    rewards{
      baseline
      average
      maximum
      commission
    } 
    isActive
    }
  }
`;

const GET_ALL_RETAIL_TOOLS = gql`
query getChannels($storeId: String!) {
  getChannels(storeId: $storeId) {
    id         
    name
    slugName
    isActive      
    rewards {
      baseline
      maximum
      commission
    }  
  }
}
`;

const GET_CHANNEL_GROUPSHOP = gql`
query getChannelGroupshopByCode($code: String!) {
  getChannelGroupshopByCode(code: $code) {
    id
    storeId
    shortUrl
    url
    ownerProducts{
      id
      featuredImage
      purchaseCount
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
    }
    refferalProducts{
      id
      featuredImage
      title
      description
      purchaseCount
      price
      options{
        id
        name
        values
        position
      }
      currencyCode
    }

    customerDetail{
      firstName
      lastName
      email
      phone
    }

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
      lineItems{
        product{
          id
        }
        price
        quantity
      }
    }

    bestSeller{
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
    expiredAt
    totalProducts
    
    store{
      brandName
      shop
      logoImage
      currencyCode
      settings{
        general{
          brandColor
          imageUrl
          youtubeUrl
          media
        }
        marketing{
          facebookPixels
          tiktokPixels
          googlePixels
          snapchatPixels          
        }
      }
    }
  popularProducts{
    id
    featuredImage
    title
    description
    purchaseCount
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
}`;

const UPDATE_CHANNEL = gql`
  mutation updateChannel(
    $updateChannelInput: UpdateChannelInput!
    ) {
    updateChannel(updateChannelInput: $updateChannelInput) {
    id    
    name
    slugName
    rewards {
      commission
      baseline
      average
      maximum
    }
    }
  }
`;

const GET_ALL_RECENT_SIGNUP = gql`
query getRecentSignup($storeId: String!) {
  getRecentSignup(storeId: $storeId) {
    id         
    url
    shortUrl
    channel{
      name
      slugName
      isActive
      rewards {
        commission
        baseline
        average
        maximum
      }
    }          
    customerDetail {
      firstName
      lastName
      email
      phone
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
  GET_ACTIVE_GROUPSHOP_BY_SHOP, SYNC_STORE_CUSTOMERS, FIND_PENDING_GROUPSHOP,
  CREATE_PAST_GROUPSHOP_LOG, GET_ACTIVE_CAMPAIGN, GET_RETENTION_LOGS, GET_RETENTION_ANALYTICS,
  GET_ACTIVE_GROUPSHOPS_BY_EMAIL, RETENTION_GROUPSHOP_PROGRESS, GET_MOST_VIRAL_PRODUCTS,
  GET_ALL_VIDEOS, GET_CUSTOM_MONTHLY_GS, GET_MOST_VIRAL_CUSTOMERS,
  GET_ORDER_LINEITEMS, GET_MONTH_COUNT, GET_TOTAL_PARTNER_REVENUE, GET_CUSTOM_BILLING_BY_DATE,
  GET_GRAPH_REVENUE, GET_GRAPH_REVENUE_BY_DATE, CREATE_CHANNEL_DB, GET_ALL_RETAIL_TOOLS,
  UPDATE_CHANNEL, GET_PARTNER_INFO, GET_MATCHING_GS, DISCOVERYTOOLS_UPDATE, GET_ALL_RECENT_SIGNUP,
  GET_ACTIVE_CAMPAIGN_PRODUCTS, CREATE_CHANNEL_GROUPSHOP, GET_CHANNEL_GROUPSHOP,
  GET_CHANNEL_BY_NAME, ADD_DEAL_PRODUCT_CHANNEL, GET_MOST_VIRAL_PRODUCTS_BY_CAMPAIGN,
  GET_MOST_VIRAL_CUSTOMERS_BY_CAMPAIGN, GET_GRAPH_REVENUE_BY_CAMPAIGN, GET_PARTNER_OVERVIEW_METRICS,
  GET_PARTNER_UNIQUE_CLICKS_BY_ID, GET_PARTNER_MOST_VIRAL_PRODUCTS,
  GET_PARTNER_MOST_VIRAL_CUSTOMERS, GET_GRAPH_PARTNER_REVENUE, GET_GRAPH__PARTNER_REVENUE_BY_DATE,
};
