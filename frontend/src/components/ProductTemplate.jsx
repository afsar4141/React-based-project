import { Link } from "react-router-dom";
import useAddToCart from "../utils/useAddToCart";
import { formatPrice } from "../utils/format";

const ProductTemplate = ({ p }) => {
    const addToCart = useAddToCart();

    return (
        <div className="h-[65vh] shadow-lg p-3 flex flex-col">
            <img
                className="h-[50%] block mx-auto object-contain"
                src={p.image}
                alt={p.title}
            />
            <span className="mt-3 text-xs uppercase text-gray-500">
                {p.category}
            </span>
            <h1 className="text-2xl">{p.title.slice(0, 18)}...</h1>
            <p className="mt-2 flex-1 overflow-hidden">
                {p.description.slice(0, 90)}...
            </p>
            <p className="text-xl text-red-400">{formatPrice(p.price)}</p>
            <div className="flex justify-between items-center pt-2">
                <Link to={`/product/${p.id}`} className="text-blue-400">
                    More Info
                </Link>
                <button
                    onClick={() => addToCart(p)}
                    className="text-yellow-500 cursor-pointer"
                >
                    Add to cart
                </button>
            </div>
        </div>
    );
};

export default ProductTemplate;
