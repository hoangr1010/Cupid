import { createSlice } from '@reduxjs/toolkit';

const authInitialState = {
    user: null
};

const authSlice = createSlice({
    name: "auth",
    initialState: authInitialState,
    reducers: {
        
    }
});

export const { login, changeUser } = authSlice.actions;
export default {
    auth: authSlice.reducer,
};

