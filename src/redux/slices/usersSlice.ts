import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {axiosInstance} from "../../service/api.service.ts";
import {IUser} from "../../models/IUser.ts";
import {IUsersResponseModel} from "../../models/IUsersResponseModel.ts";

interface UserState {
    users: IUser[];
    user: IUser | null;
    loading: boolean;
    error: string | null;
    total: number;
    limit: number;
    skip: number;
}

const initialState: UserState = {
    users: [],
    user: null,
    loading: false,
    error: null,
    total: 0,
    limit: 20,
    skip: 0,
};

// Завантаження користувачів
export const usersList = createAsyncThunk<
    IUsersResponseModel,
    { skip: number; limit: number },
    { rejectValue: string }
>(
    "users/fetchUsers", async ({ skip, limit }, thunkAPI) => {
        try {
            const response = await axiosInstance.get<IUsersResponseModel>(
                `/users?skip=${skip}&limit=${limit}`
            );
            return response.data;

        } catch (error) {
            return thunkAPI.rejectWithValue("Не вдалося завантажити користувачів");
        }
    });

// Завантаження одного користувача
export const fetchUserById = createAsyncThunk<IUser, number, { rejectValue: string }>(
    "users/fetchUserById",
    async (id, thunkAPI) => {
        try {
            const response = await axiosInstance.get<IUser>(`/users/${id}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Не вдалося завантажити деталі користувача");
        }
    }
);

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.skip = action.payload * state.limit;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(usersList.fulfilled, (state: UserState, action: PayloadAction<IUsersResponseModel>) => {
            state.loading = false;
            state.users = action.payload.users;
            state.total = action.payload.total ?? 0 ;
        })
    .addCase(fetchUserById.fulfilled, (state:UserState, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        });
    },
});
export const { setPage } = usersSlice.actions;
export default usersSlice.reducer;
