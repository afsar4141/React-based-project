import { createSlice } from "@reduxjs/toolkit";

// Read the saved session synchronously so a page refresh on a protected
// route (e.g. /cart) doesn't bounce the user to /signin for one render.
const loadStoredUser = () => {
    try {
        const stored = JSON.parse(localStorage.getItem("user"));
        if (!stored) return null;
        delete stored.password; // never keep the password in memory
        return stored;
    } catch {
        return null;
    }
};

const initialState = {
    user: loadStoredUser(),
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginuser: (state, action) => {
            state.user = action.payload;
        },
        logoutuser: (state) => {
            state.user = null;
        },
    },
});
export default userSlice.reducer;
export const { loginuser, logoutuser } = userSlice.actions;
