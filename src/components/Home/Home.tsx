import React from "react";
import { useSelector } from "react-redux";
import {RootState} from "../../types";



const Home = () => {
   // const { user } = useSelector((state: RootState) => state.user);
    const userState = useSelector((state: RootState) => state.user) || { user: null, accessToken: null };
    const { user, accessToken } = userState;
    return (
        <div>
            <h1>Вітаємо!</h1>
            {!user && <p>Щоб отримати доступ до контенту, увійдіть в систему.</p>}
        </div>
    );
};

export default Home;