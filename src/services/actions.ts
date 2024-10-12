import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import { loginUserApi, getUserApi, logoutApi } from "../utils/burger-api";
import { TUser } from '../utils/types';
import {setIsAuthChecked} from "./slices/userSlice";

export const login = createAsyncThunk(
    "auth/login",
    async () => {
        return loginUserApi;
    }
)

export const logout = createAsyncThunk(
    "auth/logout",
    async () => {
        return logoutApi;
    }
)


// export const setUser = createAction<TUser, "AUTH/SET_USER">("AUTH/SET_USER");

// export const checkUserAuth = createAsyncThunk(
//     "auth/checkUserAuth",
//     async (_, { dispatch }) => {
//         if (localStorage.getItem("accessToken")) {
//             getUserApi
//                 // .then(user => dispatch(setUser(user)))
//                 .finally(() => dispatch(setIsAuthChecked(true)))
//         } else {
//             dispatch(setIsAuthChecked(true));
//         }
//     }
// )
