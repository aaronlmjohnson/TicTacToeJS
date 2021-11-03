export const player = (piece, isFirst)=>{
    const getPiece = () => piece;
    const getIsFirst = () => isFirst;
    const isX = () => piece == "X" ? true : false;
    const isO = () => piece == "O" ? true : false;
    const isCPU = false;
    return { getPiece, getIsFirst, isCPU, isX, isO};
};