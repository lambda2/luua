import React from "react";
import { shallow } from 'enzyme';
import CheckboxGroup from './CheckboxGroup';

describe('CheckboxGroup', () => {
    it('Renders properly', () => {
        const element = shallow(<CheckboxGroup>CheckboxGroup with text</CheckboxGroup>);
        expect(element).toMatchSnapshot();
    });

});
