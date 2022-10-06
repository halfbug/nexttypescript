/* eslint-disable no-tabs */
/* eslint-disable no-undef */

// BACKEND APP URL
window.APPv2URL = 'https://api-stage.groupshop.co';
// window.APPv2URL = 'http://localhost:5000';
const logoURL = 'Logo.svg';
// FRONTEND APP URL
const APP_URL = 'https://front-stage.groupshop.co/';

const { shop } = Shopify;

async function fetchStore() {
  const response = await fetch(`${window.APPv2URL}/ext/store?shop=${shop}`);
  if (response.status === 200) {
    const res = await response.json();
    return res;
  }

  return false;
}

async function getUI() {
  const APIResponse = await fetchStore();
  const CUSTOMlink = document.createElement('link');
  CUSTOMlink.rel = 'stylesheet';
  CUSTOMlink.type = 'text/css';
  CUSTOMlink.href = `${APP_URL}groupshop-pdp.css`;
  document.head.appendChild(CUSTOMlink);

  const font = document.createElement('link');
  font.href = 'https://fonts.googleapis.com/css2?family=Mulish:wght@400;700&display=swap';
  font.rel = 'stylesheet';
  document.head.appendChild(font);

  const GSscript = document.createElement('script');
  GSscript.src = `${APP_URL}gsbootstrap.js`;
  document.head.appendChild(GSscript);

  const script = document.getElementById('groupshop-banner');
  const MainDiv = document.createElement('div');
  const logoBG = document.getElementsByClassName('modern-image');
  addModal(APIResponse);

  if (APIResponse.settings.layout.bannerStyle === 'Classic') {
    MainDiv.innerHTML = `<div class="banner-pdp">
    <span id="text">Only <strong>${APIResponse.discount}</strong> when you shop with friends</span>&nbsp;
    <img class="logo-pdp" src=${APP_URL}${logoURL} />
    </div>`;
  }

  if (APIResponse.settings.layout.bannerStyle === 'Modern') {
    MainDiv.innerHTML = `<div class="modern-banner-pdp">
        <div class="modern-image"><img class="logo-pdp modern-logo" src=${APP_URL}${logoURL} /></div>&nbsp;
        <span id="text-pdp">Shop with friends,<br/>
        get <strong>${APIResponse.discount} cashback.</strong></span>&nbsp;
    </div>`;
  }

  MainDiv.id = 'grp-shop-section-2';
  MainDiv.style.maxWidth = 'fit-content';
  MainDiv.setAttribute('data-gs-toggle', 'groupshop_modal');
  MainDiv.setAttribute('data-gs-target', '#gsmodal');
  MainDiv.setAttribute('data-gs-backdrop', 'static');
  script.after(MainDiv);
  manipulateUI(MainDiv, logoBG, APIResponse);
}

getUI();

function manipulateUI(div, logoBG, APIResponse) {
  if (APIResponse.settings.layout.bannerStyle === 'Modern') {
    logoBG[0].style.setProperty('--modernLogoBG', APIResponse.settings.layout.bannerCustomColor);
  }

  if (APIResponse.settings.layout.bannerStyle === 'Classic') {
    div.style.setProperty('--bg', APIResponse.settings.layout.bannerCustomColor);
  }
}

