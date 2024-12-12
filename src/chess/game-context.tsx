import { Chess } from "chess.js";
import { createContext, useContext, ReactNode, useState } from "react";

type GameContextType = {
  game: Chess;
  setGame: (game: Chess) => void;
};

const GameContext = createContext<GameContextType | null>(null);

export function ChessGameProvider({ children }: { children: ReactNode }) {
  const [game, setGameInstance] = useState(new Chess());
  const setGame = (game: Chess) => {
    setGameInstance(new Chess(game.fen()));
  };

  return (
    <GameContext.Provider value={{ game, setGame }}>
      {children}
    </GameContext.Provider>
  );
}

export function useChessGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useChessGame must be used within a ChessGameProvider");
  }
  return context;
}
