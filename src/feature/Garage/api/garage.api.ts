import { API } from "../../../common/api/endpoints";
import { GARAGE_LIMIT_PAGE } from "../../../utils/constants";

import type { Car, GarageResponse } from "../types/car.types";
import type { GarageFormValues } from "../types/garage-form.types";

export const getAllCars = async (
  page: number,
  limit: number = GARAGE_LIMIT_PAGE,
): Promise<GarageResponse> => {
  const res = await fetch(`${API.BASE_URL}${API.GARAGE}?_page=${page}&_limit=${limit}`);

  if (!res.ok) throw new Error(`error ${res.status}`);

  const total = Number(res.headers.get("X-Total-Count"));
  const cars = await res.json();
  return {
    cars,
    total,
  };
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

export const createManyCars = async (data: GarageFormValues[]) => {
  await Promise.all(data.map((car) => createCar(car)));
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

export const getAllCarsWithoutPagination = async (): Promise<Car[]> => {
  const res = await fetch(`${API.BASE_URL}${API.GARAGE}`);

  if (!res.ok) throw new Error("Failed to fetch cars");

  return res.json();
};
