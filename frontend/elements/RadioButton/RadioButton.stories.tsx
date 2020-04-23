import React from 'react';
import { storiesOf } from '@storybook/react';
import { withTests } from '@storybook/addon-jest';
import RadioButton from './RadioButton';

export default {
    title: 'RadioButton'
};


export const toStorybook = () => <RadioButton><span>TODO</span></RadioButton>;

toStorybook.story = {
    name: 'A simple RadioButton',
};
