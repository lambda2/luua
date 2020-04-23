import React from 'react';
import { storiesOf } from '@storybook/react';
import { withTests } from '@storybook/addon-jest';
import Checkbox from './Checkbox';

export default {
    title: 'Checkbox'
};


export const toStorybook = () => <Checkbox><span>TODO</span></Checkbox>;

toStorybook.story = {
    name: 'A simple Checkbox',
};
