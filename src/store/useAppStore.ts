import { create } from "zustand";
import { VIEWS, type ViewType } from "../utils/constants";
import type { SortOrder, WinnerSort } from "../feature/winners/types/winner.types";

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

  selectedCarId: number | null;
  setSelectedCarId: (id: number | null) => void;

  updateCarName: string;
  setUpdateCarName: (name: string) => void;
  updateCarColor: string;
  setUpdateCarColor: (color: string) => void;

  movingCars: Record<number, boolean>;
  setMovingCar: (id: number, isMoving: boolean) => void;

  winnerSort: WinnerSort;
  setWinnerSort: (sort: WinnerSort) => void;

  winnerOrder: SortOrder;
  setWinnerOrder: (order: SortOrder) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeView: VIEWS.GARAGE,
  selectedCarId: null,
  setActiveView: (view) => set({ activeView: view }),

  garagePage: 1,
  setGaragePage: (page) => set({ garagePage: page }),
  winnersPage: 1,
  setWinnersPage: (page) => set({ winnersPage: page }),

  newCarName: "",
  setNewCarName: (name) => set({ newCarName: name }),
  newCarColor: "#000000",
  setNewCarColor: (color) => set({ newCarColor: color }),

  setSelectedCarId: (id) => set({ selectedCarId: id }),

  updateCarName: "",
  setUpdateCarName: (name) => set({ updateCarName: name }),
  updateCarColor: "#000000",
  setUpdateCarColor: (color) => set({ updateCarColor: color }),

  movingCars: {},
  setMovingCar: (id, isMoving) =>
    set((state) => ({
      movingCars: { ...state.movingCars, [id]: isMoving },
    })),

  // garagePage: 1,
  // setGaragePage: (page) => set({ garagePage: page }),

  // winnersPage: 1,
  // setWinnersPage: (page) => set({ winnersPage: page }),

  winnerSort: "wins",
  setWinnerSort: (sort) => set({ winnerSort: sort }),

  winnerOrder: "ASC",
  setWinnerOrder: (order) => set({ winnerOrder: order }),
}));
