import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div className="p-5 text-center">
            <h1 className="text-5xl mb-3">404</h1>
            <p className="mb-3">We couldn't find that page.</p>
            <Link to="/" className="text-blue-400">
                Back to home
            </Link>
        </div>
    );
};

export default PageNotFound;
