import { create } from "zustand";
import { VIEWS, type ViewType } from "../utils/constants";

interface AppState {
  // 1. აქტიური გვერდი
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;

  // 2. პაგინაციის მონაცემები
  garagePage: number;
  setGaragePage: (page: number) => void;
  winnersPage: number;
  setWinnersPage: (page: number) => void;

  // 3. ფორმაში ჩაწერილი ტექსტი
  newCarName: string;
  setNewCarName: (name: string) => void;
  newCarColor: string;
  setNewCarColor: (color: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeView: VIEWS.GARAGE,
  setActiveView: (view) => set({ activeView: view }),

  garagePage: 1,
  setGaragePage: (page) => set({ garagePage: page }),
  winnersPage: 1,
  setWinnersPage: (page) => set({ winnersPage: page }),

  newCarName: "",
  setNewCarName: (name) => set({ newCarName: name }),
  newCarColor: "#000000", // დეფოლტ ფერი
  setNewCarColor: (color) => set({ newCarColor: color }),
}));
