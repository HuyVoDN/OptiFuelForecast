import { createBrowserRouter, RouterProvider, Route, Outlet } from 'react-router-dom';
import Footer from "./components/footer/Footer.jsx";
import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";
import Header from "./components/header/Header.jsx";
import Register from "./pages/auth/Register.jsx";
import Login from "./pages/auth/Login.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
const Layout = () => {
    return (
        <>
        <Header />
        <Outlet />
        </>
    );
};
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />
        ,
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
    {
        path: "/about",
        element: <About />
    }
    ,
    {
        path: "*",
        element: <h1>Not Found</h1>
    }
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
