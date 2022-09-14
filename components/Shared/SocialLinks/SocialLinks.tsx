import React from 'react';
import Link from 'next/link';
import Instagram from 'assets/images/instagram-with-border.svg';
import Pinterest from 'assets/images/pinterest-with-border.svg';
import Twitter from 'assets/images/twitter-with-border.svg';
import Facebook from 'assets/images/facebook-with-border.svg';

function SocialLinks() {
  return (
    <>
      <Link href="https://www.instagram.com/groupshopit/"><a target="_blank"><Instagram /></a></Link>
      <Link href="https://pinterest.com/Groupshop/"><a target="_blank"><Pinterest /></a></Link>
      <Link href="https://twitter.com/groupshopit"><a target="_blank"><Twitter /></a></Link>
      <Link href="https://www.facebook.com/groupshopit"><a target="_blank"><Facebook /></a></Link>
    </>
  );
}

export default SocialLinks;