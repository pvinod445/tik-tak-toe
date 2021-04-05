import React, { Component } from 'react';
import Players from '../players/players';
import './gameFunctionality.css';

class GameFunctionality extends Component {
	state = {
		players: {
			'X': '',
			'O': ''
		},
		currentPlayerTurn: 	'X',
		scores: {
			'X': [],
			'O': []
		},
		playerName: '',
		currentSymbol: '',
		errors: false,
		winningConditions: [
							[0, 1, 2],
							[3, 4, 5],
							[6, 7, 8],
							[0, 3, 6],
							[1, 4, 7],
							[2, 5, 8],
							[0, 4, 8],
							[2, 4, 6]
						],
		done: false,
		win: ''
	}

	handleValidation = () => {
		if(this.state.currentSymbol === '' || this.state.playerName === '') {
			return false;
		}

		return true;
	}

	playerNameHandler = (event) => {
		this.setState({playerName: event.target.value});
	}

	addPlayerNameHandler = () => {
		if(!this.handleValidation()) {
			this.setState({errors: true});
			return ;
		}

		let updatedPlayers = this.state.players;
		updatedPlayers[this.state.currentSymbol] = this.state.playerName;

		const nextPlayer = this.state.currentSymbol === 'X' ? 'O' : 'X';

		this.setState({players: updatedPlayers, playerName: '', currentSymbol: nextPlayer, errors: false});
	}

	symbolHandler = (event) => {
		this.setState({currentSymbol: event.target.value});
	}

	validateWinOrNot = (scores) => {
		const XScores = scores['X'];
		const OScores = scores['O'];

		for(let i = 0; i < this.state.winningConditions.length; i++) {
			const winCondition = this.state.winningConditions[i];

			if(winCondition.includes(XScores[0]) && winCondition.includes(XScores[1]) && winCondition.includes(XScores[2])) {
				return 'X';
			}

			if(winCondition.includes(OScores[0]) && winCondition.includes(OScores[1]) && winCondition.includes(OScores[2])) {
				return 'O';
			}
		}

		return '';
	}

	handlePayerTurn = (ind) => {
		let currentScores = this.state.scores;
		currentScores[this.state.currentPlayerTurn].push(ind);
		let changeTurn = null;
		let done = false;
		let win = '';

		if(this.state.currentPlayerTurn === 'X') {
			changeTurn = 'O';
		}
		else {
			changeTurn = 'X';
		}

		if(currentScores['X'].length > 2 || currentScores['O'].length > 2) {
			const winornot = this.validateWinOrNot(currentScores);

			if(winornot !== '') {
				done = true;
				win = winornot;
			}
		}

		if((currentScores['X'].length + currentScores['O'].length) === 9) {
			done = true;
		}

		this.setState({scores: currentScores, currentPlayerTurn: changeTurn, done: done, win: win});
	}

	render() {
		let html = null;
		let buildGameRows = null;
		let i = 0;

		buildGameRows = [0, 1, 2].map((row, index) => {
			let j = i;
			i = i + 3;
			return (
				<tr key={index}>
					<td>
						<input
							className={this.state.scores['X'].includes(j) ? 'rows XPlayer' : (this.state.scores['O'].includes(j) ? 'rows OPlayer' : 'rows')}
							id={'row' + j}
							type='button'
							value = {
									(this.state.currentPlayerTurn === ''
										? ''
										: (this.state.scores['X'].includes(j)
											? 'X'
											: (this.state.scores['O'].includes(j) ? 'O' : '')))
									}
							disabled={this.state.scores['X'].includes(j) || this.state.scores['O'].includes(j)}
							onClick={() => this.handlePayerTurn(j)} />
 					</td>
					 <td>
						<input
							id={'row' + (j + 1)}
							type='button'
							value = {
								(this.state.currentPlayerTurn === ''
									? ''
									: (this.state.scores['X'].includes((j + 1))
										? 'X'
										: (this.state.scores['O'].includes((j + 1)) ? 'O' : '')))
								}
							className={this.state.scores['X'].includes((j + 1)) ? 'rows XPlayer' : (this.state.scores['O'].includes((j + 1)) ? 'rows OPlayer' : 'rows')}
							disabled={this.state.scores['X'].includes((j + 1)) || this.state.scores['O'].includes((j + 1))}
							onClick={() => this.handlePayerTurn((j + 1))} />
 					</td>
					 <td>
						<input
							id={'row' + (j + 2)}
							type='button'
							value = {
								(this.state.currentPlayerTurn === ''
									? ''
									: (this.state.scores['X'].includes((j + 2))
										? 'X'
										: (this.state.scores['O'].includes((j + 2)) ? 'O' : '')))
								}
							className={this.state.scores['X'].includes((j + 2)) ? 'rows XPlayer' : (this.state.scores['O'].includes((j + 2)) ? 'rows OPlayer' : 'rows')}
							disabled={this.state.scores['X'].includes((j + 2)) || this.state.scores['O'].includes((j + 2))}
							onClick={() => this.handlePayerTurn((j + 2))} />
 					</td>
				</tr>
			);
		})

		if(this.state.done) {
			if(this.state.win !== '') {
				html = (
					<div className='result'>
						<h2>Congratulations! {this.state.players[this.state.win]} has won!</h2>
						<a href='javascript: location.reload();'>Do you want to try another Game?</a>
					</div>
				);
			}
			else {
				html = (
					<div className='result'>
						<h2>Match has been drawn.</h2>
						<a href='javascript: location.reload();'>Do you want to try another Game?</a>
					</div>
				);
			}
		}
		else {
			if(this.state.players['O'] === '' || this.state.players['X'] === '') {
				html = (
					<Players
						playerNum={(this.state.players.X.length === 0 && this.state.players.O.length === 0) ? 1 : 2}
						playerName={this.state.playerName}
						alreadySelected={this.state.players['X'] !== '' ? 'X' : (this.state.players['O'] !== '' ? 'O' : '')}
						errors={this.state.errors}
						currentSymbol = {this.state.currentSymbol}
						symbolHandler={this.symbolHandler.bind(this)}
						changed={(e) => this.playerNameHandler(e)}
						clicked={this.addPlayerNameHandler} />
				);
			}
			else {
				html = (
					<table align='center' id='mainTable'>
						<thead></thead>
						<tbody>
							<tr>
								<td colSpan='3'>
									<div id='playerDiv' className='container-fluid' style={{width: '100%', borderBottom: '2px solid lightgray'}}>
										<div className='row' style={{marginTop: '20px', display: 'inline-block', width: '100%'}}>
											<div style={{width: '50%', display: 'inline-block'}}>
												<button className={this.state.currentPlayerTurn === 'X' ? 'activeTab' : 'inActiveTab'} id='player1'>{this.state.players.X}</button>
											</div>
											<div style={{width: '50%', display: 'inline-block'}}>
												<button className={this.state.currentPlayerTurn === 'O'  ? 'activeTab' : 'inActiveTab'} id='player2'>{this.state.players.O}</button>
											</div>
										</div>
									</div>
								</td>
							</tr>
							{buildGameRows}
						</tbody>
					</table>
				)
			}
		}

		return html;
	}
}

export default GameFunctionality;