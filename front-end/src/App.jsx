import { createBrowserRouter, RouterProvider, Route, Outlet } from 'react-router-dom';
import Footer from "./components/footer/Footer.jsx";
import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";
import Signup from "./pages/auth/signup/Signup.jsx";
import Login from "./pages/auth/login/Login.jsx";
import Quote from "./pages/FuelQuoteForm.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import ClientProfile from './pages/ClientProfile.jsx';
import { AuthContext, AuthProvider } from './context/authContext.jsx';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
    //return authState.isAuthenticated ? children : navigate('/login');
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
                path: "/username/quote",
                element: <Quote/>
                // hardcoded username for quoting, must change
            },
            // {
            //     path: "/:username/profile", //technically its still hardcoded
            //     element: <ClientProfile />
            // },
            {
                path: "/:username/profile", //technically its still hardcoded
                element: <ProtectedRoute><ClientProfile /></ProtectedRoute>
            }
            
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
