import { board } from './Board.js'

const Game = (()=>{
    board.setCol(1, 1, "X");
    console.log(board.getCol(1,1));
})();