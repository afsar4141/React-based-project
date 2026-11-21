import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { cartCount } from "../utils/format";

const linkClass = ({ isActive }) => (isActive ? "text-red-400" : "");

const Nav = () => {
    const { user } = useSelector((state) => state.userReducer);
    const count = cartCount(user?.cart);

    return (
        <div className="flex flex-wrap gap-x-10 gap-y-2 mb-10">
            <NavLink className={linkClass} to="/">
                Home
            </NavLink>

            {user ? (
                <>
                    <NavLink className={linkClass} to="/settings">
                        User Settings
                    </NavLink>
                    {user.isAdmin && (
                        <NavLink className={linkClass} to="/create-product">
                            Create Product
                        </NavLink>
                    )}
                    <NavLink className={linkClass} to="/orders">
                        Orders
                    </NavLink>
                    <NavLink className={linkClass} to="/cart">
                        <i className="ri-shopping-cart-line mr-1"></i>
                        Cart
                        {count > 0 && (
                            <span className="ml-1 text-xs bg-red-400 text-white rounded-full px-2 py-0.5">
                                {count}
                            </span>
                        )}
                    </NavLink>
                </>
            ) : (
                <NavLink className={linkClass} to="/signin">
                    Signin
                </NavLink>
            )}

            <NavLink className={linkClass} to="/about">
                About
            </NavLink>
        </div>
    );
};

export default Nav;
