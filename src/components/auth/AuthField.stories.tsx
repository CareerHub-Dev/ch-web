import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import AuthField from './AuthField';

const Template: ComponentStory<typeof AuthField> = (args) => (
  <AuthField {...args} />
);
export const Email = Template.bind({});
Email.args = {
  id: 'email',
  placeholder: 'Уведіть email',
  type: 'email',
  validationMessage: 'Перевірте коректність поштової адреси',
  children: <FontAwesomeIcon id="newPasswordIcon" icon={faEnvelope} />,
};

export default {
  title: 'Auth/AuthField',
  component: AuthField,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AuthField>;
