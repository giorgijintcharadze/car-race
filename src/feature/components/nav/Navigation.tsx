import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="flex items-end">
      <nav className="space-x-2.5">
        <NavLink
          className={({ isActive }) => (isActive ? "text-green-300" : "text-black")}
          to="/garage"
        >
          garage
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "text-green-300" : "text-black")}
          to="/winner"
        >
          winner
        </NavLink>
      </nav>
    </div>
  );
};

export default Navigation;
