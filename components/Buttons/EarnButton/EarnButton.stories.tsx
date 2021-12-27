import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import EarnButton from './EarnButton';

export default {
  title: 'GroupShop/EarnButton',
  component: EarnButton,
} as ComponentMeta<typeof EarnButton>;

const Template: ComponentStory<typeof EarnButton> = (args) => <EarnButton {...args} />;

export const plane = Template.bind({});
plane.args = {
  // handleClick: () => console.log('you clicked'),
  popContent: <div>test component</div>,
  label: 'Earn Cashback',
};
