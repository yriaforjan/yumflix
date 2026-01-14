import { useState } from "react";
import Card from "../Card/Card";
import CardSkeleton from "../Card/CardSkeleton";
import "./Grid.css";

const Grid = ({ recipes, emptyMessage, isLoading }) => {
  const [hoveredCardId, setHoveredCardId] = useState(null);

  if (isLoading) {
    return (
      <ul className="recipe-grid">
        {Array.from({ length: 36 }).map((_, i) => (
          <li key={`skeleton-${i}`} className="grid-item">
            <CardSkeleton />
          </li>
        ))}
      </ul>
    );
  }

  if (!recipes || recipes.length === 0) {
    return (
      <div className="grid-empty-container">
        <div className="empty-content">
          {emptyMessage || <p>No items found</p>}
        </div>
      </div>
    );
  }

  return (
    <ul className="recipe-grid">
      {recipes.map((recipe) => (
        <li key={recipe.id} className="grid-item">
          <Card
            recipe={recipe}
            isHovered={hoveredCardId === recipe.id}
            setHoveredCardId={setHoveredCardId}
          />
        </li>
      ))}
    </ul>
  );
};

export default Grid;
