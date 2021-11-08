import { board } from './Board.js';
import { player } from './Player.js'

export  const computer = (piece, isFirst)=>{
    const prototype = player(piece, isFirst);
    const isCPU = true;
    const determineMove = (board) =>{
        for(let i = 0; i < board.length; i++){
            let emptyCol = board[i].indexOf("");
            if(emptyCol > -1)
                return {row: i, col: emptyCol};
        }
    }

    const evaluate = (board, isMax)=>{
        if(board.isAnyMatch()){
            if(isMax)
                return 1;
            else
                return -1;
        } else 
            return 0;
    };

    const findBestMove = (board, player)=>{
        let bestMove = null;
        let bestVal = player.getPiece() == "X" ? -Infinity : Infinity;
        const moveScore = [];
        board.availableMoves().forEach((move)=>{
             
             const nextBoard = _nextBoard(board, move, player.getPiece());
             //_prettyConsBoard(nextBoard.getValues());
            let currVal = _minimax(nextBoard, 0, player.getPiece() == "O" ? false : true);
            if(player.getPiece() == "X"){ // maximizer
                if(currVal > bestVal){
                    bestVal = currVal;
                    bestMove = move;
                }
            } else { // minimizer
                if(currVal < bestVal){
                    bestVal = currVal;
                    bestMove = move;
                }
            }
        });
        return bestMove;
    };

    const _minimax = (board, depth, isMax) =>{ // figure out why i'm getting NaN values on return 
        //if terminal condition is met then return value
        //_prettyConsBoard(board.getValues());
        if(board.isTerminalState()) 
            return evaluate(board, isMax ? true : false)
        let bestVal =  isMax ? -Infinity : Infinity;
        board.availableMoves().forEach((move)=>{

            const nextBoard = _nextBoard(board, move, isMax ? "X" : "O");

            if(isMax){
                let value = _minimax(nextBoard, depth + 1, false);
                bestVal = Math.max(bestVal, value);
            } else {
                let value =  _minimax(nextBoard, depth + 1, true);
                bestVal = Math.min(bestVal, value);
            }
        });
        return bestVal;
    }   

    const _cloneBoard = (boardArr)=>{
        return boardArr.map(row => [...row]);
    }

    const _prettyConsBoard = (board) => {
        board.forEach((row)=>{
            console.log(`[${row[0] || " "}][${row[1] || " "}][${row[2] || " "}]\n`);
        });
        console.log("\n");
    };

    const _nextBoard = (currentBoard, move, piece) => {
        const currentBoardArr = _cloneBoard(currentBoard.getValues());
        currentBoardArr[move.row][move.col] = piece;
        return board(currentBoardArr);
    };


    return Object.assign({}, 
        prototype,
        { determineMove,
          isCPU,
          evaluate,
          findBestMove
        }
    );

    /*
        * take in the board
        * look through rows, cols and diagonals and see if a terminal condition is met
            *if so then see if the value is either x or o
            *if its x(the maximizer) then add a value of +1
            *if its o(the minimizer) then add a value of -1
            *if its a tiethen + 0
        *if theres no win condition return a value of +0
        
    */

    /*
        *finding best move*
            *look at every available move
            *loop through those moves and run minimax on each one
            *keep track of the current and the best move
                *if current is better than best then set best equal to current
            *return after going through all available moves
     */

    
}