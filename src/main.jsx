import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import LoaderProvider from "./context/LoaderContext/LoaderProvider.jsx";
import ModalProvider from "./context/ModalContext/ModalProvider.jsx";
import UserProvider from "./context/UserContext/UserProvider.jsx";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoaderProvider>
      <BrowserRouter>
        <UserProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </UserProvider>
      </BrowserRouter>
    </LoaderProvider>
  </StrictMode>
);
