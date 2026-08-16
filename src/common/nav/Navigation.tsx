import { useAppStore, useInteractionLocked } from "../../store/useAppStore";
import { VIEWS } from "../../utils/constants";

const Navigation = () => {
  const { activeView, setActiveView } = useAppStore();
  const disabled = useInteractionLocked();

  return (
    <nav aria-label="Main navigation" className="main-navigation">
      <button
        type="button"
        className={`nav-tab ${activeView === VIEWS.GARAGE ? "nav-tab--active" : ""}`}
        disabled={disabled || activeView === VIEWS.GARAGE}
        onClick={() => setActiveView(VIEWS.GARAGE)}
      >
        <span className="nav-icon" aria-hidden="true">
          ◆
        </span>
        Garage
      </button>
      <button
        type="button"
        className={`nav-tab ${activeView === VIEWS.WINNERS ? "nav-tab--active" : ""}`}
        disabled={disabled || activeView === VIEWS.WINNERS}
        onClick={() => setActiveView(VIEWS.WINNERS)}
      >
        <span className="nav-icon" aria-hidden="true">
          ♜
        </span>
        Winners
      </button>
    </nav>
  );
};

export default Navigation;
