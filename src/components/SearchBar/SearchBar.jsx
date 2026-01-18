import { FaSearch, FaTimes } from "react-icons/fa";
import { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./SearchBar.css";

const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);

  const [isManualFocused, setIsManualFocused] = useState(false);
  const [returnPath, setReturnPath] = useState("/");

  const query = new URLSearchParams(location.search).get("q") || "";
  const [searchTerm, setSearchTerm] = useState(query);

  const isOpen = query.length > 0 || isManualFocused;
  const hasText = searchTerm.length > 0;

  useEffect(() => {
    setSearchTerm(query);
  }, [query]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== query) {
        if (searchTerm.length > 0) {
          navigate(`/search?q=${encodeURIComponent(searchTerm)}`, {
            replace: true,
          });
        } else if (searchTerm.length === 0 && query.length > 0) {
          setIsManualFocused(false);
          navigate(returnPath, { replace: true });
        }
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm, query, navigate, returnPath]);

  const handleInputChange = (ev) => {
    const value = ev.target.value;
    if (value.length > 0 && !location.pathname.includes("/search")) {
      setReturnPath(location.pathname);
    }
    setSearchTerm(value);
  };

  const handleSearchClick = useCallback(() => {
    if (!isOpen) {
      if (!location.pathname.includes("/search")) {
        setReturnPath(location.pathname);
      }
      inputRef.current?.focus();
      setIsManualFocused(true);
    } else if (!hasText) {
      setIsManualFocused(false);
      navigate(returnPath, { replace: true });
    }
  }, [isOpen, hasText, location.pathname, navigate, returnPath]);

  const handleClearClick = useCallback(() => {
    setIsManualFocused(false);
    setSearchTerm("");
    navigate(returnPath, { replace: true });
  }, [navigate, returnPath]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        handleClearClick();
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClearClick]);

  return (
    <div
      className={`search-box ${isOpen ? "open" : ""} ${hasText ? "has-text" : ""}`}
      role="search"
    >
      <button
        className="search-btn"
        onClick={handleSearchClick}
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        aria-label="Search"
        aria-expanded={isOpen}
      >
        <FaSearch />
      </button>

      <input
        ref={inputRef}
        type="text"
        className="search-input"
        placeholder="Recipes, areas, ingredients"
        aria-label="Search recipes, areas, ingredients"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setIsManualFocused(true)}
        onBlur={() => setTimeout(() => setIsManualFocused(false), 200)}
      />

      {hasText && (
        <button
          className="clear-btn"
          onClick={handleClearClick}
          type="button"
          aria-label="Clear search"
        >
          <FaTimes />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
