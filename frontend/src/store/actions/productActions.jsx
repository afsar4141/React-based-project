import { toast } from "react-toastify";
import axios from "../../api/config";
import { loadproduct, setproductsloading } from "../reducers/productSlice";

// Thunks return true/false so the UI can decide what to do next
// (navigate, reset a form...) only when the request really succeeded.

export const asyncloadproducts = () => async (dispatch) => {
    try {
        const { data } = await axios.get("/products");
        dispatch(loadproduct(data));
    } catch (error) {
        console.log(error);
        toast.error("Could not load products. Is the backend running?");
    } finally {
        dispatch(setproductsloading(false));
    }
};

export const asynccreateproduct = (product) => async (dispatch) => {
    try {
        await axios.post("/products", product);
        await dispatch(asyncloadproducts());
        toast.success("Product created!");
        return true;
    } catch (error) {
        console.log(error);
        toast.error("Could not create the product.");
        return false;
    }
};

export const asyncupdateproduct = (id, product) => async (dispatch) => {
    try {
        await axios.patch(`/products/${id}`, product);
        await dispatch(asyncloadproducts());
        toast.success("Product updated!");
        return true;
    } catch (error) {
        console.log(error);
        toast.error("Could not update the product.");
        return false;
    }
};

export const asyncdeleteproduct = (id) => async (dispatch) => {
    try {
        await axios.delete(`/products/${id}`);
        await dispatch(asyncloadproducts());
        toast.success("Product deleted.");
        return true;
    } catch (error) {
        console.log(error);
        toast.error("Could not delete the product.");
        return false;
    }
};
