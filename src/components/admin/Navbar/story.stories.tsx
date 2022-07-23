import { ComponentMeta, ComponentStory } from '@storybook/react';
import AdminNavbar from '.';

const Template: ComponentStory<typeof AdminNavbar> = (args: any) => (
  <AdminNavbar {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};

export default {
  title: 'Admin/Navbar',
  component: AdminNavbar,
} as ComponentMeta<typeof AdminNavbar>;
