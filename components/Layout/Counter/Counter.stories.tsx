import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Counter from './Counter';

export default {
  title: 'GroupShop/Counter',
  component: Counter,
} as ComponentMeta<typeof Counter>;

const Template: ComponentStory<typeof Counter> = (args) => <Counter {...args} />;

export const Small = Template.bind({});
Small.args = {
  expireDate: new Date(),
};
