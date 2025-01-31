import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Preview, PreviewProps } from './Preview';
import { HMSThemeProvider } from '../../hooks/HMSThemeProvider';

const meta: Meta = {
  title: 'Preview',
  component: Preview,
};

export default meta;

const DarkTemplate: Story<PreviewProps> = args => {
  return (
    <HMSThemeProvider config={{}} appBuilder={{ theme: 'dark' }}>
      <div>
        <Preview {...args} />
      </div>
    </HMSThemeProvider>
  );
};

const LightTemplate: Story<PreviewProps> = args => {
  return (
    <HMSThemeProvider config={{}} appBuilder={{ theme: 'light' }}>
      <div>
        <Preview {...args} />
      </div>
    </HMSThemeProvider>
  );
};

export const Default = DarkTemplate.bind({});
Default.args = {
  joinOnClick: values =>
    alert(`Join Clicked, Submitted Values: ${JSON.stringify(values, null, 1)}`),
  errorOnClick: () => alert('Error Modal close!'),
  config: {
    authToken: 'token',
    userName: 'username',
  },
};

export const Light = LightTemplate.bind({});
Light.args = {
  joinOnClick: values =>
    alert(`Join Clicked, Submitted Values: ${JSON.stringify(values, null, 1)}`),
  errorOnClick: () => alert('Error Modal close!'),
  config: {
    authToken: 'token',
    userName: 'username',
  },
};
