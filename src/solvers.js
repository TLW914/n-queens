/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

/////////////////////////////////////////////////////////////////////////////////////////////
// Example of (n) Rooks Solution
/////////////////////////////////////////////////////////////////////////////////////////////

//Input: (n) represnting number of rooks and size of board.
//Output: a single matrix that represents the solution.
//Complexity:

window.findNRooksSolution = function (n) {
  var solution = undefined; //fixme
  var allPossible = [];
  var board = new Board({ 'n': n });
  var matrix = board.rows();
  var piecesPlayed = 0;


  var checker = function (matrix) {
    // if (((!board.hasAnyColConflicts()) && (!board.hasAnyRowConflicts())) && (piecesPlayed === n)) {
    //   allPossible.push(matrix);
    // } 
    for (var r = 0; r < matrix.length; r++) {
      for (var c = 0; c < matrix.length; c++) {
        if (matrix[r][c] === 0) {
          board.togglePiece(r, c);
          if (!board.hasAnyColConflicts() && !board.hasAnyRowConflicts()) {
            piecesPlayed++;
            checker(matrix);
          } else {
            board.togglePiece(r, c);
          }
        }
      }
    }
    if (piecesPlayed === n) {
      allPossible.push(matrix);
      return;
    }
  }



  checker(matrix);
  solution = allPossible[0];
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

/////////////////////////////////////////////////////////////////////////////////////////////
// Number of Valid (n) Rooks Solutions
/////////////////////////////////////////////////////////////////////////////////////////////

//Input: (n) represnting number of rooks and size of board.
//Output: # of valid solutions of (n) rooks
//Complexity:

window.countNRooksSolutions = function (n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;

};

/////////////////////////////////////////////////////////////////////////////////////////////
//Example of (n) Queens Solution
/////////////////////////////////////////////////////////////////////////////////////////////

//Input: (n) representing the number of queens and size of board
//Output: a matrix that represents a single solution of (n) board/ (n) queens
//Complexity:

window.findNQueensSolution = function (n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;

};

/////////////////////////////////////////////////////////////////////////////////////////////
// Number of Valid (n) Queens Solutions
/////////////////////////////////////////////////////////////////////////////////////////////

//Input: (n) representing the number of queens and size of board
//Output: # of valid solutions of (n) rooks
//Complexity: 

window.countNQueensSolutions = function (n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;

};
