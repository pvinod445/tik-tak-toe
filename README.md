This repository contains a coding for Tic-Tak-Toe game

## Steps to Run the project
- Clone the project
- Navigate to that path(where project is cloned) in terminal
- Open terminal and follow the following steps
```
$ cd tic-tac-toe
$ npm install
$ npm start
```
## Sample Tests
- Click on the button `Add Player to the Game` without entering Player Details. Then it should get validation errors
- Enter Player's name in the Player's name text field and click on the button `Add Player to the Game` without entering Player Details. Then it should get validation error on Player's Symbol Choice
- Enter Player's name in the Player's name text field and Select a Symbol then click on the button `Add Player to the Game` without entering Player Details. Then it should add Player to the Game and ask you to enter Second Player's details
- Enter Player 2 detail
- Initial Turn will be Player X
- The Player whose turn is indicated with darkgrey background-color
- Now click on any column then player turn changes
- After appropriate selections it will let you know whether one of the player is won or game is tie.
- Then it will ask you whether you are interested to Start a new game or not.

## Steps to Run unit tests
```
$ npm run test
```
