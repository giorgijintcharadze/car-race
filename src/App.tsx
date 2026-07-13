import { Route, Routes } from "react-router-dom";
import GaragePage from "./feature/pages/GaragePage";
import WinnersPage from "./feature/pages/WinnersPage";
import Navigation from "./feature/components/nav/Navigation";

const App = () => {
  return (
    <div>
      <div className="bg-blue-800 w-full">
        <Navigation />
      </div>

      <Routes>
        <Route path="/garage" element={<GaragePage />} />
        <Route path="/winner" element={<WinnersPage />} />
      </Routes>
    </div>
  );
};

export default App;
