import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { asyncsignupuser } from "../store/actions/userActions";
import FormField from "../components/FormField";

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const SignupHandler = async (data) => {
        const user = { ...data, id: nanoid(), isAdmin: false, cart: [] };
        const ok = await dispatch(asyncsignupuser(user));
        if (ok) navigate("/signin");
    };

    return (
        <form onSubmit={handleSubmit(SignupHandler)} className="w-full p-5">
            <FormField
                {...register("username", {
                    required: "Username is required",
                    minLength: { value: 3, message: "At least 3 characters" },
                })}
                type="text"
                placeholder="Afsar"
                error={errors.username}
            />
            <FormField
                {...register("email", {
                    required: "Email is required",
                    pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Enter a valid email address",
                    },
                })}
                type="email"
                placeholder="afsar@example.com"
                error={errors.email}
            />
            <FormField
                {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "At least 6 characters" },
                })}
                type="password"
                placeholder="password"
                error={errors.password}
            />
            <button
                disabled={isSubmitting}
                className="text-white rounded mt-5 text-3xl px-5 py-3 bg-red-400 disabled:opacity-50"
            >
                Signup User
            </button>
            <p className="mt-3">
                Already have an account?{" "}
                <Link className="text-blue-400" to="/signin">
                    Signin
                </Link>
            </p>
        </form>
    );
};

export default Signup;
