import React from "react";
import { shallow } from 'enzyme';
import RadioButtonGroup from './RadioButtonGroup';

describe('RadioButtonGroup', () => {
    it('Renders properly', () => {
        const element = shallow(<RadioButtonGroup>RadioButtonGroup with text</RadioButtonGroup>);
        expect(element).toMatchSnapshot();
    });

});
