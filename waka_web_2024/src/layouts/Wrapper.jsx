import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../component/Footer";
import { Toaster } from "react-hot-toast";

export default function Wrapper() {

  return (
    <>
      {/* <Navbar /> */}
      <Outlet />
      <Footer />
      <Toaster />
    </>
  );
}