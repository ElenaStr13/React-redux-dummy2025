import {useSelector} from "react-redux";
import {RootState} from "../types";
import {useParams} from "react-router-dom";
import {UsersList} from "../components/users/UsersList.tsx";

const UserPage = () => {
    const userState = useSelector((state: RootState) => state.user) || { user: null, accessToken: null };
    const { user, accessToken } = userState;
    const { id } = useParams();


    return (
        <div>
            <UsersList/>
        </div>
    );
};

export {UserPage};