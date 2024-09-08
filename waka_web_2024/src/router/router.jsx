import { createBrowserRouter } from "react-router-dom";
import Wrapper from "../layouts/Wrapper";
import Home from "../pages/Home";
import Places from "../pages/Places";
import About from "../pages/About";

const routers = createBrowserRouter([
  {
    element: <Wrapper />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/places", element: <Places /> },
      { path: "/about", element: <About /> },
    ],
  },
]);

export default routers;
