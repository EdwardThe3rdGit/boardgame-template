import { INVALID_MOVE } from 'boardgame.io/core';

function isDraw(cells){
  let count = 0
  for(const element of cells) {
    if(element !== null) {
      count = count + 1
    }
  }
  if(count == 9){
    return true
  } else {
    return false
  }
}

function isVictory(cells){
  let p = TicTacToe.endIf.ctx.currentPlayer
  if(cells[0] == p) {
    if(cells[1] == p && cells[2] == p) {
      return p
    }
    if(cells[3] == p && cells[6] == p) {
      return p
    }
    if(cells[4] == p && cells[8] == p) {
      return p
    }
  }

  if(cells[8] == p){
    if(cells[2] == p && cells[5] == p) {
      return p
    }
    if(cells[6] == p && cells[7] == p) {
      return p
    }
  }

  if(cells[4] == p) {
    if(cells[1] == p && cells[7] == p) {
      return p
    }
    if(cells[3] == p && cells[5] == p) {
      return p
    }
    if(cells[2] == p && cells[6] == p) {
      return p
    }
  }
  return null
}


export const TicTacToe = {
  // Tutorial things go here
  setup: function setup() {
    return {cells: [null,null,null,null,null,null,null,null,null]}
  },

  moves: {
    clickCell: function clickCell(move, cellIndex) {
      if (move.G.cells[cellIndex] !== null) {
        return INVALID_MOVE;
      }
      move.G.cells[cellIndex] = move.playerID;
    }
  },

  turn: {
    minMoves: 1,
    maxMoves: 1,
  },

 

  endIf: function endIf(endIf) {
    const winner = isVictory(endIf.G.cells);
    if (winner != null) {
      // our isVictory function returned a playerID so the game is over and we have a winner
      return { winner: winner };
    }
    // if there is no winner, check if the game is a draw
    if (isDraw(endIf.G.cells)) {
      // the game is a draw, so we tell boardgame.io that result
      return { draw: true };
    }
  },

  ai: {
    enumerate: function enumerate(G)  {
      // this function returns the top left cell as the only possible move every time
      // Modify this function so that it will return all possible TicTacToe moves to make the
      // bot actually play the game based on `G.cells`.
      // Think about what moves are possible in TicTacToe and how you can find them in our cells array.
      let moves = [];
      for (let i = 0; i < 9; i++) {
        if (G.cells[i] === null) {
          moves.push({ move: 'clickCell', args: [i] });
        }
      }
      return moves;
    },
  },

};

