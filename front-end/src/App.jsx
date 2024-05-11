import { createBrowserRouter, RouterProvider, Route, Outlet } from 'react-router-dom';
import About from "./pages/about/About.jsx";
import Home from "./pages/Home.jsx";
import Signup from "./pages/auth/signup/Signup.jsx";
import Login from "./pages/auth/login/Login.jsx";
import FuelQuote from './pages/fuelquote/FuelQuote.jsx';
import Navbar from "./components/navbar/Navbar.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import ClientProfile from './pages/ClientProfile.jsx';
import { AuthContext, AuthProvider } from './context/authContext.jsx';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import Sidebar from './components/sidebar/Sidebar.jsx';

const Layout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        if(!authState.isAuthenticated) {
        navigate('/login');
    }
}, [authState.isAuthenticated, navigate]);

    return authState.isAuthenticated ? children : null;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />
        ,
        children: [
            {
                path: "/about",
                element: <About/>
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/signup",
                element: <Signup />
            },
            {
                path: "/:username/quote",
                element: <FuelQuote/>
                // hardcoded username for quoting, must change
            },
            {
                path: "/:username/profile", //technically its still hardcoded
                element: <ProtectedRoute><ClientProfile /></ProtectedRoute>
            },
            // {
            //     path: "/:username/settings",
            //     element:<div><Sidebar/><h1>Settings Page.</h1></div>
            // }

        ]
    },
    {
        path: "*",
        element: <h1>Not Found</h1>
    },
]);
function App() {
    return (
            <AuthProvider>
            <RouterProvider router={router} />
            </AuthProvider>
    );
}

export default App
