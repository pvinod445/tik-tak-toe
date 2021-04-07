import React from 'react';
import { shallow } from 'enzyme';
import Players from '../players/players';
import GameFunctionality from './gameFunctionality';

describe('GameFunctionality', () => {

	it('Renders Game intial Render', () => {
		const wrapper = shallow(<GameFunctionality />);

		expect(wrapper.type()).toEqual(Players);
	});
});