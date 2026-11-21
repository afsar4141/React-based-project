import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingProduct from "../components/LoadingProduct";
import ProductForm from "../components/ProductForm";
import {
    asyncdeleteproduct,
    asyncupdateproduct,
} from "../store/actions/productActions";
import { formatPrice } from "../utils/format";
import useAddToCart from "../utils/useAddToCart";

const ProductDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const addToCart = useAddToCart();
    const { user } = useSelector((state) => state.userReducer);
    const { products, loading } = useSelector((state) => state.productReducer);
    const product = products.find((p) => p.id == id);

    if (loading) return <LoadingProduct />;

    if (!product) {
        return (
            <div className="p-5">
                <h1 className="text-3xl mb-3">Product not found</h1>
                <Link to="/" className="text-blue-400">
                    Back to products
                </Link>
            </div>
        );
    }

    const UpdateProductHandler = (updated) =>
        dispatch(asyncupdateproduct(product.id, updated));

    const DeleteHandler = async () => {
        if (!window.confirm("Delete this product permanently?")) return;
        const ok = await dispatch(asyncdeleteproduct(product.id));
        if (ok) navigate("/");
    };

    return (
        <div className="w-full">
            <Link to="/" className="text-blue-400">
                ← Back to products
            </Link>
            <div className="w-full shadow-lg mb-5 mt-3 p-5">
                <img
                    className="h-[40vh] block mx-auto object-contain"
                    src={product.image}
                    alt={product.title}
                />
                <span className="text-xs uppercase text-gray-500">
                    {product.category}
                </span>
                <h1 className="text-4xl">{product.title}</h1>
                <p className="mt-5">{product.description}</p>
                <p className="my-5 text-red-400 text-5xl">
                    {formatPrice(product.price)}
                </p>
                <button
                    onClick={() => addToCart(product)}
                    className="text-white rounded text-2xl px-5 py-2 bg-yellow-500 cursor-pointer"
                >
                    Add to cart
                </button>
            </div>

            {user?.isAdmin && (
                <ProductForm
                    defaultValues={product}
                    onSubmit={UpdateProductHandler}
                    submitLabel="Update Product"
                    buttonClass="bg-blue-400"
                >
                    <br />
                    <br />
                    <button
                        onClick={DeleteHandler}
                        type="button"
                        className="text-white rounded mt-5 text-3xl px-5 py-3 bg-red-400"
                    >
                        Delete Product
                    </button>
                </ProductForm>
            )}
        </div>
    );
};

export default ProductDetails;
