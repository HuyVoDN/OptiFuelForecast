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
            {
                path: "/signup",
                element: <Signup />
            },
            {
                path: "/user/quote",
                element: <Quote/>
                // hardcoded username for quoting, must change
            },
            {
                path: "/:username/profile",
                element: <ClientProfile />
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
            <RouterProvider router={router} />   
    );
}

export default App
