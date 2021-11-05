import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

// import Dialogue from './dialogue';
import Step2 from './step2';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Onboarding/Step2',
  component: Step2,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
    children: { control: 'text' },
  },
} as ComponentMeta<typeof Step2>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Step2> = (args:any) => <Step2 {...args} />;

export const Main = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Main.args = {
  show: true,

};
