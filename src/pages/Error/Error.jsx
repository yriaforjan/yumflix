import { useEffect } from "react";
import { useLoader } from "../../context/LoaderContext/LoaderContext";
import useImagePreload from "../../hooks/useImagePreload";
import "./Error.css";

const Error = () => {
  const { setIsLoading } = useLoader();
  const isReady = useImagePreload("/not_found.webp");

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  const handleReload = () => {
    window.location.href = "/";
  };

  return (
    <div className={`error-container ${isReady ? "visible" : ""}`}>
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
