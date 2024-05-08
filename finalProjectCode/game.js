// Variables to keep track of players and which boxes are filled with x's and o's
const xPlayer = 'X';
const oPlayer = 'O';
var xSelections = [];
var oSelections = [];
// Variable to keep track of the current player
let currentPlayer = xPlayer;
// Count variable: counts once per turn, when count is odd it is x's turn, when count is even it's o's turn
let count = 0;
//winning combinations in array form
const threeInARow = [
    // winning via a row of 3
    ['0', '1', '2'],
    ['3', '4', '5'],
    ['6', '7', '8'],
    // winning via a column of 3
    ['0', '3', '6'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    // winning on the diagonal
    ['0', '4', '8'],
    ['2', '4', '6']
];
// eventListener for cell clicks to be able to respond to a user selecting a cell
const grid = document.getElementById('grid');
document.addEventListener('click', (event) => handleCellClick(event));
// Function to handle a cell click
function handleCellClick(event) {
    // Get the cell element that was clicked as an object
    const targetCell = event.target;
    //gets booleans to classify if the area clicked is a cell, and if the cell is disabled (already used)
    const isCell = targetCell.classList.contains('cell');
    const isDisabled = targetCell.classList.contains('disabled');
    //if the area clicked is a cell and is still available: x or o are inserted into that cell
    //important: main if statement for a lot of the game
    if (isCell && !isDisabled) {
        //gets the cell number to keep track of where the x or o is placed
        //these strings are stored in the .html file
        const cellValue = targetCell.dataset.value;
        //count for x's beings odd and evens being o's
        count += 1;
        //if it is x's turn
        if (!(count % 2 == 0)) {
            //set the target cell as being "disabled" and "x" (both defined in CSS file)
            targetCell.classList.add('disabled');
            targetCell.classList.add('x');
            //add the cell number (string) to the xSelections array (this will help us check for winning combinations later)
            xSelections.push(cellValue);
            currentPlayer = oPlayer;
            //only checks for wins once the xSelections array length is at least 3, since it takes at least three turns to win
            if (xSelections.length >= 3) {
                //xWon() returns a boolean if there is a winning combination detected
                if (xWon()) {
                    //disables all cells so user cannot select cells after someone has won
                    document.querySelectorAll('disabled').length;
                    //xWins() displays winner
                    xWins();
                }
            }
        }
        //if it is o's turn
        if (count % 2 == 0) {
            //set the target cell as being "disabled" and "x" (both defined in CSS file)
            targetCell.classList.add('disabled');
            targetCell.classList.add('o');
            //add the cell number (string) to the oSelections array (this will help us check for winning combinations later)
            oSelections.push(cellValue);
            currentPlayer = xPlayer;
            //only checks for wins once the oSelections array length is at least 3, since it takes at least three turns to win
            if (oSelections.length >= 3) {
                //oWon() returns a boolean if there is a winning combination detected
                if (oWon()) {
                    //disables all cells so user cannot select cells after someone has won
                    document.querySelectorAll('disabled').length;
                    //oWins() displays winner
                    oWins();
                }
            }
        }
        //if all cells are disbaled, checks for x and o wins but if none are found, the game is declared a tie game
        if (!document.querySelectorAll('.cell:not(.disabled)').length) {
            if (xWon() == true) {
                xWins();
            }
            else if (oWon() == true) {
                oWins();
            }
            else {
                tieGame();
            }
        }
    }
}
//prints "Tie Game!" by addinf text contect to the game-over-text defined in the CSS file
function tieGame() {
    document.querySelector('.done').classList.add('visible');
    document.querySelector('.game-over-text').textContent = 'Tie Game!';
}
//prints X Wins!" by addinf text contect to the game-over-text defined in the CSS file
function xWins() {
    document.querySelector('.done').classList.add('visible');
    document.querySelector('.game-over-text').textContent = "X Wins!";
}
//prints "O Wins!" by addinf text contect to the game-over-text defined in the CSS file
function oWins() {
    document.querySelector('.done').classList.add('visible');
    document.querySelector('.game-over-text').textContent = "O Wins!";
}
//checks to see if oPlayer has won
function oWon() {
    let i = 0;
    //while loop that goes through winning combinations
    while (i < threeInARow.length) {
        let scoreCount = 0;
        //for loop that goes through each element in oSelections array to see if it is in current winning combo array
        for (let a = 0; a < oSelections.length; ++a) {
            if (threeInARow[i].indexOf(oSelections[a]) != -1) {
                //counts every time a match is found in oSelections and the current winning combo
                scoreCount += 1;
            }
            //if the count reached three, that means all indexes of a winning combination has been found in oSelections and O has won
            if (scoreCount == 3) {
                //disables all cells so user cannot select cells after someone has won
                document.querySelectorAll('.cell').forEach(cells => cells.classList.add('disabled'));
                return true;
            }
        }
        i++;
    }
    return false;
}
//checks to see if xPlayer has won
function xWon() {
    let i = 0;
    //while loop that goes through winning combinations
    while (i < threeInARow.length) {
        let scoreCount = 0;
        //for loop that goes through each element in xSelections array to see if it is in current winning combo array
        for (let a = 0; a < xSelections.length; ++a) {
            if (threeInARow[i].indexOf(xSelections[a]) != -1) {
                //counts every time a match is found in xSelections and the current winning combo
                scoreCount += 1;
            }
            //if the count reached three, that means all indexes of a winning combination has been found in xSelections and X has won
            if (scoreCount == 3) {
                //disables all cells so user cannot select cells after someone has won
                document.querySelectorAll('.cell').forEach(cells => cells.classList.add('disabled'));
                return true;
            }
        }
        i++;
    }
    return false;
}
