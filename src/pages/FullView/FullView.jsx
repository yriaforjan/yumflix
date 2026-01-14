import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMealById } from "../../services/api";
import { FaArrowLeft, FaUtensils, FaClock } from "react-icons/fa";
import { cleanText } from "../../utils/formatters";
import NotFound from "../NotFound/NotFound";
import "./FullView.css";

const FullView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMealById(id);
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleClose = () => {
    navigate(-1);
  };

  if (loading) return null;
  if (!recipe) return <NotFound />;

  const steps = recipe.description
    ? cleanText(recipe.description)
        .split(/\r\n|\n/)
        .map((line) => line.trim())
        .filter((line) => line.length > 5)
    : [];

  return (
    <>
      <button className="back-btn" onClick={handleClose}>
        <FaArrowLeft />
      </button>
      <div className="full-view-container">
        <div
          className="recipe-header"
          style={{ backgroundImage: `url(${recipe.image})` }}
        >
          <div className="recipe-header-gradient" />
          <div className="recipe-header-content">
            <span className="badge category">{recipe.category}</span>
            <h1>{recipe.title}</h1>
            <p className="recipe-origin">{recipe.area} Cuisine</p>
          </div>
        </div>
        <div className="recipe-container">
          <aside className="recipe-sidebar">
            <div className="sidebar-content">
              <h3>
                <FaUtensils /> Ingredients
              </h3>
              <ul className="ingredients-list">
                {recipe.ingredients &&
                  recipe.ingredients.map((ing, i) => {
                    const name = typeof ing === "object" ? ing.name : ing;
                    const measure = typeof ing === "object" ? ing.measure : "";
                    return (
                      <li key={i}>
                        <span className="measure">{measure}</span>
                        <span className="name">{name}</span>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </aside>
          <main className="recipe-content">
            <h3>
              <FaClock /> Instructions
            </h3>
            <ul className="steps-list">
              {/* revisar key!!!!!! */}
              {steps.length > 0 ? (
                steps.map((step, i) => (
                  <li key={i} className="step-item">
                    <span className="step-number">{i + 1}</span>
                    <p>{step}</p>
                  </li>
                ))
              ) : (
                /* !!!!!!!!!!!! */

                <p className="block-text">
                  No detailed instructions available for this recipe.
                </p>
              )}
            </ul>
          </main>
        </div>
      </div>
    </>
  );
};

export default FullView;
