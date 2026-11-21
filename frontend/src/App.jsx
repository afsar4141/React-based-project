import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import Nav from "./components/Nav";
import Mainroutes from "./routes/Mainroutes";
import { asyncloadproducts } from "./store/actions/productActions";

const App = () => {
    const dispatch = useDispatch();

    // Load the catalogue once at startup so every page (including a
    // refreshed /product/:id) has the data it needs.
    useEffect(() => {
        dispatch(asyncloadproducts());
    }, [dispatch]);

    return (
        <div className="py-10 px-[5%] md:px-[10%] font-thin">
            <Nav />
            <Mainroutes />
            <ToastContainer position="bottom-right" autoClose={2500} />
        </div>
    );
};

export default App;
