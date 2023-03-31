import { Navigate, Outlet } from "react-router-dom";



const ProtectedRoutes = ({ loggedInUser }) => {
    const useAuth = () => {
        const user = { loggedIn: loggedInUser };
        return user && user.loggedIn;
    };
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;