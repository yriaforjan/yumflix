import { useEffect, useState } from "react";
import { useLoader } from "../../context/LoaderContext/LoaderContext";
import "./Error.css";

const Error = () => {
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

  const handleReload = () => {
    window.location.href = "/";
  };

  return (
    <div className={`error-container ${imgReady ? "visible" : ""}`}>
      <h1>Oops!</h1>
      <h2>Unexpected Error</h2>
      <p className="error-message">
        There was a problem loading this content. Please try again.
      </p>
      <button className="btn-primary" onClick={handleReload}>
        Try Again
      </button>
    </div>
  );
};

export default Error;
