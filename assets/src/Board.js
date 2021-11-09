
 export const board = ((values = null)=>{
    let _board = values || [["", "", ""], 
                            ["", "", ""], 
                            ["", "", ""]];
    //[["", "O", ""], ["O", "X", ""], ["", "X", "O"]]
    
    const render = ()=>{
        const board = document.createElement("div");
        board.id = "board";
        _createRows(board);
        
        document.body.appendChild(board);
    };

    const update = () =>{
        _board.forEach((row, i) =>{
            row.forEach((col, j) =>{
                const column = document.getElementsByClassName(`${i}-${j}`)[0];
                col != "" ? deactivateCell(i, j) : false;
                column.innerText = col;
            });
        });
    };

    const _createRows = (board)=>{
        for(let i = 0; i < _board.length; i++){
            let row = document.createElement("div");
            row.className = "row";
            _createColumns(row, i);
            board.appendChild(row);
        }
    };

    const _createColumns = (row, i)=>{
        for(let j = 0; j < _board[i].length; j++){
            let col = document.createElement("div");
            col.className = `col ${i}-${j}`
            col.innerText = _board[i][j];
            row.appendChild(col);
        }
    };
    const setValues = (values)=>{
        _board = values;
    }
    const getValues = ()=>{
        return _board;
    };
    const setCol = (row, col, value)=>{
        _board[row][col] = value;
    };

    const getCol= (row, col)=> {
        return _board[row][col];
    };

    const getCols = ()=>{
        return Array.from(document.getElementsByClassName("col"));
    };

    const getColCoords = (element)=>{
        if(element.className == "row")
            return;
        const coordStr = element.classList[1];

        return {row: parseInt(coordStr[0]), col: parseInt(coordStr[2])};
    };

    const isFull = ()=>{
        return !_board.flat().includes("");
    };

    const rowValuesMatch = (row)=>{
        return _board[row].every((cell)=> cell === _board[row][0] && cell !== "" );
    };

    const colValuesMatch = (col)=>{
        const column = _board.map(row => row[col]);
        return column.every((cell)=> cell === column[0] && column[0] !== "");
    };;

    const negDiagMatch = ()=>{
        const diag = _board.map((row, i) =>{ return row[i]});
        return diag.every(cell => cell == diag[0] && diag[0] !== "");
    };

    const posDiagMatch = ()=> {
        const diag = _board.map((row, i) => {return row[Math.abs(-2 + i)]});
        return diag.every(cell => cell == diag[0] && diag[0] !== "");
    };
    
    const getCellElement = (row, col)=>{
        return document.getElementsByClassName(`${row}-${col}`)[0];
    };

    const deactivateCell = (row, col) => {
        getCellElement(row, col).classList.add("inactive");;

    };

    const setCustomBoard = (boardArray) => {
        _board = boardArray;
    };
    
    const isRowMatch = () =>{
       for(let row = 0; row < _board.length; row++){
           if(rowValuesMatch(row))
            return true; 
       }
       return false;
    };

    const isColMatch = ()=>{
        for(let col = 0; col < _board.length; col++){
            if(colValuesMatch(col))
                return true;
        }
        return false;
    };

    const isTerminalState = ()=>{
        if(isRowMatch() || isColMatch() || posDiagMatch() || negDiagMatch() || isFull())
            return true;
        return false;
    };

    const isAnyMatch = () =>{
        if(isRowMatch() || isColMatch() || posDiagMatch() || negDiagMatch())
            return true;
        return false;
    };

    const availableMoves = () => {
        const moves = [];
        for(let row = 0; row < _board.length; row++){
            for(let col = 0; col < _board[row].length; col++){
                if(_board[row][col] === "")
                    moves.push({row, col});
            }
        }
        return moves;
    };
    

    return {
        render,
        setValues,
        getValues,
        setCol,
        getCol,
        getCols, 
        getColCoords,
        isFull,
        rowValuesMatch,
        colValuesMatch,
        negDiagMatch,
        posDiagMatch,
        getCellElement,
        deactivateCell,
        setCustomBoard,
        isRowMatch,
        isColMatch,
        isAnyMatch,
        isTerminalState,
        availableMoves,
        update
    };

});


