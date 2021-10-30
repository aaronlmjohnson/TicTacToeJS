import { board } from './Board.js'
import { player } from './Player.js'
import { computer } from './Computer.js'

const Game = (()=>{
    let _player1 = player("X", true);
    let _player2;
    let counter = 0;
    let lastMove ={row: 0, col: 0};
    let _gameOver = false;
    const _getPlayerInfo = () => {
        let playerOrCPU = 1;
        do{
            playerOrCPU = 0 //prompt("Player vs Player or CPU");
            if(playerOrCPU == "0")
                _player2 = player("O", false);
            else if(playerOrCPU == "1")
                _player2 = computer("O", false);
        }while(playerOrCPU != "0" && playerOrCPU != "1") 
    }

    const _playTurn = (player, coords)=>{ 
        if(!coords) //prevents CPU from making move when games over
            return;
        board.setCol(coords.row, coords.col, player.getPiece());
        board.deactivateCell(coords.row, coords.col);
        lastMove = coords;
        counter++;
        
    }

    const _play = (e)=> {
            let coords = board.getColCoords(e.target);
            const  player = counter % 2 < 1 ? _player1 : _player2;

           if(player.isCPU)
            return;

            if(e.target.matches('.col')){
                _playTurn(player, coords);
            }
            _isGameOver(coords, player);
            window.requestAnimationFrame(_step);
    };

    const _step = ()=> {
        if(_gameOver)
            return;
            
        const  player = counter % 2 < 1 ? _player1 : _player2;

        if(player.isCPU){
            let coords = player.determineMove(board.getValues())
            _playTurn(player, coords);
            _isGameOver(coords, player); 
        }

        setTimeout(()=>{
            if(!_gameOver)
                document.addEventListener('click', _play);
        });
        
    }

    const _isWinner = (cell)=>{
        return board.rowValuesMatch(cell.row) ||
        board.colValuesMatch(cell.col) ||
        board.negDiagMatch() ||
        board.posDiagMatch();
    };

    const _isTie = ()=>{
        return board.isFull();
    };
    
    const _isGameOver = (coords, player)=>{
        
        if(_isWinner(coords) || _isTie()){
            _gameOver = true;
            document.removeEventListener('click', _play);
            console.log(_isTie() ? "Tie!" : `${player.getPiece()} wins!`);
        }

    };

    
    _getPlayerInfo();
    _step();
    
    
})();