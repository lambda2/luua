import React from 'react';
import { storiesOf } from '@storybook/react';
import { withTests } from '@storybook/addon-jest';
import RadioButtonGroup from './RadioButtonGroup';

export default {
    title: 'RadioButtonGroup'
};


export const toStorybook = () => <RadioButtonGroup><span>TODO</span></RadioButtonGroup>;

toStorybook.story = {
    name: 'A simple RadioButtonGroup',
};