function addModal(APIResponse) {
  const gsModal = document.createElement('div');
  gsModal.className = 'groupshop_modal groupshop_fade gspdpmodel';
  gsModal.id = 'gsmodal';
  gsModal.setAttribute('aria-hidden', true);
  gsModal.setAttribute('tabindex', '-1');
  gsModal.setAttribute('data-bs-backdrop', 'static');

  gsModal.innerHTML = ` <div class="groupshop_modal-dialog  modal-dialog-gss modal-dialog-centered-gss">
    <div class="groupshop_modal-content">
    <button type="button" class="groupshop_btn-close" data-gs-dismiss="groupshop_modal" aria-label="Close"></button>
      <div class="groupshop_modal-body modal-content-gss">
        <div class="modal-header-gss">
        <div class="rbb-popup-head-wrap"><div class="rbb-popup-head"><div class="rbb-popup-logo"><embed src="${window.APPv2URL}/public/images/GROUPSHOP-logo.svg" class="rb-main-logo"></div>
        <div class="rbb-popup-logo2" id="brand-logo">
        <img src="${APIResponse.logoImage}" width="20" height="30" class="second-logo addtc-np" >
        <!-- <img src="${window.APPv2URL}/public/images/default-image.jpg" width="20" height="30" class="second-logo addtc-np" > -->
        </div>
        </div></div></div><div id="main-popup-gss" class="gs-modal-body" style="background-color:#ffffff" ;=""><div class="how-complete-0"><span class="dont_pay_full"><span class="gradient-pay">Pay less</span> when you <span class="gradient-pay">shop with friends</span></span></div>
        <div class="rb-text-2"><strong>Earn up to 100% cashback and access exclusive discounts</strong> when you shop with friends using Groupshop!</div>
        <div class="to-start-wrap"><div class="to-start">To start earning</div></div><div class="rb-how-modal">													 <div class="rb-howshop">													    
        <div class="how-shop-img">
        <embed src="${window.APPv2URL}/public/images/cart-pdp.svg"></div>
        <div class="how-shop-desc">Complete your order to get a link to your unique Groupshop store.
        </div>													 </div>													 <div class="rb-howshop">													    <div class="how-shop-img"><embed src="${window.APPv2URL}/public/images/newmail.svg"></div>													    <div class="how-shop-desc">Share your Groupshop link with friends to give them access to <strong>exclusive discounts.</strong></div>													 </div>													 <div class="rb-howshop">													    <div class="how-shop-img"><embed src="${window.APPv2URL}/public/images/newemoji.svg"></div>													    <div class="how-shop-desc">Earn up to <strong>100% cashback</strong> when friends shop.</div>													 </div>													</div><div class="how-complete-4 sec-4"><div class="how-complete-wrap-4"><span class="shop-with-1">The more friends, the more rewards for everyone. It’s that simple!</span></div></div><div class="how-complete-5 sec-5"><a class="keep-shop" data-gs-dismiss="groupshop_modal" aria-label="Close">Keep shopping</a></div>
        <div class="footer-end" id="today-offer-gs">
        </div><div id="pdp-ajax-res"></div></div><div id="inner-detail-popup" class="gs-modal-body" style="background-color:#ffffff; display:none"><div class="how-work-wrap"><div class="how-work-text">How does it work</div></div><div class="info-box-wrap mb-53"><div class="info-box"><span class="info-num">1</span><div class="info-part-1 info-text">Start by adding products to your cart and then complete your purchase</div><div class="info-part-2 info-text"><span class="info-footer">SHOP</span><span class="info-icon"><span class="info-icon-bg">
          <img src="{{ 'cart-pdp.svg' | asset_url }}" width="104" height="8" loading="lazy">
        </span></span></div></div></div><div class="info-box-wrap mb-53"><div class="info-box"><span class="info-num">2</span><div class="info-part-1 info-text">Next you will recieve an email with your groupshop page link, share your Group Shop link with friends</div><div class="info-part-2 info-text"><span class="info-footer">SHARE</span><span class="info-icon"><span class="info-icon-bg">
          <img src="{{ 'share-pdp.svg' | asset_url }}" width="104" height="8" loading="lazy">
        </span></span></div></div></div><div class="info-box-wrap"><div class="info-box"><span class="info-num">3</span><div class="info-part-1 info-text">Your friends get up to 35% OFF for shopping on your Group Shop and you earn up to 90% cashback when friends shop with you</div><div class="info-part-2 info-text"><span class="info-footer">EARN</span><span class="info-icon"><span class="info-icon-bg">
          <img src="{{ 'dollar-pdp.svg' | asset_url }}" width="14" height="8" loading="lazy">
        </span></span></div></div></div><div class="footer-notice-wrap"><div class="notice">Bonus: You can shop from your own groupshop and keep the cashback and discounts for your self</div></div></div></div>
      
      </div>
      
    </div>
  </div>`;

  // add modal code some where in page
  document.body.append(gsModal);
}
