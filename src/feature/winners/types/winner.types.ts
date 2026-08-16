export type Winner = {
  id: number;
  wins: number;
  time: number;
};

export type WinnersResponse = {
  winners: Winner[];
  total: number;
};

export type WinnerTableRow = {
  id: number;
  name: string;
  color: string;
  wins: number;
  time: number;
};

export type WinnerSort = "id" | "wins" | "time";

export type SortOrder = "ASC" | "DESC";
