import type { GarageFormValues } from "../feature/Garage/schema/garage.schema";

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

const MAX_RGB_COLOR = 0xffffff;
const HEX_RADIX = 16;
const HEX_COLOR_LENGTH = 6;

const randomColor = () =>
  `#${Math.floor(Math.random() * MAX_RGB_COLOR)
    .toString(HEX_RADIX)
    .padStart(HEX_COLOR_LENGTH, "0")}`;

export const generateCars = (randomCars: number): GarageFormValues[] => {
  return Array.from({ length: randomCars }, () => ({
    name: `${brands[Math.floor(Math.random() * brands.length)]} ${
      models[Math.floor(Math.random() * models.length)]
    }`,
    color: randomColor(),
  }));
};
