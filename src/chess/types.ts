import { Square, WHITE, BLACK } from "chess.js";

export type PlayerColor = typeof WHITE | typeof BLACK;

export interface BoardPosition {
  row: number;
  col: number;
}

export type DraggingPiece = {
  position: { left: number; top: number };
  square: Square;
};

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
