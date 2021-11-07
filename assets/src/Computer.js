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

    const evaluate = (board, cell, player)=>{
        if(board.rowValuesMatch(cell.row) || board.colValuesMatch(cell.col) ||
           board.posDiagMatch() || board.negDiagMatch()){
            if(player.isX())
                return 10;
            else
                return -10;
        } else 
            return 0;
    };

    const findBestMove = (board, cell, player)=>{
        board.availableMoves().forEach((move)=>{
            const currentBoard = _cloneBoard(board.getValues());
            currentBoard[move.row][move.col] = player.getPiece();
            
            _minimax(currentBoard, 0, player.getPiece() == "O" ? false : true);
        });
    };

    const _minimax = (board, depth, isMax) =>{
        //if terminal condition is met then return value

        _availableMoves(board).forEach((move)=>{
            _prettyConsBoard(board);
            if(isMax){

            } else {

            }
            //check out moves and minimax further
        });
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

    const _availableMoves = (board) =>{
        const moves = [];
        for(let row = 0; row < board.length; row++){
            for(let col = 0; col < board[row].length; col++){
                if(board[row][col] === "")
                    moves.push({row, col});
            }
        }
        return moves;
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