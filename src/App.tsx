import { useAppStore } from "./store/useAppStore";
import { VIEWS } from "./utils/constants";
import { Garage } from "./feature/Garage";
import { Winners } from "./feature/winners";

const App = () => {
  // Store-დან მოგვაქვს აქტიური გვერდი და მისი შემცვლელი ფუნქცია
  const { activeView, setActiveView } = useAppStore();

  return (
    <div>
      {/* ნავიგაციის ღილაკები */}
      <nav className="space-x-1.5 bg-amber-400 h-[40px] flex">
        <button className="cursor-pointer" onClick={() => setActiveView(VIEWS.GARAGE)}>
          To Garage
        </button>
        <button className="cursor-pointer" onClick={() => setActiveView(VIEWS.WINNERS)}>
          To Winners
        </button>
      </nav>

      {/* პირობითი რენდერი (რომელი გვერდი გამოჩნდეს) */}
      <main>
        {activeView === VIEWS.GARAGE && <Garage />}
        {activeView === VIEWS.WINNERS && <Winners />}
      </main>
    </div>
  );
};

export default App;
