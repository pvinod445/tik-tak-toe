import React from 'react';
import { shallow } from 'enzyme';
import Players from './players';

describe('Players', () => {
	const props = {
		playerNum: 1,
		errors: false,
		playerName: 'Vinod',
		currentSymbol: 'X',
		alreadySelected: 'O',
		changed: jest.fn()
	}

	it('Renders Players', () => {
		const wrapper = shallow(<Players {...props} />);

		expect(wrapper.type()).toEqual('div');
	});
});