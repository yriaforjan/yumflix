import { useState, useEffect, useCallback } from "react";
import useBodyScrollLock from "../hooks/useBodyScrollLock";

const useMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useBodyScrollLock(isMenuOpen);
  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape" && isMenuOpen) {
        closeMenu();
        const btn = document.getElementById("menu-toggle");
        btn?.focus();
      }
    },
    [isMenuOpen, closeMenu]
  );

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen, handleKeyDown]);
  return { isMenuOpen, toggleMenu, closeMenu };
};

export default useMenu;
