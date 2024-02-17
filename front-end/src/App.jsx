import { useState } from 'react';
import { createBrowserRouter, RouterProvider, Route, Outlet } from 'react-router-dom';
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Navibar from "./components/Navbar.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./scss/styles.scss";
const Layout = () => {
    return (
        <>
        <Navibar />
        <Outlet />
        <Footer />
        </>
    );
};
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
        ]
    },
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: "/login",
        element: <Login/>
    },
]);
function App() {
    return (
        <div className="app">
            <div className="container">
                <RouterProvider router={router} />
                
            </div>
        </div>
    );
}

export default App
