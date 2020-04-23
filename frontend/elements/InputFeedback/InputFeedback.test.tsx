import React from "react";
import { shallow } from 'enzyme';
import InputFeedback from './InputFeedback';

describe('InputFeedback', () => {
    it('Renders properly', () => {
        const element = shallow(<InputFeedback>InputFeedback with text</InputFeedback>);
        expect(element).toMatchSnapshot();
    });

});
