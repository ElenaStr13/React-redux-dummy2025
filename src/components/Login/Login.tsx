import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {loginUser} from "../../redux";
import css from './Login.module.css';


const Login = () => {
    type LoginData = {
        username: string;
        password: string;
        expiresInMins: number
    }
    const [username, setUsername] = useState("emilys");
    const [password, setPassword] = useState("emilyspass");
    const [expiresInMins, setexpiresInMins] = useState(30);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginUser({ username, password, expiresInMins})as any).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {
                navigate("/users");
            }
        });
    };

    return (
        <form onSubmit={handleLogin} className={css.login}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Увійти</button>
        </form>
    );
};

export default Login;