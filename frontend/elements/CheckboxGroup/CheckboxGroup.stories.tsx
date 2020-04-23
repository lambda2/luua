import React from 'react';
import { storiesOf } from '@storybook/react';
import { withTests } from '@storybook/addon-jest';
import CheckboxGroup from './CheckboxGroup';

export default {
    title: 'CheckboxGroup'
};


export const toStorybook = () => <CheckboxGroup><span>TODO</span></CheckboxGroup>;

toStorybook.story = {
    name: 'A simple CheckboxGroup',
};
