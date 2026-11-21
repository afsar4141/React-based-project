import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { asyncaddtocart } from "../store/actions/cartActions";

// Shared by the product card and the product details page.
const useAddToCart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.userReducer);

    return (product) => {
        if (!user) {
            toast.info("Please sign in to add items to your cart.");
            navigate("/signin");
            return;
        }
        dispatch(asyncaddtocart(product));
    };
};

export default useAddToCart;
