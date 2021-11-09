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
            let currVal = _minimax(nextBoard, 1, player.getPiece() == "X" ? false : true);// X just moved above so now its O(the minimizers turn);
            //console.log(`score:${currVal}, move: (${move.row}, ${move.col})`);
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
            //console.log("\nchecking next move...\n")
        });
        
        return bestMove;
    };

    const _minimax = (board, depth, isMax) =>{ 
        //console.log(`current depth:${depth}`);
        //_prettyConsBoard(board.getValues());
        
        //if terminal condition is met then return value
        if(board.isTerminalState()) {
            //console.log(`game finished on ${isMax ? 'X' : 'O'}  with a score of ${evaluate(board, isMax ? true : false)}.`);
            return evaluate(board, !isMax ? true : false);
        }
        // this is letting X move again even though the initial move is X(the cpu) need to make it so O is read first *********
        let bestVal =  isMax ? -Infinity : Infinity;
        board.availableMoves().forEach((move)=>{ // this might be the issue probably shouldn't loop again after checking move

            const nextBoard = _nextBoard(board, move, isMax ? "X" : "O");
            
            //console.log(`${isMax ? "X" : "O"} move: (${move.row}, ${move.col})`);
            //console.log("_______________\n");
            //_prettyConsBoard(nextBoard.getValues());
            if(isMax){
                let value = _minimax(nextBoard, depth + 1, false);
                //console.log(`Max of: ${value} and ${bestVal}`);
                bestVal = Math.max(bestVal, value);
                //console.log(`current bestVal: ${bestVal}\n`);
            } else {
                let value =  _minimax(nextBoard, depth + 1, true); 
                //console.log(`Min of: ${value} and ${bestVal}`);              
                bestVal = Math.min(bestVal, value);
                //console.log(`current bestVal: ${bestVal}\n`);

            }
        });
        // allScores.forEach(data => {
        //     console.log(data.score);
        //     _prettyConsBoard(data.board);
        // });

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