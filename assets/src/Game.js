import { board } from './Board.js'
import { player } from './Player.js'

const Game = (()=>{
    let _player1 = player("X", true);
    let _player2;
    let counter = 0;

    const _getPlayerInfo = () => {
        let playerOrCPU = 0;
        do{
            playerOrCPU = 0 //prompt("Player vs Player or CPU");
            if(playerOrCPU == "0")
                _player2 = player("O", false);
            else if(playerOrCPU == "1")
                console.log("CPU is player 2.");
        }while(playerOrCPU != "0" && playerOrCPU != "1") 
    }

    const _playTurn = (player, coords)=>{ 
        board.setCol(coords.row, coords.col, player.getPiece());
        counter++;
    }

    const _play = (e)=> {
       // document.addEventListener('click', (e)=>{
            
            const  coords = board.getColCoords(e.target);
            const  player = counter % 2 < 1 ? _player1 : _player2;

            if(e.target.matches('.col')){
                _playTurn(player, coords);
                e.target.classList.add("inactive");
                console.log(_isWinner(coords, player));
            }

            if(_isWinner(coords)){
                console.log(`${player.getPiece()} has won!`);
                document.removeEventListener('click', _play);
            }

       // });
    };

    const _isWinner = (cell)=>{
        return board.rowValuesMatch(cell.row) ||
        board.colValuesMatch(cell.col) ||
        board.negDiagMatch() ||
        board.posDiagMatch();
    }

    const _isTie = ()=>{

    }

    
    _getPlayerInfo();

    // _play();
    document.addEventListener('click', _play);
    
    
    
})();