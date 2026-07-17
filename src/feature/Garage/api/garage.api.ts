import { API } from "../../../common/api/endpoints";
import type { Car } from "../types/car.types";
import type { GarageFormValues } from "../types/garage-form.types";

export const getAllCars = async (page: number, limit: number = 2): Promise<Car[]> => {
  const res = await fetch(`${API.BASE_URL}${API.GARAGE}?_page=${page}&_limit=${limit}`);

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
