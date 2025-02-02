import {createRoot} from 'react-dom/client';
import {RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";

import './index.css';
import {router} from "./router";
import {store} from "./redux";


createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>);
