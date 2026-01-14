import { FaSearch, FaTimes } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./SearchBar.css";

const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);

  const [isManualFocused, setIsManualFocused] = useState(false);
  const [returnPath, setReturnPath] = useState("/");

  const query = new URLSearchParams(location.search).get("q") || "";

  const isOpen = query.length > 0 || isManualFocused;
  const hasText = query.length > 0;

  useEffect(() => {
    if (inputRef.current && inputRef.current.value !== query) {
      inputRef.current.value = query;
    }
  }, [query]);

  const handleInputChange = (ev) => {
    const value = ev.target.value;

    if (value.length > 0 && !location.pathname.includes("/search")) {
      setReturnPath(location.pathname);
    }

    if (value.length > 0) {
      navigate(`/search?q=${encodeURIComponent(value)}`, { replace: true });
    } else if (value.length === 0) {
      setIsManualFocused(false);
      navigate(returnPath, { replace: true });
    }
  };

  const handleSearchClick = () => {
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
  };

  const handleClearClick = () => {
    setIsManualFocused(false);
    if (inputRef.current) inputRef.current.value = "";
    navigate(returnPath, { replace: true });
  };

  return (
    <div
      className={`search-box ${isOpen ? "open" : ""} ${
        hasText ? "has-text" : ""
      }`}
    >
      <button
        className="search-btn"
        onClick={handleSearchClick}
        type="button"
        onMouseDown={(e) => e.preventDefault()}
      >
        <FaSearch />
      </button>

      <input
        ref={inputRef}
        type="text"
        className="search-input"
        placeholder="Recipes, areas, ingredients"
        defaultValue={query}
        onChange={handleInputChange}
        onFocus={() => setIsManualFocused(true)}
        onBlur={() => {
          setTimeout(() => setIsManualFocused(false), 200);
        }}
      />

      {hasText && (
        <button
          className="clear-btn"
          onClick={handleClearClick}
          type="button"
          onMouseDown={(e) => e.preventDefault()}
        >
          <FaTimes />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
