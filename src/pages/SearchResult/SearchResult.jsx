import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getRecipesByTerm } from "../../services/api";
import Grid from "../../components/recipes/Grid/Grid";

const SearchResult = () => {
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q");

  useEffect(() => {
    if (!query) return;

    let isMounted = true;

    const fetchResults = async () => {
      setIsSearching(true);
      try {
        const data = await getRecipesByTerm(query);
        if (isMounted) {
          setResults(data || []);
        }
      } catch (error) {
        console.error("Search error:", error);
        if (isMounted) {
          navigate("/error");
        }
      } finally {
        if (isMounted) {
          setIsSearching(false);
        }
      }
    };

    fetchResults();

    return () => {
      isMounted = false;
    };
  }, [query, navigate]);

  return (
    <main className="page-container page-padding search-page">
      <div className="page-header">
        <h1>
          Results for: <span>{query}</span>
        </h1>
      </div>

      <Grid
        recipes={results}
        isLoading={isSearching}
        emptyMessage={
          <>
            <p>No results found for "{query}"</p>
            <span>
              Try searching for ingredients (chicken, beef), areas (Italian,
              Mexican) or categories.
            </span>
          </>
        }
      />
    </main>
  );
};

export default SearchResult;
