import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../../assets/logo.png";
import SearchBar from "../../SearchBar/SearchBar";
import ThemeToggle from "../../ThemeToggle/ThemeToggle";
import "./Header.css";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <nav className="header-nav">
        <div className="header-logo">
          <Link to="/">
            <img src={logo} alt="Yumflix logo" />
          </Link>
        </div>
        <ul className="header-menu">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/recipes"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Recipes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/new"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              New & Popular
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-list"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              My list
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/countries"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Browse by Region
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="header-controls">
        <SearchBar />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
