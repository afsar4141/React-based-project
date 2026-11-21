import { toast } from "react-toastify";
import axios from "../../api/config";
import { loginuser, logoutuser } from "../reducers/userSlice";

// The password must never end up in Redux or localStorage.
const sanitize = (user) => {
    const safe = { ...user };
    delete safe.password;
    return safe;
};

const saveSession = (user) => {
    const safe = sanitize(user);
    localStorage.setItem("user", JSON.stringify(safe));
    return safe;
};

// Low-level helper: PATCH the user, then sync Redux + localStorage.
// No toast here so cart actions can reuse it quietly.
export const patchuser = (id, changes) => async (dispatch) => {
    const { data } = await axios.patch(`/users/${id}`, changes);
    dispatch(loginuser(saveSession(data)));
    return data;
};

export const asyncsigninuser = (credentials) => async (dispatch) => {
    try {
        // `params` URL-encodes values (a raw template string breaks on & + # in passwords)
        const { data } = await axios.get("/users", {
            params: { email: credentials.email, password: credentials.password },
        });
        if (!data[0]) {
            toast.error("Wrong email or password.");
            return false;
        }
        dispatch(loginuser(saveSession(data[0])));
        toast.success(`Welcome back, ${data[0].username}!`);
        return true;
    } catch (error) {
        console.log(error);
        toast.error("Could not sign in. Is the backend running?");
        return false;
    }
};

export const asyncsignupuser = (user) => async () => {
    try {
        const { data: existing } = await axios.get("/users", {
            params: { email: user.email },
        });
        if (existing.length > 0) {
            toast.error("An account with this email already exists.");
            return false;
        }
        await axios.post("/users", user);
        toast.success("Account created! Please sign in.");
        return true;
    } catch (error) {
        console.log(error);
        toast.error("Could not create the account.");
        return false;
    }
};

export const asyncupdateuser = (id, changes) => async (dispatch) => {
    try {
        await dispatch(patchuser(id, changes));
        toast.success("Profile updated!");
        return true;
    } catch (error) {
        console.log(error);
        toast.error("Could not update your profile.");
        return false;
    }
};

export const asynclogoutuser = () => (dispatch) => {
    localStorage.removeItem("user");
    dispatch(logoutuser());
    toast.info("You have been logged out.");
};

export const asyncdeleteuser = (id) => async (dispatch) => {
    try {
        await axios.delete(`/users/${id}`);
        localStorage.removeItem("user");
        dispatch(logoutuser());
        toast.info("Your account was deleted.");
    } catch (error) {
        console.log(error);
        toast.error("Could not delete your account.");
    }
};
