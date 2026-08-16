import { describe, expect, it } from "vitest";
import { GarageSchema } from "../feature/Garage/schema/garage.schema";
import { RANDOM_CARS_COUNT } from "./constants";
import { generateCars } from "./generateCars";

describe("generateCars", () => {
  it("creates exactly 100 valid cars", () => {
    const cars = generateCars(RANDOM_CARS_COUNT);
    expect(cars).toHaveLength(RANDOM_CARS_COUNT);
    expect(cars.every((car) => GarageSchema.safeParse(car).success)).toBe(true);
  });
});
