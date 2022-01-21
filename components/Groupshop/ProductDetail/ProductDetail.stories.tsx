import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProductDetail from './ProductDetail';

export default {
  title: 'GroupShop/ProductDetail',
  component: ProductDetail,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    show: { control: 'boolean' },
  },
} as ComponentMeta<typeof ProductDetail>;

const Template: ComponentStory<typeof ProductDetail> = (args) => <ProductDetail {...args} />;

export const Main = Template.bind({});
Main.args = {
  show: true,
  handleClose: () => false,
  product: {
    id: 'gid://shopify/Product/6140912763046',
    title: 'DR MARTENS | 1460Z DMC 8-EYE BOOT | CHERRY SMOOTH',
    description: 'Make a statement with these iconic Dr Marten boots. This classic style has stood the test of time thanks to the combination of reinvented styling and the rugged yet urban look. Crafted with high-quality, durable leathers, the 1460OZ DMC 8-Eye Boot Cherry Smooth is made to last and will only get better with time. This lace-up boot features the iconic Dr Martens air-cushioned sole offering good abrasion and slip resistance, and is made with Goodyear welt - the sole and upper are heat-sealed and sewn together.',
    featuredImage: 'https://cdn.shopify.com/s/files/1/0531/0821/1878/products/633e8800dbc6dc5704b35fd027e4eeaa.jpg?v=1613474568',
    price: '249.00',
    currencyCode: 'USD',
    orders: [
      {
        product: {
          id: 'gid://shopify/Product/6140915548326',
        },
        price: '990.00',
      },
    ],
  },
};
