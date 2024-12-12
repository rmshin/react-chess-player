import { Chess } from "chess.js";
import { createContext, useContext, ReactNode, useState } from "react";

type GameContextType = {
  game: Chess;
  setGame: (game: Chess) => void;
};

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [game, setGame] = useState(new Chess());

  return (
    <GameContext.Provider value={{ game, setGame }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
