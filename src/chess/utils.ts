import blackBishop from "@src/assets/chesspieces/bB.png";
import blackKing from "@src/assets/chesspieces/bK.png";
import blackKnight from "@src/assets/chesspieces/bN.png";
import blackPawn from "@src/assets/chesspieces/bP.png";
import blackQueen from "@src/assets/chesspieces/bQ.png";
import blackRook from "@src/assets/chesspieces/bR.png";
import whiteBishop from "@src/assets/chesspieces/wB.png";
import whiteKing from "@src/assets/chesspieces/wK.png";
import whiteKnight from "@src/assets/chesspieces/wN.png";
import whitePawn from "@src/assets/chesspieces/wP.png";
import whiteQueen from "@src/assets/chesspieces/wQ.png";
import whiteRook from "@src/assets/chesspieces/wR.png";
import { Square } from "chess.js";
import { BoardPosition, PieceSymbol } from "./types";

export function getSquareFromPosition(position: BoardPosition): Square {
  return `${String.fromCharCode(position.col + "a".charCodeAt(0))}${
    8 - position.row
  }` as Square;
}

export function getPositionFromSquare(square: Square): BoardPosition {
  return {
    row: 8 - parseInt(square.slice(1)),
    col: square.charCodeAt(0) - "a".charCodeAt(0),
  };
}

export const pieceToImgMap: Record<PieceSymbol, string> = {
  b: blackBishop,
  k: blackKing,
  n: blackKnight,
  p: blackPawn,
  q: blackQueen,
  r: blackRook,
  B: whiteBishop,
  K: whiteKing,
  N: whiteKnight,
  P: whitePawn,
  Q: whiteQueen,
  R: whiteRook,
};
