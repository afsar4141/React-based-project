import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "../api/config";
import { formatDate, formatPrice } from "../utils/format";

// Orders are only needed on this page, so local state is enough here.
// (Not everything has to live in Redux.)
const Orders = () => {
    const { user } = useSelector((state) => state.userReducer);
    const [orders, setOrders] = useState(null); // null = still loading
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        let cancelled = false;
        axios
            .get("/orders", { params: { userId: user.id } })
            .then(({ data }) => {
                if (cancelled) return;
                setOrders(
                    [...data].sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    )
                );
            })
            .catch((error) => {
                console.log(error);
                if (!cancelled) setFailed(true);
            });
        return () => {
            cancelled = true;
        };
    }, [user.id]);

    if (failed) return <p className="p-5">Could not load your orders.</p>;
    if (orders === null) return <p className="p-5">Loading...</p>;

    if (orders.length === 0) {
        return (
            <div className="p-5 text-center">
                <h1 className="text-3xl mb-3">No orders yet</h1>
                <Link to="/" className="text-blue-400">
                    Start shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="p-5">
            <h1 className="text-3xl mb-5">Your orders</h1>
            {orders.map((o) => (
                <div key={o.id} className="shadow-lg p-4 mb-5">
                    <div className="flex flex-wrap justify-between text-sm text-gray-500">
                        <span>{formatDate(o.createdAt)}</span>
                        <span className="uppercase">{o.status}</span>
                    </div>
                    <ul className="my-3">
                        {o.items.map((ci) => (
                            <li
                                key={ci.product.id}
                                className="flex justify-between py-1"
                            >
                                <span>
                                    {ci.product.title} × {ci.quantity}
                                </span>
                                <span>
                                    {formatPrice(
                                        Number(ci.product.price) * ci.quantity
                                    )}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <p className="text-right text-2xl">
                        Total: {formatPrice(o.total)}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Orders;
