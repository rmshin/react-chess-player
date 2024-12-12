import { useEffect, useState } from "react";
import { WHITE, BLACK } from "chess.js";
import {
  PlayerColor,
  DraggingPiece,
  BoardPosition,
  PieceSymbol,
} from "./chess/types";
import { ChessGameProvider, useChessGame } from "./chess/game-context";
import {
  getPositionFromSquare,
  getSquareFromPosition,
  pieceToImgMap,
} from "./chess/utils";

function ChessGame() {
  const width = 600;
  const squareWidth = width / 8;

  const playerColor: PlayerColor = WHITE;

  const [draggingPiece, setDraggingPiece] = useState<DraggingPiece | null>(
    null
  );

  return (
    <ChessGameProvider>
      <div
        className={`w-[${width}px] h-[${width}px] border border-gray-800 relative`}
      >
        <BoardGrid draggingPiece={draggingPiece} squareWidth={squareWidth} />
        <GameState
          draggingPiece={draggingPiece}
          squareWidth={squareWidth}
          playerColor={playerColor}
          setDraggingPiece={setDraggingPiece}
        />
      </div>
    </ChessGameProvider>
  );
}

function GameState({
  squareWidth,
  playerColor,
  draggingPiece,
  setDraggingPiece,
}: {
  squareWidth: number;
  playerColor: PlayerColor;
  draggingPiece: DraggingPiece | null;
  setDraggingPiece: (piece: DraggingPiece | null) => void;
}) {
  const { game, setGame } = useChessGame();
  const positions = game.board();
  const turn = game.turn();

  useEffect(() => {
    if (turn !== playerColor) {
      // Make random move
      const move = game.moves();
      const randomMove = move[Math.floor(Math.random() * move.length)];
      game.move(randomMove);
      setGame(game);
    }
  }, [draggingPiece]);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0">
      {positions.map((row) =>
        row.map((piece) => {
          if (piece === null) return null;

          const pieceSymbol: PieceSymbol =
            piece.color === BLACK
              ? piece.type
              : (piece.type.toUpperCase() as PieceSymbol);

          return (
            <BoardPiece
              key={piece.square}
              pieceImg={pieceToImgMap[pieceSymbol]}
              squareWidth={squareWidth}
              position={getPositionFromSquare(piece.square)}
              draggable={playerColor === piece.color && turn === piece.color}
              draggingPiece={draggingPiece}
              setDraggingPiece={setDraggingPiece}
            />
          );
        })
      )}
    </div>
  );
}

function BoardPiece({
  pieceImg,
  squareWidth,
  position,
  draggable = false,
  draggingPiece,
  setDraggingPiece,
}: {
  pieceImg: string;
  squareWidth: number;
  position: BoardPosition;
  draggable?: boolean;
  draggingPiece: DraggingPiece | null;
  setDraggingPiece: (piece: DraggingPiece | null) => void;
}) {
  const { game, setGame } = useChessGame();

  const isDragging = draggingPiece?.square === getSquareFromPosition(position);
  const top = isDragging
    ? draggingPiece.position.top
    : position.row * squareWidth;
  const left = isDragging
    ? draggingPiece.position.left
    : position.col * squareWidth;

  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newLeft = e.clientX - dragOffset.x;
      const newTop = e.clientY - dragOffset.y;

      setDraggingPiece({
        position: { left: newLeft, top: newTop },
        square: draggingPiece.square,
      });
    };

    const handleMouseUp = (e: MouseEvent) => {
      const targetCol = Math.round((e.clientX - dragOffset.x) / squareWidth);
      const targetRow = Math.round((e.clientY - dragOffset.y) / squareWidth);

      const targetSquare = getSquareFromPosition({
        row: targetRow,
        col: targetCol,
      });

      try {
        game.move({
          from: getSquareFromPosition(position),
          to: targetSquare,
        });
        setGame(game);
      } catch (e) {
        console.error(e);
      }

      setDraggingPiece(null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [draggingPiece, dragOffset, setDraggingPiece, game]);

  const handleMouseDown = (event: React.MouseEvent<HTMLImageElement>) => {
    if (!draggable || isDragging) return;

    event.preventDefault();

    setDragOffset({
      x: event.clientX - left,
      y: event.clientY - top,
    });
    setDraggingPiece({
      position: { left, top },
      square: getSquareFromPosition(position),
    });
  };

  return (
    <img
      src={pieceImg}
      className={`absolute ${isDragging ? "z-50" : ""}`}
      style={{
        top: `${top}px`,
        left: `${left}px`,
        width: `${squareWidth}px`,
        height: `${squareWidth}px`,
        cursor: draggable ? (isDragging ? "grabbing" : "grab") : "default",
      }}
      draggable={draggable}
      onMouseDown={handleMouseDown}
    ></img>
  );
}

function BoardGrid({
  draggingPiece,
  squareWidth,
}: {
  draggingPiece: DraggingPiece | null;
  squareWidth: number;
}) {
  const hoveredSquare = draggingPiece?.position;
  const hoveredCol = hoveredSquare
    ? Math.round(hoveredSquare.left / squareWidth)
    : null;
  const hoveredRow = hoveredSquare
    ? Math.round(hoveredSquare.top / squareWidth)
    : null;

  return (
    <div className="grid grid-cols-8 gap-0 w-full h-full">
      {[...Array(64)].map((_, index) => {
        const row = Math.floor(index / 8);
        const col = index % 8;
        const isHovered =
          hoveredSquare && hoveredRow === row && hoveredCol === col;

        return (
          <div
            key={index}
            className={`w-full h-full ${
              Math.floor(index / 8) % 2 === 0
                ? index % 2 === 0
                  ? "bg-[#b58863]"
                  : "bg-[#f0d9b5]"
                : index % 2 === 0
                ? "bg-[#f0d9b5]"
                : "bg-[#b58863]"
            } ${isHovered ? "ring-4 ring-yellow-400 ring-inset" : ""}`}
          />
        );
      })}
    </div>
  );
}

export default ChessGame;
