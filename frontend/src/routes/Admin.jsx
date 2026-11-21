import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// Only admins pass. (UI-level only: see the notes about json-server.)
const Admin = (props) => {
    const { user } = useSelector((state) => state.userReducer);
    if (!user) return <Navigate to="/signin" />;
    return user.isAdmin ? props.children : <Navigate to="/" />;
};

export default Admin;
