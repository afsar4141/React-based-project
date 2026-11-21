import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { asynccreateproduct } from "../store/actions/productActions";
import ProductForm from "../components/ProductForm";

// Defined outside the component so its identity is stable between renders.
const EMPTY = { image: "", title: "", price: "", category: "", description: "" };

const CreateProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const CreateProductHandler = async (product) => {
        const ok = await dispatch(
            asynccreateproduct({ ...product, id: nanoid() })
        );
        if (ok) navigate("/");
    };

    return (
        <ProductForm
            defaultValues={EMPTY}
            onSubmit={CreateProductHandler}
            submitLabel="Create Product"
        />
    );
};

export default CreateProduct;
