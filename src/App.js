import React from "react";
import { Outlet } from "react-router-dom";
import './App.css';


const App = () => {
  return (
    <div>
        <h1>Таблица пользователей</h1>
        <Outlet />
    </div>
  );
}

export default React.memo(App);
