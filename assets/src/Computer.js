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
            let currVal = _minimax(nextBoard, 1, player.getPiece() == "X" ? false : true);

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

    const _minimax = (board, depth, isMax) =>{ //X is the max O is the min, isMax within method is a bit confusing to read might change

        if(board.isTerminalState()) 
            return evaluate(board, !isMax ? true : false);

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
}