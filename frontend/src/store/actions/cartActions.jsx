import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import axios from "../../api/config";
import { cartTotal } from "../../utils/format";
import { patchuser } from "./userActions";

const getCart = (getState) => getState().userReducer.user?.cart || [];

const saveCart = (cart) => async (dispatch, getState) => {
    const { user } = getState().userReducer;
    try {
        await dispatch(patchuser(user.id, { cart }));
        return true;
    } catch (error) {
        console.log(error);
        toast.error("Could not update your cart.");
        return false;
    }
};

export const asyncaddtocart = (product) => async (dispatch, getState) => {
    const cart = [...getCart(getState)];
    const index = cart.findIndex((ci) => ci.product.id == product.id);
    if (index === -1) {
        cart.push({ product, quantity: 1 });
    } else {
        cart[index] = { ...cart[index], quantity: cart[index].quantity + 1 };
    }
    const ok = await dispatch(saveCart(cart));
    if (ok) toast.success("Added to cart!");
    return ok;
};

// delta = +1 or -1. Reaching 0 removes the item.
export const asyncchangequantity =
    (productId, delta) => async (dispatch, getState) => {
        const cart = getCart(getState)
            .map((ci) =>
                ci.product.id == productId
                    ? { ...ci, quantity: ci.quantity + delta }
                    : ci
            )
            .filter((ci) => ci.quantity > 0);
        return dispatch(saveCart(cart));
    };

export const asyncremovefromcart = (productId) => async (dispatch, getState) => {
    const cart = getCart(getState).filter((ci) => ci.product.id != productId);
    return dispatch(saveCart(cart));
};

export const asyncclearcart = () => async (dispatch) => {
    const ok = await dispatch(saveCart([]));
    if (ok) toast.info("Cart cleared.");
    return ok;
};

// Creates an order from the current cart, then empties the cart.
// Returns the new order id (or null on failure).
export const asynccheckout = () => async (dispatch, getState) => {
    const { user } = getState().userReducer;
    const cart = getCart(getState);
    if (cart.length === 0) return null;
    try {
        const order = {
            id: nanoid(),
            userId: user.id,
            items: cart,
            total: Number(cartTotal(cart).toFixed(2)),
            status: "placed",
            createdAt: new Date().toISOString(),
        };
        await axios.post("/orders", order);
        await dispatch(patchuser(user.id, { cart: [] }));
        toast.success("Order placed! 🎉");
        return order.id;
    } catch (error) {
        console.log(error);
        toast.error("Checkout failed. Please try again.");
        return null;
    }
};
