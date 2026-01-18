import { createContext, useContext } from "react";

export const ModalDataContext = createContext();
export const ModalActionsContext = createContext();

export const useModalData = () => useContext(ModalDataContext);
export const useModalActions = () => useContext(ModalActionsContext);

export const useModal = () => {
    const data = useContext(ModalDataContext);
    const actions = useContext(ModalActionsContext);
    return { ...data, ...actions };
};
