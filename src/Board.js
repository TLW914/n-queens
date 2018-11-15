// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function () {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function () {
      return _(_.range(this.get('n'))).map(function (rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function (rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function () {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function (rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function () {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function (rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function (rowIndex) {
      var row = this.rows()[rowIndex];
      var qtyPieces = row.reduce(function (accumulator, piece) {
        return accumulator += piece;
      }, 0);

      // Reduces the 'pieces' on a board to a single value.
      // Since each piece represents 1, if you reduce the row
      // and the total is more than `1`, we know that there are
      // multiple pieces in a row. Therefore, there is a conflict.

      return qtyPieces > 1 ? true : false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function () {
      var matrix = this.rows();
      var result = false;
      //Loop applies the hasRowConflict method to every row on a given board.
      for (var i = 0; i < matrix.length; i++) {
        if (this.hasRowConflictAt(i)) {
          result = true;
        }
      }
      return result;
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------

    hasColConflictAt: function (colIndex) {
      var matrix = this.rows();
      var counter = 0;

      for (var i = 0; i < matrix.length; i++) {
        if (matrix[i][colIndex] === 1) {
          counter++;
        }
      }
      return counter > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function () {
      var matrix = this.rows();
      for (var i = 0; i < matrix.length; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        } else {
          return false;
        }
      }
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict

    // Based on forumula in `_getFirstRowColumnIndexForMajorDiagonalOn`,
    // we built the logic so that if the number is positive,
    // the major diagonals will start from first row in each column.
    // However, if the index is negative, it will start from the first
    // column in the row represented by positive version of index.
    hasMajorDiagonalConflictAt: function (startingIndex) {
      var counter = 0;
      //Checks if startingIndex is positive (Starting from elements in first row)
      if (startingIndex > 0) {
        var index = startingIndex
        matrix.forEach(function (row) {
          if ((row[index] === 1) && (row[index] !== undefined)) {
            counter++;
          }
          index++;
        });
        return counter > 1 ? true : false; // If more than one value is in the Maj. Diagonal, counter will be more than 1

      } else if (startingIndex < 0) { //Checks if startingIndex is negative (Starting from elements in first column)
        var start = Math.abs(startingIndex); //Converts starting index to a positive number
        var index = 0;

        matrix.forEach(function (row, i) {
          if (i >= start) {
            if ((row[index] === 1) && (row[index] !== undefined)) {
              counter++;
            }
            index++;
          }
        });
        return counter > 1 ? true : false;
      }
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function () {
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function (startingIndex) {
      var counter = 0;
      var length = (this.rows().length - 1)
      //Checks if startingIndex is positive (Starting from elements in first row)
      if (startingIndex <= length) {
        var index = startingIndex
        matrix.forEach(function (row) {
          if ((row[index] === 1) && (row[index] !== undefined)) {
            counter++;
          }
          index--;
        });
        return counter > 1 ? true : false; // If more than one value is in the Maj. Diagonal, counter will be more than 1

      } else if (startingIndex > length) { //Checks if startingIndex is negative (Starting from elements in first column)
        var start = (startingIndex - length); //Converts starting index to a positive number
        var index = (length);

        matrix.forEach(function (row, i) {
          if (i >= start) {
            if ((row[index] === 1) && (row[index] !== undefined)) {
              counter++;
            }
            index--;
          }
        });
        return counter > 1 ? true : false;
      }
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function () {
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function (n) {
    return _(_.range(n)).map(function () {
      return _(_.range(n)).map(function () {
        return 0;
      });
    });
  };

}()); 
