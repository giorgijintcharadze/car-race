import { create, type StateCreator } from "zustand";
import type { RaceStatus } from "../feature/Garage/types/engine.types";
import type { SortOrder, WinnerSort } from "../feature/winners/types/winner.types";
import { DEFAULT_CAR_COLOR, VIEWS, type ViewType } from "../utils/constants";

export interface AppState {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  garagePage: number;
  setGaragePage: (page: number) => void;
  winnersPage: number;
  setWinnersPage: (page: number) => void;
  newCarName: string;
  setNewCarName: (name: string) => void;
  newCarColor: string;
  setNewCarColor: (color: string) => void;
  selectedCarId: number | null;
  selectedCarRevision: number;
  selectCar: (id: number, name: string, color: string) => void;
  clearSelectedCar: () => void;
  updateCarName: string;
  setUpdateCarName: (name: string) => void;
  updateCarColor: string;
  setUpdateCarColor: (color: string) => void;
  movingCars: Record<number, boolean>;
  setMovingCar: (id: number, isMoving: boolean) => void;
  raceStatus: RaceStatus;
  setRaceStatus: (status: RaceStatus) => void;
  winnerSort: WinnerSort;
  setWinnerSort: (sort: WinnerSort) => void;
  winnerOrder: SortOrder;
  setWinnerOrder: (order: SortOrder) => void;
}

type StoreSetter = Parameters<StateCreator<AppState>>[0];

const createNavigationState = (set: StoreSetter) => ({
  activeView: VIEWS.GARAGE,
  setActiveView: (view: ViewType) => set({ activeView: view }),
  garagePage: 1,
  setGaragePage: (page: number) => set({ garagePage: page }),
  winnersPage: 1,
  setWinnersPage: (page: number) => set({ winnersPage: page }),
});

const createCarFormState = (set: StoreSetter) => ({
  newCarName: "",
  setNewCarName: (name: string) => set({ newCarName: name }),
  newCarColor: DEFAULT_CAR_COLOR,
  setNewCarColor: (color: string) => set({ newCarColor: color }),
  selectedCarId: null,
  selectedCarRevision: 0,
  updateCarName: "",
  setUpdateCarName: (name: string) => set({ updateCarName: name }),
  updateCarColor: DEFAULT_CAR_COLOR,
  setUpdateCarColor: (color: string) => set({ updateCarColor: color }),
});

const createSelectionActions = (set: StoreSetter) => ({
  selectCar: (id: number, name: string, color: string) =>
    set((state) => ({
      selectedCarId: id,
      selectedCarRevision: state.selectedCarRevision + 1,
      updateCarName: name,
      updateCarColor: color,
    })),
  clearSelectedCar: () =>
    set({ selectedCarId: null, updateCarName: "", updateCarColor: DEFAULT_CAR_COLOR }),
});

const createRaceState = (set: StoreSetter) => ({
  movingCars: {},
  setMovingCar: (id: number, isMoving: boolean) =>
    set((state) => {
      const movingCars = { ...state.movingCars };
      if (isMoving) {
        movingCars[id] = true;
      } else {
        delete movingCars[id];
      }
      return { movingCars };
    }),
  raceStatus: "idle" as RaceStatus,
  setRaceStatus: (status: RaceStatus) => set({ raceStatus: status }),
});

const createWinnerState = (set: StoreSetter) => ({
  winnerSort: "wins" as WinnerSort,
  setWinnerSort: (sort: WinnerSort) => set({ winnerSort: sort }),
  winnerOrder: "ASC" as SortOrder,
  setWinnerOrder: (order: SortOrder) => set({ winnerOrder: order }),
});

export const useAppStore = create<AppState>((set) => ({
  ...createNavigationState(set),
  ...createCarFormState(set),
  ...createSelectionActions(set),
  ...createRaceState(set),
  ...createWinnerState(set),
}));

export const useInteractionLocked = () =>
  useAppStore(
    (state) => state.raceStatus !== "idle" || Object.values(state.movingCars).some(Boolean),
  );
