export const player = (piece, isFirst)=>{
    const getPiece = () => piece;
    const getIsFirst = () => isFirst;
    return { getPiece, getIsFirst};
};