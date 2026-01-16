import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "./ModalContext";

const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);
  const navigate = useNavigate();

  const openModal = useCallback((recipeData) => {
    setContent(recipeData);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setContent(null);
  }, []);

  const openFullView = useCallback(
    (recipeData) => {
      setIsOpen(false);
      setContent(null);
      navigate(`/watch/${recipeData.id}`);
    },
    [navigate]
  );

  const value = useMemo(
    () => ({
      isOpen,
      content,
      openModal,
      openFullView,
      closeModal,
    }),
    [isOpen, content, openModal, openFullView, closeModal]
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
