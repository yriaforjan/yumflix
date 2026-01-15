import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../../context/LoaderContext/LoaderContext";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();
  const { setIsLoading } = useLoader();

  const [imgReady, setImgReady] = useState(false);

  useEffect(() => {
    setIsLoading(false);

    const img = new Image();
    img.src = "/src/assets/not_found.webp";
    img.onload = () => {
      setImgReady(true);
    };
  }, [setIsLoading]);

  return (
    <div className={`not-found-container ${imgReady ? "visible" : ""}`}>
      <h1>404</h1>
      <h2>Lost your way?</h2>
      <p>
        Sorry, we can't find that page. You'll find lots to explore on the home
        page.
      </p>
      <button onClick={() => navigate("/")} className="btn-primary">
        Back Home
      </button>
    </div>
  );
};

export default NotFound;
