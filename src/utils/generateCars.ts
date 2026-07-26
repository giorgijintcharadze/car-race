import type { GarageFormValues } from "../feature/Garage/types/garage-form.types";

const brands = [
  "Tesla",
  "BMW",
  "Audi",
  "Ford",
  "Toyota",
  "Honda",
  "Chevrolet",
  "Porsche",
  "Ferrari",
  "Mercedes",
];

const models = [
  "Model S",
  "M5",
  "A6",
  "Mustang",
  "Corolla",
  "Civic",
  "Camaro",
  "911",
  "F8",
  "AMG GT",
];

const randomColor = () =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;

export const generateCars = (randomCars: number): GarageFormValues[] => {
  return Array.from({ length: randomCars }, () => ({
    name: `${brands[Math.floor(Math.random() * brands.length)]} ${
      models[Math.floor(Math.random() * models.length)]
    }`,
    color: randomColor(),
  }));
};
