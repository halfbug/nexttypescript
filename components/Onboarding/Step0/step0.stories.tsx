import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

// import Dialogue from './dialogue';
import Step0 from './step0';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Onboarding/Step0',
  component: Step0,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
    children: { control: 'text' },
  },
} as ComponentMeta<typeof Step0>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Step0> = (args) => <Step0 {...args} />;

export const Main = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Main.args = {
  show: true,

};
