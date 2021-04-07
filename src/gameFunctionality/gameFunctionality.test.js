import React from 'react';
import { shallow } from 'enzyme';
import Players from '../players/players';
import GameFunctionality from './gameFunctionality';

describe('GameFunctionality', () => {

	it('Renders Game intial Render', () => {
		const wrapper = shallow(<GameFunctionality />);

		expect(wrapper.type()).toEqual(Players);
	});

	describe('When User Clicks Add Player to Game without entering Player\s Details', () => {
		it('Should validate and add Player to the game if it passes all validations', () => {
			const wrapper = shallow(<GameFunctionality />);
			let PlayersComponent = wrapper.find(Players);

			PlayersComponent.props().clicked();

			expect(wrapper.state().errors).toEqual(true);
		});
	});

	describe('When User Clicks Add Player to Game with just entering Player\'s name', () => {
		it('Should validate and return an error', () => {
			const wrapper = shallow(<GameFunctionality />);
			let PlayersComponent = wrapper.find(Players);

			let event = {
				target: {
					value: 'Vinod'
				}
			}

			PlayersComponent.props().changed(event);

			wrapper.update();
			PlayersComponent = wrapper.find(Players);

			expect(PlayersComponent.props().playerName).toEqual('Vinod');

			PlayersComponent.props().clicked();

			expect(wrapper.state().errors).toEqual(true);
		});
	});
});