import { useAppStore } from "./store/useAppStore";
import { VIEWS } from "./utils/constants";
import { Garage } from "./feature/Garage";
import { Winners } from "./feature/winners";
import Navigation from "./common/nav/Navigation";

const App = () => {
  const { activeView } = useAppStore();

  return (
    <div>
      <Navigation />

      <main>
        {activeView === VIEWS.GARAGE && <Garage />}
        {activeView === VIEWS.WINNERS && <Winners />}
      </main>
    </div>
  );
};

export default App;
