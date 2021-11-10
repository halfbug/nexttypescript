import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button2, { Button2Props } from './Button2';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Compnents/Button2',
  component: Button2,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button2>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button2> = (args:Button2Props) => <Button2 {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  // primary: true,
  children: 'Next',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Next',
};

export const Large = Template.bind({});
Large.args = {
  // size: 'large',
  children: 'Next',
};

export const Small = Template.bind({});
Small.args = {
  // size: 'small',
  children: 'Next',
};
