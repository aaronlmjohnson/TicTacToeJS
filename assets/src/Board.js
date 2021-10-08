const board = (()=>{
    const _board = [["X", "O", "X"], ["O", "X", "O"], ["X", "", "O"]];
    

    function _createBoard(){
        const board = document.createElement("div");
        board.id = "board";
        _createRows(board);

        document.body.appendChild(board);
    };

    function _createRows (board){
        for(let i = 0; i < _board.length; i++){
            let row = document.createElement("div");
            row.className = "row";
            _createColumns(row, i);
            board.appendChild(row);
        }
    }

    function _createColumns(row, i){
        for(let j = 0; j < _board[i].length; j++){
            let col = document.createElement("div");
            col.className = "col";
            row.appendChild(col);
        }
    }

    
    _createBoard();
    const render = ()=>{

    }
})();
