import { useState, useEffect } from "react";
import { getLatestRecipes } from "../../services/api";
import Row from "../../components/recipes/Row/Row";

const NewAndPopular = () => {
  const [latestRecipes, setLatestRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        setIsLoading(true);
        const data = await getLatestRecipes();
        setLatestRecipes(data);
      } catch (error) {
        console.error("Error al cargar novedades:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatest();
  }, []);

  return (
    <main className="page-container new-popular-page">
      <div className="page-header">
        <h1>New & Popular</h1>
      </div>

      {isLoading ? (
        <div className="page-message">
          <p>Fetching the latest culinary trends...</p>
        </div>
      ) : (
        <div className="rows-container">
          <Row title="New on Yumflix" data={latestRecipes} />

          <Row title="Top 10 Global Hits" category="Chicken" />
          <Row title="International Favorites" category="Pasta" />
          <Row title="Hidden Gems: Mediterranean" category="Lamb" />
          <Row title="Perfect for Sharing" category="Side" />
          <Row title="Bingeworthy Appetizers" category="Starter" />
        </div>
      )}

      {!isLoading && latestRecipes.length === 0 && (
        <div className="page-message">
          <p>No new recipes found at the moment.</p>
          <span>Check back later for fresh inspiration!</span>
        </div>
      )}
    </main>
  );
};

export default NewAndPopular;
