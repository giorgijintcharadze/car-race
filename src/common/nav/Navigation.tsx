import { NavLink } from "react-router-dom";
import { useAppStore } from "../../store/useAppStore";
import { VIEWS } from "../../utils/constants";

const Navigation = () => {
  const { setActiveView } = useAppStore();

  return (
    <div className="flex ml-3.5">
      {/* ნავიგაციის ღილაკები */}
      <nav className="space-x-1.5 bg-amber-400 h-[40px] flex">
        <button className="cursor-pointer" onClick={() => setActiveView(VIEWS.GARAGE)}>
          To Garage
        </button>
        <button className="cursor-pointer" onClick={() => setActiveView(VIEWS.WINNERS)}>
          To Winners
        </button>
      </nav>
    </div>
  );
};

export default Navigation;
