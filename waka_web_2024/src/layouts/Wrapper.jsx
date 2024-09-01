import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../component/Footer";

export default function Wrapper() {
  
    return (
      <>
        {/* <Navbar /> */}
        <Outlet />
        <Footer />
      </>
    );
  }