import { createSlice } from '@reduxjs/toolkit';

const authInitialState = {
    token: null,
    user: 'Hoang'
};

const authSlice = createSlice({
    name: "auth",
    initialState: authInitialState,
    reducers: {
        login(state, action) {
            console.log(state);
        },
        changeUser(state, action) {
            state.user = action.payload;
        }
    }
});

export const { login, changeUser } = authSlice.actions;
export default authSlice.reducer;
