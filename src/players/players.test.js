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
		changed: jest.fn(),
		symbolHandler: jest.fn(),
	}

	it('Renders Players', () => {
		const wrapper = shallow(<Players {...props} />);

		expect(wrapper.type()).toEqual('div');
	});

	describe('When User types player Name', () => {
		it('Should Add Player name in state memory', () => {
			const wrapper = shallow(<Players {...props} />);

			wrapper.find('[data-testid="PlayerName"]').props().onChange();

			expect(props.changed).toHaveBeenCalledTimes(1);
		});
	});

	describe('When User selects Player\'s Symbol', () => {
		it('Should Add Player\' Symbol in state memory', () => {
			const wrapper = shallow(<Players {...props} />);

			wrapper.find('[data-testid="SymbolX"]').props().onChange();

			expect(props.symbolHandler).toHaveBeenCalledTimes(1);
		});
	});
});