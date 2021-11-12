import { board } from './Board.js'
import { player } from './Player.js'
import { computer } from './Computer.js'

export const Game = (()=>{
    let _player1 = player("O", true);
    let _player2;
    let counter = 0;
    let lastMove ={row: 0, col: 0};
    let _gameOver = false;
    let isCpuFair = false;
    let isActive = false;
    const _board = board();

    const _getPlayerInfo = () => {
        //let playerOrCPU = 1;
        // do{
        //     playerOrCPU = 1 //prompt("Player vs Player or CPU");
        //     if(playerOrCPU == "0")
        //         _player2 = player("X", false);
        //     else if(playerOrCPU == "1")
        //         _player2 = computer("X", false);
        // }while(playerOrCPU != "0" && playerOrCPU != "1") 
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
            if(!_board.getColCoords(e.target))
                return;
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
            let coords = null;
            if(isCpuFair)
                coords = player.fairCpuMove(_board, player);
            else
                coords = player.findBestMove(_board, player);

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

    const handleModes = (e)=> {
        e.preventDefault(); 
        
        _chooseMode(_selectCheckedMode().value);
    };

    const _selectCheckedMode = ()=>{
        return [...document.getElementsByName("mode")].filter((radio)=>{
            return radio.checked;
        })[0];
    };

    const _chooseMode = (selectedMode)=>{
        _board.reset();
        _gameOver = false;
        if(selectedMode == 0)
            _player2 = player("X", false);
        else{
            _player2 = computer("X", false);
            isCpuFair = selectedMode == 1 ? true : false;
        }
        _step();
    };
    let modes = document.getElementById("mode-form"); // radio buttons not selecting between modes
    modes.addEventListener('submit', handleModes);
    _board.render();
    _board.update();
    //_getPlayerInfo();
   
    
})();