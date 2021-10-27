import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import LeftSide from '../components/OnBoarding/LeftSide'

export default {
    title: 'Example/LeftSide',
    component: LeftSide,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        heading: { control: 'text' },
        content: { control: 'text' }
    },
  } as ComponentMeta<typeof LeftSide>;
  
  export const Text = () => <LeftSide heading="Define Your Brand" content="Make your brand stand out by adding your brand name, logo, and industry."/>;