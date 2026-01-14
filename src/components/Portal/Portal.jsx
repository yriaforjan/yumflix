import ReactDOM from "react-dom";

const Portal = ({ children }) => {
  // renderiza los hijos (el modal) directamente en el body del navegador
  return ReactDOM.createPortal(children, document.body);
};

export default Portal;
