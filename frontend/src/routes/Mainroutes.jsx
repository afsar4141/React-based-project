import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const Cart = lazy(() => import("../pages/Cart"));
const Orders = lazy(() => import("../pages/Orders"));
const CreateProduct = lazy(() => import("../pages/CreateProduct"));
const Settings = lazy(() => import("../pages/Settings"));
const Unauth = lazy(() => import("./Unauth"));
const Auth = lazy(() => import("./Auth"));
const Admin = lazy(() => import("./Admin"));
const Products = lazy(() => import("../pages/Products"));
const Signin = lazy(() => import("../pages/Signin"));
const Signup = lazy(() => import("../pages/Signup"));
const About = lazy(() => import("../pages/About"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));

const Mainroutes = () => {
    return (
        <Suspense fallback={<p className="p-5">Loading...</p>}>
            <Routes>
                <Route path="/" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetails />} />

                <Route
                    path="/signin"
                    element={
                        <Unauth>
                            <Signin />
                        </Unauth>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <Unauth>
                            <Signup />
                        </Unauth>
                    }
                />

                <Route
                    path="/settings"
                    element={
                        <Auth>
                            <Settings />
                        </Auth>
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <Auth>
                            <Cart />
                        </Auth>
                    }
                />
                <Route
                    path="/orders"
                    element={
                        <Auth>
                            <Orders />
                        </Auth>
                    }
                />
                <Route
                    path="/create-product"
                    element={
                        <Admin>
                            <CreateProduct />
                        </Admin>
                    }
                />

                <Route path="/about" element={<About />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Suspense>
    );
};

export default Mainroutes;
