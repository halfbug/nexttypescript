import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import NativeShareButton from './NativeShareButton';

export default {
  title: 'GroupShop/NativeShareButton',
  component: NativeShareButton,
} as ComponentMeta<typeof NativeShareButton>;

// eslint-disable-next-line max-len
const Template: ComponentStory<typeof NativeShareButton> = (args) => <NativeShareButton {...args} />;

export const plane = Template.bind({});
plane.args = {

  shareurl: 'www.test.com',
  label: 'Earn Cashback',
};

export const basic = Template.bind({});
basic.args = {

  shareurl: 'www.test.com',

};
