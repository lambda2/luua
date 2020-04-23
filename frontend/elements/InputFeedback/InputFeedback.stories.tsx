import React from 'react';
import { storiesOf } from '@storybook/react';
import { withTests } from '@storybook/addon-jest';
import InputFeedback from './InputFeedback';

export default {
    title: 'InputFeedback'
};


export const toStorybook = () => <InputFeedback><span>TODO</span></InputFeedback>;

toStorybook.story = {
    name: 'A simple InputFeedback',
};
