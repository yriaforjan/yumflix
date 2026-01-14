import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Modal from "../../recipes/Modal/Modal";
import "./Main.css";

const Main = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <Modal />
    </>
  );
};

export default Main;
