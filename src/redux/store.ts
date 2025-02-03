import {configureStore} from "@reduxjs/toolkit";
import usersReducer from "./slices/usersSlice.ts";
import userReducer from "./slices/userSlice";
import recipesReducer from "./slices/recipesSlice";


 const store = configureStore({
    reducer: {
        user: userReducer,
        users: usersReducer,
        recipes: recipesReducer
    }
});

export {store}