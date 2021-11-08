import { board } from './Board.js'
import { player } from './Player.js'
import { computer } from './Computer.js'

export const Game = (()=>{
    let _player1 = player("X", true);
    let _player2;
    let counter = 0;
    let lastMove ={row: 0, col: 0};
    let _gameOver = false;
    const _board = board();

    const _getPlayerInfo = () => {
        let playerOrCPU = 1;
        do{
            playerOrCPU = 1 //prompt("Player vs Player or CPU");
            if(playerOrCPU == "0")
                _player2 = player("O", false);
            else if(playerOrCPU == "1")
                _player2 = computer("O", false);
        }while(playerOrCPU != "0" && playerOrCPU != "1") 
    }

    const _playTurn = (player, coords)=>{ 
        if(!coords) //prevents CPU from making move when games over
            return;
        _board.setCol(coords.row, coords.col, player.getPiece());
        _board.deactivateCell(coords.row, coords.col);
        lastMove = coords;
        counter++;
        
    }

    const _play = (e)=> {
            let coords = _board.getColCoords(e.target);
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
            let coords = player.findBestMove(_board, player);
            
            _playTurn(player, coords);
            
            _isGameOver(coords, player); 
        }
        _board.update();
        setTimeout(()=>{
            if(!_gameOver)
                document.addEventListener('click', _play);
        });
    }

    const _isWinner = (cell)=>{
        return _board.rowValuesMatch(cell.row) ||
        _board.colValuesMatch(cell.col) ||
        _board.negDiagMatch() ||
        _board.posDiagMatch();
    };

    const _isTie = ()=>{
        return _board.isFull();
    };
    
    const _isGameOver = (coords, player)=>{
        
        if(_isWinner(coords) || _isTie()){
            _board.update();
            _gameOver = true;
            document.removeEventListener('click', _play);
            console.log(_isWinner(coords) ?  `${player.getPiece()} wins!` : "Tie!" );
        }
    };

    _board.render();
    _board.update();
    _getPlayerInfo();
    _step();
   
    
})();