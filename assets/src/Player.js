export const player = (piece, isFirst)=>{
    const getPiece = () => piece;
    const getIsFirst = () => isFirst;
    const isCPU = false;
    return { getPiece, getIsFirst, isCPU};
};