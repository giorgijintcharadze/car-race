import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useAppStore } from "../../../../store/useAppStore";
import GenerateRandomCars from "./GenerateRandomCars";

const mutationMocks = vi.hoisted(() => ({
  generate: vi.fn(),
  reset: vi.fn(),
}));

vi.mock("../../hooks/useMutationGarage", () => ({
  useMutationGarage: () => ({
    generateMutation: {
      mutate: mutationMocks.generate,
      isPending: false,
      isError: false,
      data: undefined,
    },
    resetMutation: {
      mutate: mutationMocks.reset,
      isPending: false,
      isError: false,
      data: undefined,
    },
  }),
}));

describe("GenerateRandomCars", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAppStore.setState(useAppStore.getInitialState(), true);
  });

  it("clears the selected car and returns to page one after deleting all cars", async () => {
    const user = userEvent.setup();
    act(() => {
      useAppStore.getState().selectCar(7, "Selected", "#112233");
      useAppStore.getState().setGaragePage(3);
    });
    render(<GenerateRandomCars disabled={false} />);

    await user.click(screen.getByRole("button", { name: "Delete All Cars" }));
    const options = mutationMocks.reset.mock.calls[0]?.[1] as { onSuccess: () => void };
    act(() => options.onSuccess());

    expect(useAppStore.getState().selectedCarId).toBeNull();
    expect(useAppStore.getState().garagePage).toBe(1);
  });
});
