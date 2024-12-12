import { create } from "zustand";

interface Store {
  numMoves: number;
  addMove: () => void;
  resetNumMoves: () => void;
}

interface State {
  numMoves: number;
}

const useStore = create<Store>((set) => ({
  numMoves: 0,
  addMove: () => set((state: State) => ({ numMoves: state.numMoves + 1 })),
  resetNumMoves: () => set({ numMoves: 0 }),
}));

export default useStore;
