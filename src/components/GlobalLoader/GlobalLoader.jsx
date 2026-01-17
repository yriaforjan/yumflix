import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLoader } from "../../context/LoaderContext/LoaderContext";
import loaderLogo from "../../assets/loader.webp";
import useBodyScrollLock from "../../hooks/useBodyScrollLock";
import "./GlobalLoader.css";

const GlobalLoader = () => {
  const { isLoading, setIsLoading } = useLoader();
  const { pathname } = useLocation();

  useBodyScrollLock(isLoading);

  useEffect(() => {
    if (pathname !== "/") {
      setIsLoading(false);
    }
  }, [pathname, setIsLoading]);

  if (!isLoading || pathname !== "/") return null;

  return (
    <div className="loader-overlay visible">
      <img src={loaderLogo} alt="Yumflix loader" className="loader-logo" />
    </div>
  );
};

export default GlobalLoader;
