import { useState, useEffect } from "react";

const useImagePreload = (imageSrc) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
    const setLoaded = () => setIsReady(true);
    img.onload = setLoaded;
    img.onerror = setLoaded;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageSrc]);

  return isReady;
};

export default useImagePreload;
