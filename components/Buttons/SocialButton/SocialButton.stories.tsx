import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SocialButton from './SocialButton';

export default {
  title: 'GroupShop/SocialButton',
  component: SocialButton,
} as ComponentMeta<typeof SocialButton>;

const Template: ComponentStory<typeof SocialButton> = (args) => <SocialButton {...args} />;

export const instagram = Template.bind({});
instagram.args = {
  url: 'www.instagram',
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
