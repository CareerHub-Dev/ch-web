import { ComponentMeta, ComponentStory } from '@storybook/react';
import { default as NavbarHamburger, Props } from '.';

const Template: ComponentStory<typeof NavbarHamburger> = (args: Props) => (
  <NavbarHamburger {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};

export default {
  title: 'Admin/NavbarHamburger',
  component: NavbarHamburger,
} as ComponentMeta<typeof NavbarHamburger>;
