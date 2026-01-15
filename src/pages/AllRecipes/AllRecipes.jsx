import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllRecipes } from "../../services/api";
import Grid from "../../components/recipes/Grid/Grid";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchFullCatalog = async () => {
      setIsLoading(true);
      try {
        const data = await getAllRecipes();

        if (isMounted) {
          if (!data || data.length === 0) {
            navigate("/error");
            return;
          }
          setRecipes(data);
        }
      } catch (error) {
        console.error("Error loading all recipes:", error);
        if (isMounted) {
          navigate("/error");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchFullCatalog();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  return (
    <main className="page-container recipes-page">
      <h1>All Recipes from A to Z</h1>

      <Grid recipes={recipes} isLoading={isLoading} />
    </main>
  );
};

export default AllRecipes;
