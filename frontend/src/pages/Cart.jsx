import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
    asynccheckout,
    asyncchangequantity,
    asyncclearcart,
    asyncremovefromcart,
} from "../store/actions/cartActions";
import { cartCount, cartTotal, formatPrice } from "../utils/format";

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.userReducer);
    const [placing, setPlacing] = useState(false);
    const cart = user.cart || [];

    const CheckoutHandler = async () => {
        setPlacing(true);
        const orderId = await dispatch(asynccheckout());
        setPlacing(false);
        if (orderId) navigate("/orders");
    };

    if (cart.length === 0) {
        return (
            <div className="p-5 text-center">
                <h1 className="text-3xl mb-3">Your cart is empty</h1>
                <Link to="/" className="text-blue-400">
                    Continue shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="p-5">
            {cart.map((ci) => (
                <div
                    className="mb-3 bg-gray-200 rounded p-2 flex flex-wrap gap-3 justify-between items-center"
                    key={ci.product.id}
                >
                    <img
                        className="h-[10vmax] object-contain"
                        src={ci.product.image}
                        alt={ci.product.title}
                    />
                    <Link
                        to={`/product/${ci.product.id}`}
                        className="flex-1 min-w-[150px]"
                    >
                        {ci.product.title}
                    </Link>
                    <h2>{formatPrice(ci.product.price)}</h2>
                    <div>
                        <button
                            onClick={() =>
                                dispatch(asyncchangequantity(ci.product.id, -1))
                            }
                            className="text-2xl px-2 cursor-pointer"
                            aria-label="Decrease quantity"
                        >
                            -
                        </button>
                        <span className="mx-3">{ci.quantity}</span>
                        <button
                            onClick={() =>
                                dispatch(asyncchangequantity(ci.product.id, 1))
                            }
                            className="text-2xl px-2 cursor-pointer"
                            aria-label="Increase quantity"
                        >
                            +
                        </button>
                    </div>
                    <h2 className="w-24 text-right">
                        {formatPrice(Number(ci.product.price) * ci.quantity)}
                    </h2>
                    <button
                        onClick={() =>
                            dispatch(asyncremovefromcart(ci.product.id))
                        }
                        className="text-red-400 cursor-pointer"
                        aria-label="Remove item"
                    >
                        <i className="ri-delete-bin-line text-xl"></i>
                    </button>
                </div>
            ))}

            <div className="mt-6 flex flex-wrap justify-between items-center gap-3">
                <button
                    onClick={() => dispatch(asyncclearcart())}
                    className="text-gray-500 underline cursor-pointer"
                >
                    Clear cart
                </button>
                <div className="text-right">
                    <p className="text-sm text-gray-500">
                        {cartCount(cart)} item(s)
                    </p>
                    <p className="text-3xl">
                        Total: {formatPrice(cartTotal(cart))}
                    </p>
                    <button
                        onClick={CheckoutHandler}
                        disabled={placing}
                        className="text-white rounded mt-3 text-2xl px-5 py-2 bg-red-400 disabled:opacity-50 cursor-pointer"
                    >
                        {placing ? "Placing order..." : "Checkout"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
