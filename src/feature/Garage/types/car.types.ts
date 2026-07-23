export type Car = {
  id: number;
  name: string;
  color: string;
};

export type GarageResponse = {
  cars: Car[];
  total: number;
};
