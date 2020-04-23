import React from "react";
import { shallow } from 'enzyme';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
    it('Renders properly', () => {
        const element = shallow(<Checkbox>Checkbox with text</Checkbox>);
        expect(element).toMatchSnapshot();
    });

});
