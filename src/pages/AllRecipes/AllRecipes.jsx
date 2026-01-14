import { useState, useEffect } from "react";
import { getAllRecipes } from "../../services/api";
import Grid from "../../components/recipes/Grid/Grid";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFullCatalog = async () => {
      setIsLoading(true);
      const data = await getAllRecipes();
      setRecipes(data);
      setIsLoading(false);
    };

    fetchFullCatalog();
  }, []);

  return (
    <main className="page-container recipes-page">
      <h1>All Recipes from A to Z</h1>

      <Grid
        recipes={recipes}
        isLoading={isLoading}
        emptyMessage={
          <>
            <p>We couldn't load the library</p>
            <span>Please try refreshing the page or check back later.</span>
          </>
        }
      />
    </main>
  );
};

export default AllRecipes;
