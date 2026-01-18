import { createContext, useContext } from "react";

export const UserDataContext = createContext();
export const UserActionsContext = createContext();

export const useUserData = () => useContext(UserDataContext);
export const useUserActions = () => useContext(UserActionsContext);

export const useUser = () => {
    const data = useContext(UserDataContext);
    const actions = useContext(UserActionsContext);
    return { ...data, ...actions };
};
