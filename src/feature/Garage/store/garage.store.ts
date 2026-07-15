import { create } from "zustand";
import type { GarageFormValues } from "../schema/garage.schema";
import type { Car } from "../types/car.types";

type GarageStore = {
  cars: GarageFormValues[];
  setCars: (cars: Car[]) => void;
  addCar: (care: GarageFormValues) => void;
  clearCars: () => void;
};
export const useGarageStore = create<GarageStore>((set) => ({
  cars: [],

  setCars: (cars) => set({ cars }),
  addCar: (car) => set((state) => ({ cars: [...state.cars, car] })),
  clearCars: () => set(() => ({ cars: [] })),
}));
