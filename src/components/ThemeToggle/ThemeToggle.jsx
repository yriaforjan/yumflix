import { useEffect, useState } from "react";
import { FaLightbulb, FaRegLightbulb } from "react-icons/fa";
import "./ThemeToggle.css";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") !== "light";
  });
  const [isHovered, setIsHovered] = useState(false);

  const handleThemeClick = () => {
    setIsDark(!isDark);
  };

  const showSolidIcon = (!isDark && !isHovered) || (isDark && isHovered);

  useEffect(() => {
    document.body.classList.toggle("light", !isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <button
      className="theme-btn"
      onClick={handleThemeClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {showSolidIcon ? <FaLightbulb /> : <FaRegLightbulb />}
    </button>
  );
};

export default ThemeToggle;
