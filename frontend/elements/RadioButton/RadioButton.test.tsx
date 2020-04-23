import React from "react";
import { shallow } from 'enzyme';
import RadioButton from './RadioButton';

describe('RadioButton', () => {
    it('Renders properly', () => {
        const element = shallow(<RadioButton>RadioButton with text</RadioButton>);
        expect(element).toMatchSnapshot();
    });

});
