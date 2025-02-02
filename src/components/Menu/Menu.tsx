import {useDispatch} from "react-redux";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useAppSelector} from "../../hooks/useAppSelector.ts";
import {logout} from "../../redux";
import css from './Menu.module.css';
import {RootState} from "../../types";
import Search from "../search/Search.tsx";
import {useState} from "react";

const Menu = () => {
    const user = useAppSelector((state: RootState) => state.user.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [query, setQuery] = useState("");
    const handleLogout = () => {
        dispatch(logout());
    };
    const handleSearch = (query: string) => {
        setQuery(query);
        if (location.pathname.includes("/users")) {
            navigate(`/users?search=${query}`);
        } else if (location.pathname.includes("/recipes")) {
            navigate(`/recipes?search=${query}`);
        }
    };

    return (
        <nav className={css.menu}>
            <Link to="/">Home page</Link>
            {user ? (
                <>
               <Link to="/recipes">Recipes</Link>
                <Link to="/users">Users</Link>
                    <Search onSearch={handleSearch} />
                    {user.image &&
                        <img src={user.image} alt="User avatar" width="40" style={{ borderRadius: "50%" }} />}
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <Link to="/auth/login">Login</Link>
            )}
        </nav>
    );
};

export default Menu;