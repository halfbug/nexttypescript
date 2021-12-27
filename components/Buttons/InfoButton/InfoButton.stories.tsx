import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import InfoButton from './InfoButton';

export default {
  title: 'GroupShop/InfoButton',
  component: InfoButton,
} as ComponentMeta<typeof InfoButton>;

const Template: ComponentStory<typeof InfoButton> = (args) => <InfoButton {...args} />;

export const withmessage = Template.bind({});
withmessage.args = {
  handleClick: () => console.log('you clicked'),
  message: 'How does this work?',
};

export const plane = Template.bind({});
plane.args = {
  handleClick: () => console.log('you clicked'),

};
