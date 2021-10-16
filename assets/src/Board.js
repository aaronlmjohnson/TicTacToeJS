
 export const board = (()=>{
    const _board = [["", "", ""], ["", "", ""], ["", "", ""]];
    
    function hello(){
        console.log("hi");
    }
    function _render(){
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
            col.className = `col ${i}-${j}`
            col.innerText = _board[i][j];
            row.appendChild(col);
        }
    }

    function setCol(row, col, value){
        const column = document.getElementsByClassName(`${row}-${col}`)[0];
        column.innerText = value;
        _board[row][col] = value;
    }

    function getCol(row, col) {
        return _board[row][col];
    }

    function getCols(){
        return Array.from(document.getElementsByClassName("col"));
    }

    function getColCoords(element){
        const coordStr = element.classList[1];

        return {row: parseInt(coordStr[0]), col: parseInt(coordStr[2])};
    }

    const isFull = ()=>{
        return !_board.flat().includes("");
    } 

    const rowValuesMatch = (row)=>{
        return _board[row].every((cell)=> cell === _board[row][1] && cell !== "" );
    }

    const colValuesMatch = (col)=>{
        const column = _board.map(row => row[col]);
        return column.every((cell)=> cell === column[0] && column[0] !== "");
    }
    _render();

    return {
        setCol,
        getCol,
        getCols, 
        getColCoords,
        isFull,
        rowValuesMatch,
        colValuesMatch
    };

})();


