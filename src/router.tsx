import {createBrowserRouter} from "react-router-dom";
import {MainLayout} from "./layouts/MainLayout.tsx";
import {MainPage} from "./pages/MainPage.tsx";
import Login from "./components/Login/Login.tsx";
import {LoginUserPage} from "./pages/LoginUserPage.tsx";
import {UserPage} from "./pages/UserPage.tsx";
import {RecipesPage} from "./pages/RecipesPage.tsx";
import UserDetails from "./components/users/UserDetails.tsx";
import RecipeDetails from "./components/recipes/RecipeDetails.tsx";

const router = createBrowserRouter([
    {
        path: '', element: <MainLayout/>, children: [
            {
                index: true, element: <MainPage/>
            },
            {
                path: 'auth/login', element: <Login/>
            },
            {
                path: 'auth/me', element: <LoginUserPage/>
            },
            {
                path: '/users', element: <UserPage/>
            },
            {
                path: 'users/:id', element: <UserDetails />
            },
            {
                path: '/recipes', element: <RecipesPage/>
            },
            {
                path: 'recipes/:id', element: <RecipeDetails />
            }
        ]
    }
])

export {router}
