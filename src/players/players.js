import React from 'react';
import './players.css'

const Players = (props) => {
	let mainClassName = 'playerDiv';
	if(props.errors && props.playerName === '' && props.currentSymbol === '') {
		mainClassName = 'completeError';
	}
	else if(props.errors && (props.playerName === '' || props.currentSymbol === '')) {
		mainClassName = 'partialError';
	}

	return (
		<div className={mainClassName} style={{'width': '200px'}}>
			<h3>Enter Player Name {props.playerNum}:</h3>
			<input
				type='text'
				className={props.errors && props.playerName === '' ? 'error'  : ''}
				data-testid='PlayerName'
				name='playerName'
				placeholder='Enter Player Name'
				value={props.playerName}
				onChange={props.changed} />

			{props.errors && props.playerName === '' ? <p style={{'color': 'red'}}>Please Enter Player's Name</p> : ''}

			<div  className='container-fluid' style={{width: '100%', borderBottom: '2px solid lightgray'}}>
				<div className='row' style={{marginTop: '20px', display: 'inline-block', width: '100%'}}>
					<div className='radioClass'>
					<label htmlFor="X">
						<input
							type="radio"
							data-testid='SymbolX'
							className={props.errors && props.currentSymbol === '' ? 'error'  : ''}
							value="X"
							disabled={props.alreadySelected === 'X'}
							checked={props.currentSymbol === 'X'}
							onChange={props.symbolHandler}
							name="Symbol"/>
							X</label>

							<label htmlFor="O">
						<input
							type="radio"
							className={props.errors && props.currentSymbol === '' ? 'error'  : ''}
							value="O"
							disabled={props.alreadySelected === 'O'}
							checked={props.currentSymbol === 'O'}
							onChange={props.symbolHandler}
							name="Symbol"/>
							O</label>

						{props.errors && props.currentSymbol === '' ? <p style={{'color': 'red'}}>Please Choose Player's Symbol</p> : ''}
					</div>
				</div>
			</div>

			<input data-testid='addPlayer' type='button' value='Add Player to the Game' disabled={props.disabled} onClick={props.clicked} />
		</div>

	)
}

export default  Players;