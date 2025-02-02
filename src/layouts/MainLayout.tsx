import {Outlet} from "react-router-dom";
import {MenuPage} from "../pages/MenuPage.tsx";

const MainLayout = () => {

    return (
        <div>
            <MenuPage/>
            <Outlet/>
        </div>
    );
};

export {MainLayout};