import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getMealsByCategory } from "../../../services/api";
import Card from "../Card/Card";
import CardSkeleton from "../Card/CardSkeleton";
import "./Row.css";

const Row = ({ title, category, data }) => {
  const [categoryRecipes, setCategoryRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(!data);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const rowRef = useRef(null);

  const recipes = useMemo(
    () => data || categoryRecipes,
    [data, categoryRecipes]
  );

  const handleScroll = useCallback(() => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, offsetWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 0);
      const isAtEnd = scrollLeft + offsetWidth >= scrollWidth - 5;
      setShowRightArrow(!isAtEnd);
    }
  }, []);

  useEffect(() => {
    handleScroll();
  }, [recipes, handleScroll, isLoading]);

  const handleScrollClick = useCallback((direction) => {
    if (rowRef.current) {
      const { offsetWidth, scrollLeft } = rowRef.current;
      const scrollAmount = offsetWidth * 0.92;
      const scrollTo =
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    const fetchRecipes = async () => {
      if (category) {
        setIsLoading(true);
        try {
          const res = await getMealsByCategory(category);
          if (isMounted) setCategoryRecipes(res);
        } catch (error) {
          console.error(`Error at row ${category}:`, error.message);
          if (isMounted) {
            navigate("/error");
          }
        } finally {
          if (isMounted) setIsLoading(false);
        }
      }
    };

    fetchRecipes();
    return () => {
      isMounted = false;
    };
  }, [category, data, navigate]);

  if (!isLoading && recipes.length === 0) {
    return null;
  }

  return (
    <section className="row-category">
      <h2 className="row-title">{title}</h2>

      <div className="row-slider">
        {!isLoading && (
          <button
            className={`slider-arrow left ${!showLeftArrow ? "hidden" : ""}`}
            onClick={() => handleScrollClick("left")}
            aria-label="Scroll left"
          >
            <FaChevronLeft />
          </button>
        )}

        <ul className="row-carrousel" ref={rowRef} onScroll={handleScroll}>
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <li key={`skeleton-${i}`} className="row-item-wrapper">
                  <CardSkeleton />
                </li>
              ))
            : recipes.map((recipe) => (
                <li key={recipe.id} className="row-item-wrapper">
                  <Card
                    recipe={recipe}
                    isHovered={hoveredCardId === recipe.id}
                    setHoveredCardId={setHoveredCardId}
                  />
                </li>
              ))}
        </ul>

        {!isLoading && (
          <button
            className={`slider-arrow right ${!showRightArrow ? "hidden" : ""}`}
            onClick={() => handleScrollClick("right")}
            aria-label="Scroll right"
          >
            <FaChevronRight />
          </button>
        )}
      </div>
    </section>
  );
};

export default Row;
