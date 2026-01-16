import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAllAreas, getMealsByArea } from "../../services/api";
import Row from "../../components/recipes/Row/Row";
import Grid from "../../components/recipes/Grid/Grid";
import { FaCaretDown } from "react-icons/fa";
import "./BrowseByRegion.css";

const BrowseByRegion = () => {
  const [areas, setAreas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [meals, setMeals] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Obtenemos el estado de la URL (Persistencia automática al volver atrás)
  const selectedArea = searchParams.get("region") || "";
  const sort = searchParams.get("sort") || "suggestions";

  // 1. Fetch de todas las áreas (Se cargan una vez y se mantienen)
  useEffect(() => {
    let isMounted = true;
    const fetchAreas = async () => {
      try {
        setIsLoading(true);
        const data = await getAllAreas();
        if (isMounted) setAreas(data);
      } catch (error) {
        console.error("Error al cargar áreas:", error);
        if (isMounted) navigate("/error");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchAreas();
    return () => (isMounted = false);
  }, [navigate]);

  // 2. Fetch de platos por región
  useEffect(() => {
    if (!selectedArea) {
      setMeals([]);
      return;
    }
    let isMounted = true;
    const fetchMeals = async () => {
      try {
        setIsLoading(true);
        const data = await getMealsByArea(selectedArea);
        if (isMounted) setMeals(data);
      } catch (error) {
        console.error("Error al cargar platos:", error);
        if (isMounted) navigate("/error");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchMeals();
    return () => (isMounted = false);
  }, [selectedArea, navigate]);

  const handleAreaChange = (e) => {
    const value = e.target.value;
    if (value) {
      setSearchParams({ region: value, sort });
    } else {
      setSearchParams({});
    }
  };

  const handleSortChange = (e) => {
    setSearchParams({ region: selectedArea, sort: e.target.value });
  };

  const getSortedMeals = () => {
    const sorted = [...meals];
    if (sort === "az")
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "za")
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    return sorted.sort((a, b) => (b.match || 0) - (a.match || 0));
  };

  return (
    <main className="page-container browse-region-page">
      <div className="page-header">
        <h1>Browse by Region</h1>
        <div className="filter-group">
          <label htmlFor="area-select">Select Your Preferences</label>
          <div className="select-wrapper">
            <select
              id="area-select"
              value={selectedArea}
              onChange={handleAreaChange}
            >
              <option value="">All Regions</option>
              {areas.map((area) => (
                <option key={area.strArea} value={area.strArea}>
                  {area.strArea}
                </option>
              ))}
            </select>
            <FaCaretDown className="select-icon" />
          </div>

          <div className={`sort-wrapper ${selectedArea ? "visible" : ""}`}>
            <label htmlFor="sort-select">Sort by</label>
            <div className="select-wrapper">
              <select id="sort-select" value={sort} onChange={handleSortChange}>
                <option value="suggestions">Suggestions for you</option>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
              </select>
              <FaCaretDown className="select-icon" />
            </div>
          </div>
        </div>
      </div>

      <section className="content-area">
        {!selectedArea ? (
          <div className="rows-container">
            {areas.map((area) => (
              <Row
                key={area.strArea}
                title={`${area.strArea} Kitchen`}
                area={area.strArea}
              />
            ))}
          </div>
        ) : (
          <Grid
            recipes={getSortedMeals()}
            isLoading={isLoading}
            emptyMessage={
              <div className="search-empty">
                <p>No results found for "{selectedArea}"</p>
                <span>Try selecting another area.</span>
              </div>
            }
          />
        )}
      </section>
    </main>
  );
};

export default BrowseByRegion;
