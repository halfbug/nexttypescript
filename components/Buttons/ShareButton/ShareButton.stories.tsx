import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ShareButton from './ShareButton';

export default {
  title: 'GroupShop/ShareButton',
  component: ShareButton,
} as ComponentMeta<typeof ShareButton>;

const Template: ComponentStory<typeof ShareButton> = (args) => <ShareButton {...args} />;

export const plane = Template.bind({});
plane.args = {

  shareurl: 'www.test.com',
  label: 'Earn Cashback',
};

export const basic = Template.bind({});
basic.args = {

  shareurl: 'www.test.com',

};
