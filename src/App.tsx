import { useAppStore } from "./store/useAppStore";
import { VIEWS } from "./utils/constants";
import { Garage } from "./feature/Garage";
import { Winners } from "./feature/winners";
import Navigation from "./common/nav/Navigation";

const App = () => {
  const { activeView } = useAppStore();

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand-mark" aria-label="Async Race control center">
          <span className="brand-signal" aria-hidden="true">
            ◉ ))
          </span>
          <span>Async Race</span>
        </div>
        <Navigation />
        <div className="system-status" aria-label="System online">
          <span aria-hidden="true" /> Online
        </div>
      </header>
      <main className="app-content">
        {activeView === VIEWS.GARAGE && <Garage />}
        {activeView === VIEWS.WINNERS && <Winners />}
      </main>
      <footer className="app-footer" aria-hidden="true">
        <span>RACE CONTROL // 2026</span>
        <span>ENGINE NETWORK STABLE</span>
      </footer>
    </div>
  );
};

export default App;
