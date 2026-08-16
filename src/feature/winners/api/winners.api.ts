import { API } from "../../../common/api/endpoints";
import { HTTP_STATUS, WINNERS_LIMIT_PAGE, WINNER_TIME_DECIMALS } from "../../../utils/constants";
import type { Winner, WinnersResponse, WinnerSort, SortOrder } from "../types/winner.types";

export const getWinners = async (
  page = 1,
  sort: WinnerSort = "time",
  order: SortOrder = "ASC",
  limit = WINNERS_LIMIT_PAGE,
): Promise<WinnersResponse> => {
  const res = await fetch(
    `${API.BASE_URL}${API.WINNERS}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch winners");
  }

  const total = Number(res.headers.get("X-Total-Count") ?? 0);
  const winners: Winner[] = await res.json();

  return {
    winners,
    total,
  };
};

export const getWinner = async (id: number): Promise<Winner | null> => {
  const res = await fetch(`${API.BASE_URL}${API.WINNERS}/${id}`);

  if (res.status === HTTP_STATUS.NOT_FOUND) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Failed to fetch winner");
  }

  return res.json();
};

export const createWinner = async (winner: Winner): Promise<Winner> => {
  const res = await fetch(`${API.BASE_URL}${API.WINNERS}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(winner),
  });

  if (!res.ok) {
    throw new Error("Failed to create winner");
  }

  return res.json();
};

export const updateWinner = async (id: number, winner: Omit<Winner, "id">): Promise<Winner> => {
  const res = await fetch(`${API.BASE_URL}${API.WINNERS}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(winner),
  });

  if (!res.ok) {
    throw new Error("Failed to update winner");
  }

  return res.json();
};

export const deleteWinner = async (id: number): Promise<void> => {
  const res = await fetch(`${API.BASE_URL}${API.WINNERS}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok && res.status !== HTTP_STATUS.NOT_FOUND) {
    throw new Error("Failed to delete winner");
  }
};

export const saveWinnerResult = async (carId: number, timeSeconds: number): Promise<void> => {
  const existingWinner = await getWinner(carId);

  const formattedTime = Number(timeSeconds.toFixed(WINNER_TIME_DECIMALS));

  if (!existingWinner) {
    await createWinner({
      id: carId,
      wins: 1,
      time: formattedTime,
    });

    return;
  }

  await updateWinner(carId, {
    wins: existingWinner.wins + 1,
    time: Math.min(existingWinner.time, formattedTime),
  });
};
