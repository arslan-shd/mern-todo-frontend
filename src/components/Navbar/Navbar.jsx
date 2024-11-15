import { useState } from "react";
import { Link } from "react-router-dom";
import todoLogo from "../../assets/todo-logo.svg";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import mobileMenu from "../../assets/mobile-menu.svg";
import closeIcon from "../../assets/close-icon.svg";
import "./navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const logout = useLogout();
  const { user } = useAuthContext();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = () => {
    logout();
  };

  return (
    <header className="nav-container">
      <div>
        <Link className="nav-logo-box" to="/">
          <img className="nav-logo" src={todoLogo} alt="logo" />
          <h1>Tickit</h1>
        </Link>
      </div>
      <nav>
        <button
          onClick={toggleMenu}
          className="hidden-on-desktop mobile-menu-icon-btn"
        >
          <img className="mobile-menu-icon" src={mobileMenu} alt="" />
        </button>
        <ul
          className={`hidden-on-desktop nav-links menu ${
            isOpen ? "menu-open" : ""
          }`}
        >
          {isOpen && (
            <div
              style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}
            >
              <div>
                <Link className="nav-logo-box " to="/">
                  <img className="nav-logo" src={todoLogo} alt="logo" />
                  <h1>Tickit</h1>
                </Link>
              </div>
              <img
                onClick={toggleMenu}
                className="mobile-close-icon"
                src={closeIcon}
                alt=""
              />
            </div>
          )}

          {user && (
            <li>
              <span className="user-email">{user?.data?.email}</span>
            </li>
          )}
          <li>
            <Link to="/login" className="nav-link">
              Log In
            </Link>
          </li>
          <li>
            <Link to="/signup" className="nav-link">
              Sign Up
            </Link>
          </li>
          {user && (
            <li>
              <button onClick={handleClick} className="nav-link logout-btn">
                Log out
              </button>
            </li>
          )}
        </ul>
        {isOpen && <div className="overlay" onClick={toggleMenu}></div>}
        <ul className="hidden-on-mobile nav-links show">
          {user && (
            <li onClick={handleClick}>
              <span className="user-email">{user.data.email}</span>
              <button className="nav-link logout-btn"> Log out</button>
            </li>
          )}
          {!user && (
            <>
              <li>
                <Link to="/signup" className="nav-link">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/login" className="nav-link">
                  Log In
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
