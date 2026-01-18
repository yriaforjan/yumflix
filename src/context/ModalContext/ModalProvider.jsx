import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ModalDataContext, ModalActionsContext } from "./ModalContext";

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

  const data = useMemo(
    () => ({
      isOpen,
      content,
    }),
    [isOpen, content]
  );

  const actions = useMemo(
    () => ({
      openModal,
      openFullView,
      closeModal,
    }),
    [openModal, openFullView, closeModal]
  );

  return (
    <ModalActionsContext.Provider value={actions}>
      <ModalDataContext.Provider value={data}>
        {children}
      </ModalDataContext.Provider>
    </ModalActionsContext.Provider>
  );
};

export default ModalProvider;
