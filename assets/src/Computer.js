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

    return Object.assign({}, 
        prototype,
        { determineMove,
          isCPU
        }
    );

    
}