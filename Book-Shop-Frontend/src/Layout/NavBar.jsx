import { useAuth } from "../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";
import { routePaths } from "../Router/Router";

const NavBar = () => {
  const { logout } = useAuth();

  const menuClickHandler = (e) => {
    const { testid } = e.target.dataset;
    if (testid === "logout") {
      logout();
    }
  };

  return (
    <nav>
      <div className="brand">
        <Link to={routePaths.HOME}>Bookstore</Link>
      </div>
      <ul className="menu" onClick={menuClickHandler}>
        <li data-testid="logout">Logout</li>
      </ul>
    </nav>
  );
};

export default NavBar;
