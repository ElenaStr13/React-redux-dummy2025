import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IUserWithTokens } from "../../models/IUserWithTokens";
import {axiosInstance} from "../../service/api.service.ts";

interface UserState {
    user: IUserWithTokens | null;
    accessToken: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: JSON.parse(localStorage.getItem("user") || "null"),
    accessToken: localStorage.getItem("accessToken"),
    loading: false,
    error: null,
};

// Логінінація користувача
export const loginUser = createAsyncThunk<IUserWithTokens, {
    username: string;
    password: string;
    expiresInMins:number;
}, { rejectValue: string }>(
    "auth/login",
    async ({ username, password, expiresInMins }: { username: string; password: string, expiresInMins:number }, thunkAPI) => {
        try {
            const response = await axiosInstance.post<IUserWithTokens>("auth/login", {
                username,
                password,
                expiresInMins: 60,
            });

            localStorage.setItem("user", JSON.stringify(response.data));
            localStorage.setItem("accessToken", response.data.accessToken);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Невірні дані для входу");
        }
    }
);

// Оновлення токена
export const refreshToken = createAsyncThunk<IUserWithTokens, void, { rejectValue: string }>(
    "auth/refresh", async (_, thunkAPI) => {
    try {
        const storedUser = JSON.parse(localStorage.getItem("user") || "null");
        if (!storedUser?.refreshToken) {
            throw new Error("Немає refreshToken");
        }

        const response = await axiosInstance.post("auth/refresh", {
            refreshToken: storedUser.refreshToken,
            expiresInMin: 60,
        });

        storedUser.accessToken = response.data.accessToken;
        storedUser.refreshToken = response.data.refreshToken;

        localStorage.setItem("user", JSON.stringify(storedUser));
        localStorage.setItem("accessToken", response.data.accessToken);

        return storedUser;
    } catch (error) {
        return thunkAPI.rejectWithValue("Помилка оновлення токена");
    }
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.loading = false;
            state.error = null;
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state: UserState) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state: UserState, action: PayloadAction<IUserWithTokens>) => {
                state.loading = false;
                state.user = action.payload;
                state.accessToken = action.payload.accessToken;
            })
            .addCase(loginUser.rejected, (state: UserState, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(refreshToken.fulfilled, (state: UserState, action: PayloadAction<IUserWithTokens>) => {
                state.user = action.payload;
                state.accessToken = action.payload.accessToken;
            })
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
