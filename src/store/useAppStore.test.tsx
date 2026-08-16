import { act, render, renderHook, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import Navigation from "../common/nav/Navigation";
import { useAppStore, useInteractionLocked } from "./useAppStore";

describe("application state", () => {
  beforeEach(() => useAppStore.setState(useAppStore.getInitialState(), true));

  it("preserves the Garage page while views change", () => {
    act(() => {
      useAppStore.getState().setGaragePage(3);
      useAppStore.getState().setActiveView("WINNERS");
      useAppStore.getState().setActiveView("GARAGE");
    });
    expect(useAppStore.getState().garagePage).toBe(3);
  });

  it("locks interactions for manual movement and completed races", () => {
    const { result } = renderHook(useInteractionLocked);
    expect(result.current).toBe(false);

    act(() => useAppStore.getState().setMovingCar(4, true));
    expect(result.current).toBe(true);

    act(() => {
      useAppStore.getState().setMovingCar(4, false);
      useAppStore.getState().setRaceStatus("finished");
    });
    expect(result.current).toBe(true);
  });

  it("disables navigation while interactions are locked", () => {
    render(<Navigation />);
    act(() => useAppStore.getState().setMovingCar(2, true));
    expect(screen.getByRole("button", { name: "Garage" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Winners" })).toBeDisabled();
  });
});
