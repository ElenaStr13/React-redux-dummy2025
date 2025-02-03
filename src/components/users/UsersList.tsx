import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../types";
import {useEffect} from "react";
import {Link, useSearchParams} from "react-router-dom";
import Pagination from "../pagination/Pagination.tsx";
import {setPage, usersList} from "../../redux/slices/usersSlice.ts";

const UsersList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { users, loading, error, skip, limit, total } = useSelector(
        (state: RootState) => state.users);
    const [searchParams] = useSearchParams();
    const query = searchParams.get("search") || "";

    useEffect(() => {
        dispatch(usersList({ skip, limit }));
    }, [dispatch, skip, limit]);

    const filteredUsers = users?.filter((user) =>
        user.username.toLowerCase().includes(query.toLowerCase())
    );

    const totalPages = total > 0 ? Math.ceil(total / limit) : 1;
    const currentPage = skip / limit + 1;

    return (
    <div>
        <h2>Користувачі</h2>
        <ul>
            {filteredUsers.map((user) => (
                <li key={user.id}>
                    <Link to={`/users/${user.id}`}>{user.id}. {user.username}</Link>
                    - {user.email}, gender: {user.gender}
                </li>
            ))}
        </ul>
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => dispatch(setPage(page - 1))}
        />
    </div>
);
};

export {UsersList};