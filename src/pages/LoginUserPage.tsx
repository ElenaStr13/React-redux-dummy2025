import {useSelector} from "react-redux";
import {RootState} from "../types";
import {Navigate, Outlet} from "react-router-dom";

const LoginUserPage = () => {
    const { accessToken } = useSelector((state: RootState) => state.user);
    console.log(accessToken)

    return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export {LoginUserPage};