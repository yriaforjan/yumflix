import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getRecipesByTerm } from "../../services/api";
import Grid from "../../components/recipes/Grid/Grid";

const SearchResult = () => {
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setIsSearching(true);
      try {
        const data = await getRecipesByTerm(query);
        setResults(data || []);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <main className="page-container search-page">
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
              Mexican), or categories.
            </span>
          </>
        }
      />
    </main>
  );
};

export default SearchResult;
