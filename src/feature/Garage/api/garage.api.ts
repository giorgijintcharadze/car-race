import { API } from "../../../common/api/endpoints";
import type { Car } from "../types/car.types";
import type { GarageFormValues } from "../types/garage-form.types";

export const getAllCars = async (): Promise<Car[]> => {
  const res = await fetch(`${API.BASE_URL}${API.GARAGE}`);

  if (!res.ok) throw new Error(`error ${res.status}`);
  return res.json();
};

export const getCarById = async (id: number | string): Promise<Car> => {
  const res = await fetch(`${API.BASE_URL}${API.GARAGE}/${id}`);
  if (!res.ok) throw new Error(`error ${res.status}`);

  return res.json();
};

export const deleteCar = async (id: number | string) => {
  const res = await fetch(`${API.BASE_URL}${API.GARAGE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`error ${res.status}`);
};

export const createCar = async (data: GarageFormValues): Promise<Car> => {
  const res = await fetch(`${API.BASE_URL}${API.GARAGE}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`error ${res.status}`);
  return res.json();
};

export const updateCar = async (id: number | string, data: GarageFormValues) => {
  const res = await fetch(`${API.BASE_URL}${API.GARAGE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`error ${res.status}`);

  return res.json();
};
