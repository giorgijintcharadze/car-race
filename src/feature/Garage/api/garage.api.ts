import { API } from "../../../common/api/endpoints";
import { ENGINE_STATUS, GARAGE_LIMIT_PAGE } from "../../../utils/constants";
import { deleteWinner } from "../../winners/api/winners.api";
import type { GarageFormValues } from "../schema/garage.schema";
import type { Car, GarageResponse } from "../types/car.types";
import type { EngineTelemetry } from "../types/engine.types";

const assertResponse = (response: Response, action: string): void => {
  if (!response.ok) {
    throw new Error(`${action}: ${response.status}`);
  }
};

export const getAllCars = async (
  page: number,
  limit: number = GARAGE_LIMIT_PAGE,
): Promise<GarageResponse> => {
  const response = await fetch(`${API.BASE_URL}${API.GARAGE}?_page=${page}&_limit=${limit}`);
  assertResponse(response, "Failed to fetch cars");

  return {
    cars: await response.json(),
    total: Number(response.headers.get("X-Total-Count")),
  };
};

export const getCarById = async (id: number | string): Promise<Car> => {
  const response = await fetch(`${API.BASE_URL}${API.GARAGE}/${id}`);
  assertResponse(response, "Failed to fetch car");
  return response.json();
};

export const deleteCar = async (id: number | string): Promise<void> => {
  const response = await fetch(`${API.BASE_URL}${API.GARAGE}/${id}`, { method: "DELETE" });
  assertResponse(response, "Failed to delete car");
  await deleteWinner(Number(id));
};

export const createCar = async (data: GarageFormValues): Promise<Car> => {
  const response = await fetch(`${API.BASE_URL}${API.GARAGE}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  assertResponse(response, "Failed to create car");
  return response.json();
};

export const updateCar = async (id: number | string, data: GarageFormValues): Promise<Car> => {
  const response = await fetch(`${API.BASE_URL}${API.GARAGE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  assertResponse(response, "Failed to update car");
  return response.json();
};

export const getAllCarsWithoutPagination = async (): Promise<Car[]> => {
  const response = await fetch(`${API.BASE_URL}${API.GARAGE}`);
  assertResponse(response, "Failed to fetch cars");
  return response.json();
};

export const toggleEngine = async (
  id: number,
  status: "started" | "stopped",
): Promise<EngineTelemetry> => {
  const response = await fetch(`${API.BASE_URL}/engine?id=${id}&status=${status}`, {
    method: "PATCH",
  });
  assertResponse(response, "Failed to toggle engine");
  return response.json();
};

export const driveCar = async (id: number): Promise<void> => {
  const response = await fetch(`${API.BASE_URL}/engine?id=${id}&status=${ENGINE_STATUS.DRIVE}`, {
    method: "PATCH",
  });
  assertResponse(response, "Drive failed");
};
