import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../types";
import {useEffect} from "react";
import {fetchUserById} from "../../redux/slices/usersSlice.ts";

const UserDetails = () => {
    const { id } = useParams<{ id: string }>(); // Отримуємо `id` з URL
    const dispatch = useDispatch<AppDispatch>();
    const { user, loading, error } = useSelector((state: RootState) => state.users);

    useEffect(() => {
        if (id) dispatch(fetchUserById(Number(id))); // Завантажуємо користувача за `id`
    }, [dispatch, id]);

    if (loading) return <p>Завантаження...</p>;
    if (error) return <p>Помилка: {error}</p>;
    if (!user) return <p>Користувач не знайдений.</p>;

    return (
        <div>
            <h2>Деталі користувача</h2>
            <img src={user.image} alt={user.username} width="200" />
            <p><strong>Ім'я:</strong> {user.firstName}</p>
            <p><strong>Прізвище:</strong> {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Стать:</strong> {user.gender}</p>
            <p><strong>Вік:</strong> {user.age}</p>
            <p><strong>Дата народження:</strong> {user.birthDate}</p>
            <p><strong>Номер телефону:</strong> {user.phone}</p>
        </div>
    );
};

export default UserDetails;