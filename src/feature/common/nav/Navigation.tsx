import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="flex ml-3.5">
      <nav className="space-x-2.5 ">
        <NavLink
          className={({ isActive }) => (isActive ? "text-green-300" : "text-black")}
          to="/garage"
        >
          garage
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "text-green-300" : "text-black")}
          to="/winners"
        >
          winner
        </NavLink>
      </nav>
    </div>
  );
};

export default Navigation;
