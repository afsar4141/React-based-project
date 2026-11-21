import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
    asyncdeleteuser,
    asynclogoutuser,
    asyncupdateuser,
} from "../store/actions/userActions";
import FormField from "../components/FormField";

const Settings = () => {
    const { user } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: { username: user.username, email: user.email, password: "" },
    });

    const UpdateHandler = async ({ username, email, password }) => {
        // Blank password = keep the current one.
        const changes = { username, email };
        if (password) changes.password = password;
        const ok = await dispatch(asyncupdateuser(user.id, changes));
        if (ok) reset({ username, email, password: "" });
    };

    const DeleteHandler = () => {
        if (window.confirm("Delete your account permanently?")) {
            dispatch(asyncdeleteuser(user.id));
        }
    };

    return (
        <form onSubmit={handleSubmit(UpdateHandler)} className="w-full p-5">
            <FormField
                {...register("username", {
                    required: "Username is required",
                    minLength: { value: 3, message: "At least 3 characters" },
                })}
                type="text"
                placeholder="john-doe"
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
                placeholder="john@doe.doe"
                error={errors.email}
            />
            <FormField
                {...register("password", {
                    minLength: { value: 6, message: "At least 6 characters" },
                })}
                type="password"
                placeholder="New password (leave blank to keep current)"
                error={errors.password}
            />
            <button
                disabled={isSubmitting}
                className="text-white rounded mt-5 text-3xl px-5 py-3 bg-red-400 disabled:opacity-50"
            >
                Update User
            </button>
            <br />
            <br />
            <button
                type="button"
                onClick={() => dispatch(asynclogoutuser())}
                className="text-white rounded mt-5 text-3xl px-5 py-3 bg-red-400"
            >
                Logout User
            </button>
            <br />
            <br />
            <button
                type="button"
                onClick={DeleteHandler}
                className="text-white rounded mt-5 text-3xl px-5 py-3 bg-red-400"
            >
                Delete User
            </button>
        </form>
    );
};

export default Settings;
