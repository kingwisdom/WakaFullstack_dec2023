import { Navigate, Outlet } from "react-router-dom";
import Footer from "./Footer";

const AppRoute = () => {

    return (
        <>
            <Outlet />
            <Footer />
        </>
    )
}

export default AppRoute