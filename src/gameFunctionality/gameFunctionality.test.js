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

	describe('When User Clicks Add Player to Game with just entering Player\'s Symbol', () => {
		it('Should validate and return an error', () => {
			const wrapper = shallow(<GameFunctionality />);
			let PlayersComponent = wrapper.find(Players);

			let event = {
				target: {
					value: 'X'
				}
			}

			PlayersComponent.props().symbolHandler(event);

			wrapper.update();
			PlayersComponent = wrapper.find(Players);

			expect(PlayersComponent.props().currentSymbol).toEqual('X');

			PlayersComponent.props().clicked();

			expect(wrapper.state().errors).toEqual(true);
		});
	});

	describe('When User Clicks Add Player to Game with Complete Player\'s Details', () => {
		it('Should add Players to the game', () => {
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

			event = {
				target: {
					value: 'X'
				}
			}

			PlayersComponent.props().symbolHandler(event);

			wrapper.update();
			PlayersComponent = wrapper.find(Players);

			expect(PlayersComponent.props().currentSymbol).toEqual('X');

			PlayersComponent.props().clicked();

			expect(wrapper.state().errors).toEqual(false);

			expect(wrapper.state().players['X']).toEqual('Vinod');
		});
	});

	describe('Trying to add all Player\'s Details', () => {
		it('Should add all Players to the game', () => {
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

			event = {
				target: {
					value: 'X'
				}
			}

			PlayersComponent.props().symbolHandler(event);

			wrapper.update();
			PlayersComponent = wrapper.find(Players);

			expect(PlayersComponent.props().currentSymbol).toEqual('X');

			PlayersComponent.props().clicked();

			expect(wrapper.state().errors).toEqual(false);

			expect(wrapper.state().players['X']).toEqual('Vinod');

			event = {
				target: {
					value: 'Computer'
				}
			}

			PlayersComponent.props().changed(event);

			wrapper.update();
			PlayersComponent = wrapper.find(Players);

			expect(PlayersComponent.props().playerName).toEqual('Computer');

			event = {
				target: {
					value: 'O'
				}
			}

			PlayersComponent.props().symbolHandler(event);

			wrapper.update();
			PlayersComponent = wrapper.find(Players);

			expect(PlayersComponent.props().currentSymbol).toEqual('O');

			PlayersComponent.props().clicked();
			wrapper.update();

			expect(wrapper.state().players['X']).toEqual('Vinod');
			expect(wrapper.state().players['O']).toEqual('Computer');
		});
	});
});