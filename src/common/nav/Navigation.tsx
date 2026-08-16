import { useAppStore, useInteractionLocked } from "../../store/useAppStore";
import { VIEWS } from "../../utils/constants";

const Navigation = () => {
  const { activeView, setActiveView } = useAppStore();
  const disabled = useInteractionLocked();

  return (
    <nav aria-label="Main navigation" className="flex gap-2 p-3">
      <button
        type="button"
        disabled={disabled || activeView === VIEWS.GARAGE}
        onClick={() => setActiveView(VIEWS.GARAGE)}
      >
        Garage
      </button>
      <button
        type="button"
        disabled={disabled || activeView === VIEWS.WINNERS}
        onClick={() => setActiveView(VIEWS.WINNERS)}
      >
        Winners
      </button>
    </nav>
  );
};

export default Navigation;
