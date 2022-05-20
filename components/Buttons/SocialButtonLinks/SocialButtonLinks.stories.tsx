import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SocialButtonLinks from './SocialButtonLinks';

export default {
  title: 'GroupShop/SocialButtonLinks',
  component: SocialButtonLinks,
} as ComponentMeta<typeof SocialButtonLinks>;

// eslint-disable-next-line max-len
const Template: ComponentStory<typeof SocialButtonLinks> = (args) => <SocialButtonLinks {...args} />;

export const instagram = Template.bind({});
instagram.args = {
  url: 'www.instagram.com',
  network: 'Instagram',
};

export const facebook = Template.bind({});
facebook.args = {
  url: 'www.facebookcom',
  network: 'Facebook',

};

export const pintrest = Template.bind({});
pintrest.args = {
  url: 'https://pin.it/UTjeHzb',
  network: 'Pinterest',
};

export const tiktok = Template.bind({});
tiktok.args = {
  url: 'https://pin.it/UTjeHzb',
  network: 'Tiktok',
};
