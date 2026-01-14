import { useState, useEffect, useCallback, useMemo } from "react";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {
  // Inicializamos los estados leyendo de localStorage
  const [myList, setMyList] = useState(() => {
    const saved = localStorage.getItem("yumflix_list");
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("yumflix_favs");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("yumflix_list", JSON.stringify(myList));
  }, [myList]);

  useEffect(() => {
    localStorage.setItem("yumflix_favs", JSON.stringify(favorites));
  }, [favorites]);

  // añadir o quitar de la lista
  const toggleMyList = useCallback((recipe) => {
    setMyList((prev) => {
      const exists = prev.find((item) => item.id === recipe.id);
      if (exists) {
        return prev.filter((item) => item.id !== recipe.id);
      }
      return [...prev, recipe];
    });
  }, []);

  // dar/quitar like
  const toggleLike = useCallback((recipeId) => {
    setFavorites((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId]
    );
  }, []);

  const value = useMemo(
    () => ({
      myList,
      favorites,
      toggleMyList,
      toggleLike,
    }),
    [myList, favorites, toggleMyList, toggleLike]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
