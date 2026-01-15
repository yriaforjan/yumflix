import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLatestRecipes } from "../../services/api";
import Row from "../../components/recipes/Row/Row";

const NewAndPopular = () => {
  const [latestRecipes, setLatestRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchLatest = async () => {
      try {
        setIsLoading(true);
        const data = await getLatestRecipes();

        if (isMounted) {
          setLatestRecipes(data);
        }
      } catch (error) {
        console.error("Error al cargar novedades:", error);
        if (isMounted) {
          navigate("/error");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchLatest();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  return (
    <main className="page-container new-popular-page">
      <div className="page-header">
        <h1>New & Popular</h1>
      </div>

      <div className="rows-container">
        {(isLoading || latestRecipes.length > 0) && (
          <Row title="New on Yumflix" data={isLoading ? null : latestRecipes} />
        )}
        <Row title="Top 10 Global Hits" category="Chicken" />
        <Row title="International Favorites" category="Pasta" />
        <Row title="Hidden Gems: Mediterranean" category="Lamb" />
        <Row title="Perfect for Sharing" category="Side" />
        <Row title="Bingeworthy Appetizers" category="Starter" />
      </div>

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
