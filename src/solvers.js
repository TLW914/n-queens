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
  var board = new Board({ 'n': n });
  var index = 0
  var result;

  var checker = function (index) {
    if (index === n) {
      return board.rows();
      // return;
    }
    for (var c = 0; c < n; c++) {
      board.togglePiece(index, c);
      if (!board.hasAnyRooksConflicts()) {
        return checker(index + 1);
      }
      board.togglePiece(index, c);
    }
    // return;
  }

  return checker(index);
  // helper function (recursively call)
  // if index passed = n, return;
  // traverse the row w/ for loop (length of row)
  // each spot on the board, toggle a piece on
  // Run checks to see if that piece is a conflict
  // If it is, toggle it off, keep moving thru loop
  // If it isn't a conflict,
  // recusively call helper function with a new row (++)
  // toggle the piece off
  // return;
};

/////////////////////////////////////////////////////////////////////////////////////////////
// Number of Valid (n) Rooks Solutions
/////////////////////////////////////////////////////////////////////////////////////////////

//Input: (n) represnting number of rooks and size of board.
//Output: # of valid solutions of (n) rooks
//Complexity:

window.countNRooksSolutions = function (n) {
  var board = new Board({ 'n': n });
  var index = 0
  var counter = 0;

  var checker = function (index) {
    if (index === n) {
      counter++;
      return;
      // return;
    }
    for (var c = 0; c < n; c++) {
      board.togglePiece(index, c);
      if (!board.hasAnyRooksConflicts()) {
        return checker(index + 1);
      }
      board.togglePiece(index, c);
    }
    // return;
  }

  checker(index);
  // helper function (recursively call)
  // if index passed = n, return;
  // traverse the row w/ for loop (length of row)
  // each spot on the board, toggle a piece on
  // Run checks to see if that piece is a conflict
  // If it is, toggle it off, keep moving thru loop
  // If it isn't a conflict,
  // recusively call helper function with a new row (++)
  // toggle the piece off
  // return;
  return counter;
};

/////////////////////////////////////////////////////////////////////////////////////////////
//Example of (n) Queens Solution
/////////////////////////////////////////////////////////////////////////////////////////////

//Input: (n) representing the number of queens and size of board
//Output: a matrix that represents a single solution of (n) board/ (n) queens
//Complexity:

window.findNQueensSolution = function (n) {

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




///////// Crazy stuff /////////

    // var solution = undefined; //fixme
  // var allPossible = [];
  // // var board = new Board({ 'n': n });
  // // var matrix = this.rows();
  // var piecesPlayed = 1;
  // var startingBoardIndex = 0;


  // var startingBoards = [];

  // for (var i = 0; i < n; i++) {
  //   for (var j = 0; j < n; j++) {
  //     var board = new Board({ 'n': n });
  //     board.togglePiece(i, j);
  //     startingBoards.push(board);
  //   }
  // }



  // var checker = function (matrix, x) {
  // //
  // if (((!board.hasAnyColConflicts()) && (!board.hasAnyRowConflicts())) && (piecesPlayed === n)) {
  //   //   allPossible.push(matrix);
  //   // }

  //   for (var r = 0; r < matrix.length; r++) {
  //     for (var c = 0; c < matrix.length; c++) {
  //       if (matrix[r][c] === 0) {
  //         startingBoards[x].togglePiece(r, c);
  //         if (!startingBoards[x].hasAnyColConflicts() && !startingBoards[x].hasAnyRowConflicts()) {
  //           piecesPlayed++;
  //           checker(matrix, x);
  //         } else {
  //           startingBoards[x].togglePiece(r, c);
  //         }
  //       }
  //       // if (piecesPlayed === n) {
  //       //   allPossible.push(matrix);
  //       //   startingBoardIndex++;
  //       //   return;
  //       // }
  //     }
  //   }
  //   if (piecesPlayed === n) {
  //     allPossible.push(startingBoards[x].rows());
  //     piecesPlayed = 1;
  //     return;
  //   }
  // };

  // for (var x = 0; x < startingBoards.length; x++) {
  //   var matrix = startingBoards[x].rows();
  //   checker(matrix, x);
  // }


  // solution = allPossible[0];
  // console.log('initial boards', startingBoards);
  // console.log('all solutions', allPossible);
  // return solution;