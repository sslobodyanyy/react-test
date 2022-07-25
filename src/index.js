import ReactDOM from "react-dom/client";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import Users from "./components/Users";
import store from "./redux/store";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <App /> }>
                    <Route index element={ <Users /> } />
                    <Route path="add" element={ <AddUser /> } />
                    <Route path=":id/edit" element={ <EditUser /> } />
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>
);
