import { AUTH_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signinAdmin: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/signin/admin`,
                method: 'POST',
                body: data,
            }),
        }),
        signinTrainer: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/signin/trainer`,
                method: 'POST',
                body: data,
            }),
        }),
        signinClient: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/signin/client`,
                method: 'POST',
                body: data,
            }),
        }),
        signupAdmin: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/signup/admin`,
                method: 'POST',
                body: data,
            }),
        }),
        signupTrainer: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/signup/trainer`,
                method: 'POST',
                body: data,
            }),
        }),
        signupClient: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/signup/client`,
                method: 'POST',
                body: data,
            }),
        }),
        signout: builder.mutation({
            query: () => ({ 
                url: `${AUTH_URL}/signout`,
                method: 'POST',
            })
        })
    })
})

export const {
    useSigninAdminMutation,
    useSigninTrainerMutation,
    useSigninClientMutation,
    useSignupTrainerMutation,
    useSignupClientMutation,
    useSignoutMutation,
    // 
    useSignupAdminMutation
} = authApiSlice;