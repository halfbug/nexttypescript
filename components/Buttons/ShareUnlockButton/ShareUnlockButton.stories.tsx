import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ShareUnlockButton from './ShareUnlockButton';

export default {
  title: 'GroupShop/ShareButton',
  component: ShareUnlockButton,
} as ComponentMeta<typeof ShareUnlockButton>;

// eslint-disable-next-line max-len
const Template: ComponentStory<typeof ShareUnlockButton> = (args) => <ShareUnlockButton {...args} />;

export const plane = Template.bind({});
plane.args = {

  shareurl: 'www.test.com',
  label: 'Earn Cashback',
};

export const basic = Template.bind({});
basic.args = {

  shareurl: 'www.test.com',

};
