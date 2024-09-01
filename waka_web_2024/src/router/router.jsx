import { createBrowserRouter } from "react-router-dom";
import Wrapper from "../layouts/Wrapper";
import Home from "../pages/Home";

const routers = createBrowserRouter([
    {
      element: <Wrapper />,
      children: [
        { path: "/", element: <Home /> }
      ]
    }
  ]); 

  export default routers