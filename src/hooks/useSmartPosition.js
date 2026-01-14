import { useState } from "react";

const useSmartPosition = () => {
  const [coords, setCoords] = useState({ left: 0, top: 0 });
  const [origin, setOrigin] = useState("center center");

  const calculatePosition = (element) => {
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const windowWidth = window.innerWidth;

    // USAMOS LAS MEDIDAS REALES DEL CSS
    const modalWidth = 450;
    const margin = windowWidth * 0.03;

    // 1. Calculamos el centro horizontal de la carta de 250px
    const cardCenterX = rect.left + rect.width / 2;

    // 2. Intentamos centrar la modal de 450px sobre ese centro
    let left = cardCenterX - modalWidth / 2;

    // 3. LIMITE IZQUIERDO: Si la modal toca el 3% de la izquierda
    let xOrigin = "center";
    if (left < margin) {
      left = margin;
      xOrigin = "left";
    }

    // 4. LIMITE DERECHO: Si la modal toca el 3% de la derecha
    // (Ancho pantalla - margen - 450 de modal)
    const rightLimit = windowWidth - margin - modalWidth;
    if (left > rightLimit) {
      left = rightLimit;
      xOrigin = "right";
    }

    // 5. Calculamos el TOP (posicionamiento absoluto para el Portal)
    // El -100 es para que la modal "abrace" a la carta original hacia arriba
    const isFirstRow = rect.top < 250;

    let top;
    let yOrigin;

    if (isFirstRow) {
      // Crece hacia ABAJO: el top de la modal coincide con el de la carta
      top = rect.top + window.scrollY;
      yOrigin = "top";
    } else {
      // Comportamiento normal: Crece hacia ARRIBA (abrazando la carta)
      top = rect.top + window.scrollY - 100;
      yOrigin = "center";
    }

    setCoords({ left, top });
    setOrigin(`${xOrigin} ${yOrigin}`);
  };

  return { coords, origin, calculatePosition };
};

export default useSmartPosition;
