import blackBishop from "./assets/chesspieces/bB.png";
import blackKing from "./assets/chesspieces/bK.png";
import blackKnight from "./assets/chesspieces/bN.png";
import blackPawn from "./assets/chesspieces/bP.png";
import blackQueen from "./assets/chesspieces/bQ.png";
import blackRook from "./assets/chesspieces/bR.png";
import whiteBishop from "./assets/chesspieces/wB.png";
import whiteKing from "./assets/chesspieces/wK.png";
import whiteKnight from "./assets/chesspieces/wN.png";
import whitePawn from "./assets/chesspieces/wP.png";
import whiteQueen from "./assets/chesspieces/wQ.png";
import whiteRook from "./assets/chesspieces/wR.png";

export type PieceSymbol =
  | "b"
  | "k"
  | "n"
  | "p"
  | "q"
  | "r"
  | "B"
  | "K"
  | "N"
  | "P"
  | "Q"
  | "R";

export const pieceMap: Record<PieceSymbol, string> = {
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
