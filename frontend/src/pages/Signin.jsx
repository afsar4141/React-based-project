import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { asyncsigninuser } from "../store/actions/userActions";
import FormField from "../components/FormField";

const Signin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const SigninHandler = async (credentials) => {
        // Only leave the page if the login actually worked.
        const ok = await dispatch(asyncsigninuser(credentials));
        if (ok) navigate("/");
    };

    return (
        <form onSubmit={handleSubmit(SigninHandler)} className="w-full p-5">
            <FormField
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="afsar@example.com"
                error={errors.email}
            />
            <FormField
                {...register("password", { required: "Password is required" })}
                type="password"
                placeholder="password"
                error={errors.password}
            />
            <button
                disabled={isSubmitting}
                className="text-white rounded mt-5 text-3xl px-5 py-3 bg-red-400 disabled:opacity-50"
            >
                Signin User
            </button>
            <p className="mt-3">
                Don't have an account?{" "}
                <Link className="text-blue-400" to="/signup">
                    Signup
                </Link>
            </p>
        </form>
    );
};

export default Signin;
