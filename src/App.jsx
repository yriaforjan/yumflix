import { Routes, Route } from "react-router-dom";
import GlobalLoader from "./components/GlobalLoader/GlobalLoader";
import ScrollToTop from "./components/ScrollToTop.jsx/ScrollToTop";
import Main from "./components/layout/Main/Main";
import Home from "./pages/Home/Home";
import AllRecipes from "./pages/AllRecipes/AllRecipes";
import MyList from "./pages/MyList/MyList";
import FullView from "./pages/FullView/FullView";
import NotFound from "./pages/NotFound/NotFound";
import NewAndPopular from "./pages/NewAndPopular/NewAndPopular";
import SearchResult from "./pages/SearchResult/SearchResult";
import Error from "./pages/Error/Error";
import "./App.css";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <GlobalLoader />

      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="recipes" element={<AllRecipes />} />
          <Route path="my-list" element={<MyList />} />
          <Route path="new" element={<NewAndPopular />} />
          <Route path="search" element={<SearchResult />} />
        </Route>
        {/* Rutas SIN Header: */}
        <Route path="/watch/:id" element={<FullView />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
