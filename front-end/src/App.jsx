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
const Layout = () => {
    return (
        <>
            <Navbar />
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
            
        ]
    },
    {
        path: "/signup",
        element: <Layout />
        ,
        children: [
            {
                path: "/signup",
                element: <Signup />
            },
        ]
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/ClientProfile",
        element: <ClientProfile/>
    },
    {
        path: "/quote",
        element: <Quote/>
    },
    {
        path: "/about",
        element: <About/>
    },
    {
        path: "*",
        element: <h1>Not Found</h1>
    },
    {
        path: "/user/profile",
        element: <ClientProfile />
        // hardcoding rn so we'll have to change this later
    }
]);
function App() {
    return (
            <RouterProvider router={router} />   
    );
}

export default App
