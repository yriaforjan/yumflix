import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../../assets/logo.png";
import SearchBar from "../../SearchBar/SearchBar";
import ThemeToggle from "../../ThemeToggle/ThemeToggle";
import { FaBars, FaTimes } from "react-icons/fa";
import useMenu from "../../../hooks/useMenu";
import "./Header.css";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isMenuOpen, toggleMenu, closeMenu } = useMenu();

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
          <Link to="/" onClick={closeMenu}>
            <img src={logo} alt="Yumflix logo" />
          </Link>
          <button
            id="menu-toggle"
            className="header-burger"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <FaBars />
          </button>
        </div>

        <div className={`header-menu-container ${isMenuOpen ? "open" : ""}`}>
          <div className="mobile-menu-header">
            <img src={logo} alt="Yumflix logo" className="mobile-menu-logo" />
            <button
              className="mobile-close-btn"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <FaTimes />
            </button>
          </div>

          <ul className="header-menu">
            <li>
              <NavLink
                to="/"
                onClick={closeMenu}
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
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Recipes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/latest"
                onClick={closeMenu}
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
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                My list
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/browse-region"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Browse by Region
              </NavLink>
            </li>
          </ul>
        </div>

        <div
          className={`mobile-menu-overlay ${isMenuOpen ? "open" : ""}`}
          onClick={closeMenu}
          aria-hidden="true"
        />
      </nav>

      <div className="header-controls">
        <SearchBar />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
