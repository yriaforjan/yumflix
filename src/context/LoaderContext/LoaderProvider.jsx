import { useState, useCallback, useMemo } from "react";
import { LoaderContext } from "./LoaderContext";

const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const appLoaded = useCallback(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }, []);

  const value = useMemo(
    () => ({
      isLoading,
      setIsLoading,
      appLoaded,
    }),
    [isLoading, appLoaded]
  );

  return (
    <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>
  );
};

export default LoaderProvider;
