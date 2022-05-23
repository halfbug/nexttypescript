import React, { useContext } from 'react';
// import {
//   Gear, Activity, Image, CalendarMinus, Cloud,
// } from 'react-bootstrap-icons';
import styles from 'styles/Sidebar.module.scss';
import { StoreContext } from 'store/store.context';
import Link from 'next/link';
import Mainlogo from 'assets/images/main-logo.svg';
import Overviewicon from 'assets/images/overview-icon.svg';
import Campaignicon from 'assets/images/campaign-icon.svg';
import Analyticsicon from 'assets/images/analytics-icon.svg';
import Billingicon from 'assets/images/billing-icon.svg';
import Settingsicon from 'assets/images/settings-icon.svg';
import Knowledgebaseicon from 'assets/images/knowledge-base-icon.svg';
import Sidebarpromotion from 'assets/images/sidebar-promotion.png';
import PartnerToolLogo from 'assets/images/partner-tools.svg';
import { useRouter } from 'next/router';

const Sidebar = () => {
  // refactor. set loading state and if loading dont show the screen and
  // after loading show the links
  const { store } = useContext(StoreContext);
  const shopName: string[] | undefined = store?.shop?.split('.', 1);
  const { pathname } = useRouter();
  // console.log('🚀 ~ file: SideBar.tsx ~ line 24 ~ Sidebar ~ route', route);

  const linkstyle = (route :string) => (pathname?.includes(route) ? [styles.linkwrap, styles.active].join(' ') : styles.linkwrap);

  return (
    <div className={styles.sidebarwrap}>
      <div className={styles.sidebarinnerwrap}>
        <div className="sidebar-section">
          <div className="sidebar-header">
            <Mainlogo />
          </div>
          <div className={styles.sidebarmenuwrap}>
            <ul className={styles.sidebarmenu}>
              <li>
                <Link href={`/${shopName}/overview`}>
                  <a>
                    <span className={linkstyle('overview')}>
                      <span className={styles.linkicon}><Overviewicon /></span>
                      <span className={styles.linktext}>Overview</span>
                    </span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/${shopName}/campaign`}>
                  <a>
                    <span className={linkstyle('campaign')}>
                      <span className={styles.linkicon}><Campaignicon /></span>
                      <span className={styles.linktext}>Campaign</span>
                    </span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/${shopName}/analytics`}>
                  <a>
                    <span className={linkstyle('analytics')}>
                      <span className={styles.linkicon}><Analyticsicon /></span>
                      <span className={styles.linktext}>Analytics</span>
                    </span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/${shopName}/billing`}>
                  <a>
                    <span className={linkstyle('billing')}>
                      <span className={styles.linkicon}><Billingicon /></span>
                      <span className={styles.linktext}>Billing</span>
                    </span>
                  </a>
                </Link>
              </li>

              <li>
                <Link href={`/${shopName}/partnertools`}>
                  <a>
                    <span className={linkstyle('partnertools')}>
                      <span className={styles.linkicon}><PartnerToolLogo /></span>
                      <span className={styles.linktext}>Partner Tools</span>
                    </span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/${shopName}/settings`}>
                  <a>
                    <span className={linkstyle('settings')}>
                      <span className={styles.linkicon}><Settingsicon /></span>
                      <span className={styles.linktext}>Settings</span>
                    </span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/${shopName}/knowledgebase`}>
                  <a>
                    <span className={linkstyle('knowledgebase')}>
                      <span className={styles.linkicon}><Knowledgebaseicon /></span>
                      <span className={styles.linktext}>Knowledge Base</span>
                    </span>
                  </a>
                </Link>
              </li>

            </ul>
          </div>
        </div>
        <div className={styles.reviewwrap}>
          <div className={styles.reviewcontain}>
            <div className="review-img-wrap"><img src={Sidebarpromotion.src} alt="Sidebarpromotion" /></div>
            <div className={styles.reviewhead}>Leave a review</div>
            <div className={styles.reviewdesc}>How is your experience with Groupshop so far?</div>
            <div className="review-btn">
              <a href="/" className={styles.letusknow}>Let us know</a>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Sidebar;
