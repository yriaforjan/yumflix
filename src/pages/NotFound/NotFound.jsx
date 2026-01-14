import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../../context/LoaderContext/LoaderContext";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();
  const { setIsLoading } = useLoader();

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>Lost your way?</h2>
      <p>
        Sorry, we can't find that page. You'll find lots to explore on the home
        page.
      </p>

      <div className="not-found-buttons">
        <button onClick={() => navigate("/")} className="btn-primary">
          Back Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
